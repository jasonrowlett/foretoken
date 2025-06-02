const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Stripe = require("stripe");

// Load environment variables (optional if you're using .env)
require("dotenv").config();

// Use your actual Stripe test secret key from Replit secrets
const stripe = new Stripe(process.env.STRIPE_TEST_KEY);

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

// Root route (for basic browser test)
app.get("/", (req, res) => {
  res.send("✅ Foretoken backend is running.");
});

// Stripe checkout session route
app.post("/api/create-checkout-session", async (req, res) => {
  const { priceId, mode } = req.body;

  if (!priceId || !mode) {
    return res.status(400).json({ error: "Missing priceId or mode." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: mode, // 'subscription' or 'payment'
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "https://foretoken.replit.dev/success",
      cancel_url: "https://foretoken.replit.dev/cancel",
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe error:", err.message);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});