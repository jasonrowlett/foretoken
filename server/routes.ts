const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
require("dotenv").config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || process.env.STRIPE_TEST_KEY, {
  apiVersion: "2022-11-15",
});

router.use(bodyParser.json());

router.post("/api/create-checkout-session", async (req, res) => {
  try {
    console.log("Creating checkout session with body:", req.body);

    const { priceId } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Missing price ID' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
});

module.exports = router;