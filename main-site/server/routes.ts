import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { contactSubmissions, insertContactSubmissionSchema, loginUserSchema, signupUserSchema } from "@shared/schema";
import { sendEmail } from "./sendgrid";
import Stripe from "stripe";
import bcrypt from "bcrypt";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28' // or whatever version you're using
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create test products for development (one-time setup)
  app.post("/api/create-test-products", async (req, res) => {
    try {
      // Create Insider product
      const insiderProduct = await stripe.products.create({
        name: 'Foretoken Insider',
        description: 'Premium research reports, real-time data feeds, and exclusive content',
      });

      // Create Pro product
      const proProduct = await stripe.products.create({
        name: 'Foretoken Pro',
        description: 'Everything in Insider plus early access, whitepapers, and private Q&A',
      });

      // Create prices for Insider
      const insiderMonthly = await stripe.prices.create({
        unit_amount: 999, // $9.99
        currency: 'usd',
        recurring: { interval: 'month' },
        product: insiderProduct.id,
      });

      const insiderYearly = await stripe.prices.create({
        unit_amount: 10799, // $107.99
        currency: 'usd',
        recurring: { interval: 'year' },
        product: insiderProduct.id,
      });

      // Create prices for Pro
      const proMonthly = await stripe.prices.create({
        unit_amount: 2999, // $29.99
        currency: 'usd',
        recurring: { interval: 'month' },
        product: proProduct.id,
      });

      const proYearly = await stripe.prices.create({
        unit_amount: 32499, // $324.99
        currency: 'usd',
        recurring: { interval: 'year' },
        product: proProduct.id,
      });

      res.json({
        success: true,
        priceIds: {
          insiderMonthly: insiderMonthly.id,
          insiderYearly: insiderYearly.id,
          proMonthly: proMonthly.id,
          proYearly: proYearly.id,
        }
      });
    } catch (error: any) {
      console.error('Error creating test products:', error);
      res.status(500).json({ 
        error: "Error creating test products", 
        message: error.message 
      });
    }
  });

  // Stripe checkout session endpoint
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { priceId } = req.body;

      if (!priceId) {
        return res.status(400).json({ error: "priceId is required" });
      }

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: 'https://foretoken.xyz/checkout-success',
        cancel_url: 'https://foretoken.xyz/checkout-cancel',
        allow_promotion_codes: true,
        billing_address_collection: 'required',
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ 
        error: "Error creating checkout session", 
        message: error.message 
      });
    }
  });

  // Beehiiv newsletter signup endpoint
  app.post("/api/newsletter-signup", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: "Valid email is required" });
      }

      const beehiivApiKey = process.env.BEEHIIV_FORETOKEN_NEWSLETTER_KEY;
      const publicationId = process.env.BEEHIIV_PUBLICATION_ID_API_V2 || process.env.BEEHIIV_PUBLICATION_ID_API_V1;

      if (!beehiivApiKey || !publicationId) {
        console.error('Missing Beehiiv credentials');
        return res.status(500).json({ error: "Newsletter service unavailable" });
      }

      // Subscribe to Beehiiv newsletter
      const beehiivResponse = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${beehiivApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'foretoken_website',
          utm_medium: 'subscribe_page'
        }),
      });

      if (!beehiivResponse.ok) {
        const errorData = await beehiivResponse.text();
        console.error('Beehiiv API error:', beehiivResponse.status, errorData);
        
        // Handle specific Beehiiv errors
        if (beehiivResponse.status === 409) {
          return res.status(200).json({ 
            success: true, 
            message: "You're already subscribed to our newsletter!" 
          });
        }
        
        return res.status(500).json({ 
          error: "Failed to subscribe to newsletter", 
          details: "Please try again later" 
        });
      }

      const result = await beehiivResponse.json();
      console.log('Beehiiv subscription successful:', result);

      res.json({ 
        success: true, 
        message: "Successfully subscribed to newsletter!" 
      });
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      res.status(500).json({ 
        error: "Newsletter signup failed", 
        message: error.message 
      });
    }
  });

  // Contact form submission API
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Insert into database
      const [submission] = await db
        .insert(contactSubmissions)
        .values(validatedData)
        .returning();

      // Send notification email
      const emailSuccess = await sendEmail({
        to: "hello@foretoken.com", // Your notification email
        from: "noreply@foretoken.com", // Your verified sender
        subject: `New Contact Form Submission: ${validatedData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
        text: `
          New Contact Form Submission
          
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          Subject: ${validatedData.subject}
          
          Message:
          ${validatedData.message}
          
          Submitted: ${new Date().toLocaleString()}
        `
      });

      if (!emailSuccess) {
        console.log("Failed to send notification email (SendGrid not configured)");
      }

      res.json({ 
        success: true, 
        message: "Your message has been sent successfully!"
      });
    } catch (error) {
      console.error(`Contact form error: ${error}`);
      res.status(400).json({ 
        success: false, 
        error: "Failed to submit contact form. Please try again." 
      });
    }
  });

  // Authentication routes
  // User signup
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = signupUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUserByEmail = await storage.getUserByEmail(validatedData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ 
          error: "User with this email already exists" 
        });
      }

      const existingUserByUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ 
          error: "Username is already taken" 
        });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);

      // Create user
      const newUser = await storage.createUser({
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword
      });

      // Set session
      req.session.userId = newUser.id;

      // Return user without password
      const { password, ...userWithoutPassword } = newUser;
      res.json({ 
        success: true, 
        user: userWithoutPassword,
        message: "Account created successfully!" 
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      res.status(400).json({ 
        error: error.message || "Failed to create account" 
      });
    }
  });

  // User login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginUserSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ 
          error: "Invalid email or password" 
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          error: "Invalid email or password" 
        });
      }

      // Set session
      req.session.userId = user.id;

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json({ 
        success: true, 
        user: userWithoutPassword,
        message: "Logged in successfully!" 
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(400).json({ 
        error: error.message || "Failed to login" 
      });
    }
  });

  // User logout
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.clearCookie('connect.sid');
      res.json({ success: true, message: "Logged out successfully!" });
    });
  });

  // Get current user
  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        req.session.destroy(() => {});
        return res.status(401).json({ error: "User not found" });
      }

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error: any) {
      console.error("Get current user error:", error);
      res.status(500).json({ error: "Failed to get user information" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
