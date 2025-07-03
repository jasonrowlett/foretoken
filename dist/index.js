// server/index.ts
import path3 from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express2 from "express";
import session from "express-session";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  currentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.currentId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
};
var storage = new MemStorage();

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema });

// server/routes.ts
import { contactSubmissions, insertContactSubmissionSchema, loginUserSchema, signupUserSchema } from "@shared/schema";

// server/sendgrid.ts
import { MailService } from "@sendgrid/mail";
var mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}
async function sendEmail(params) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid API key not configured, skipping email notification");
    return false;
  }
  try {
    const emailData = {
      to: params.to,
      from: params.from,
      subject: params.subject
    };
    if (params.text) emailData.text = params.text;
    if (params.html) emailData.html = params.html;
    await mailService.send(emailData);
    return true;
  } catch (error) {
    console.error("SendGrid email error:", error);
    return false;
  }
}

// server/routes.ts
import Stripe from "stripe";
import bcrypt from "bcrypt";
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
}
var stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28"
  // or whatever version you're using
});
async function registerRoutes(app2) {
  app2.post("/api/create-test-products", async (req, res) => {
    try {
      const insiderProduct = await stripe.products.create({
        name: "Foretoken Insider",
        description: "Premium research reports, real-time data feeds, and exclusive content"
      });
      const proProduct = await stripe.products.create({
        name: "Foretoken Pro",
        description: "Everything in Insider plus early access, whitepapers, and private Q&A"
      });
      const insiderMonthly = await stripe.prices.create({
        unit_amount: 999,
        // $9.99
        currency: "usd",
        recurring: { interval: "month" },
        product: insiderProduct.id
      });
      const insiderYearly = await stripe.prices.create({
        unit_amount: 10799,
        // $107.99
        currency: "usd",
        recurring: { interval: "year" },
        product: insiderProduct.id
      });
      const proMonthly = await stripe.prices.create({
        unit_amount: 2999,
        // $29.99
        currency: "usd",
        recurring: { interval: "month" },
        product: proProduct.id
      });
      const proYearly = await stripe.prices.create({
        unit_amount: 32499,
        // $324.99
        currency: "usd",
        recurring: { interval: "year" },
        product: proProduct.id
      });
      res.json({
        success: true,
        priceIds: {
          insiderMonthly: insiderMonthly.id,
          insiderYearly: insiderYearly.id,
          proMonthly: proMonthly.id,
          proYearly: proYearly.id
        }
      });
    } catch (error) {
      console.error("Error creating test products:", error);
      res.status(500).json({
        error: "Error creating test products",
        message: error.message
      });
    }
  });
  app2.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { priceId } = req.body;
      if (!priceId) {
        return res.status(400).json({ error: "priceId is required" });
      }
      const session2 = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        mode: "subscription",
        success_url: "https://foretoken.xyz/checkout-success",
        cancel_url: "https://foretoken.xyz/checkout-cancel",
        allow_promotion_codes: true,
        billing_address_collection: "required"
      });
      res.json({ url: session2.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({
        error: "Error creating checkout session",
        message: error.message
      });
    }
  });
  app2.post("/api/newsletter-signup", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Valid email is required" });
      }
      const beehiivApiKey = process.env.BEEHIIV_FORETOKEN_NEWSLETTER_KEY;
      const publicationId = process.env.BEEHIIV_PUBLICATION_ID_API_V2 || process.env.BEEHIIV_PUBLICATION_ID_API_V1;
      if (!beehiivApiKey || !publicationId) {
        console.error("Missing Beehiiv credentials");
        return res.status(500).json({ error: "Newsletter service unavailable" });
      }
      const beehiivResponse = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${beehiivApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "foretoken_website",
          utm_medium: "subscribe_page"
        })
      });
      if (!beehiivResponse.ok) {
        const errorData = await beehiivResponse.text();
        console.error("Beehiiv API error:", beehiivResponse.status, errorData);
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
      console.log("Beehiiv subscription successful:", result);
      res.json({
        success: true,
        message: "Successfully subscribed to newsletter!"
      });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      res.status(500).json({
        error: "Newsletter signup failed",
        message: error.message
      });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const [submission] = await db.insert(contactSubmissions).values(validatedData).returning();
      const emailSuccess = await sendEmail({
        to: "hello@foretoken.com",
        // Your notification email
        from: "noreply@foretoken.com",
        // Your verified sender
        subject: `New Contact Form Submission: ${validatedData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
          <p><strong>Submitted:</strong> ${(/* @__PURE__ */ new Date()).toLocaleString()}</p>
        `,
        text: `
          New Contact Form Submission
          
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          Subject: ${validatedData.subject}
          
          Message:
          ${validatedData.message}
          
          Submitted: ${(/* @__PURE__ */ new Date()).toLocaleString()}
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
  app2.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = signupUserSchema.parse(req.body);
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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);
      const newUser = await storage.createUser({
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword
      });
      req.session.userId = newUser.id;
      const { password, ...userWithoutPassword } = newUser;
      res.json({
        success: true,
        user: userWithoutPassword,
        message: "Account created successfully!"
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(400).json({
        error: error.message || "Failed to create account"
      });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginUserSchema.parse(req.body);
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({
          error: "Invalid email or password"
        });
      }
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          error: "Invalid email or password"
        });
      }
      req.session.userId = user.id;
      const { password, ...userWithoutPassword } = user;
      res.json({
        success: true,
        user: userWithoutPassword,
        message: "Logged in successfully!"
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({
        error: error.message || "Failed to login"
      });
    }
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      res.json({ success: true, message: "Logged out successfully!" });
    });
  });
  app2.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        req.session.destroy(() => {
        });
        return res.status(401).json({ error: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Get current user error:", error);
      res.status(500).json({ error: "Failed to get user information" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  base: "./",
  // 👈 crucial for GitHub Pages
  plugins: [react()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "index.html"
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./attached_assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@shared": path.resolve(__dirname, "./shared")
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname2 = dirname(__filename);
dotenv.config({ path: path3.resolve(__dirname2, "../.env") });
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  }
}));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5050;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
  console.log("Stripe key is:", process.env.STRIPE_SECRET_KEY);
})();
