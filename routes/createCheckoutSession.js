// routes/createCheckoutSession.js

const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Replace with your real Stripe price IDs
const PRODUCT_PRICES = {
  monthly: 'price_1Oxyz123abcMonthly',
  yearly: 'price_1Oxyz123abcYearly'
};

router.post('/create-checkout-session', async (req, res) => {
  const { plan } = req.body;

  if (!plan || !PRODUCT_PRICES[plan]) {
    return res.status(400).json({ error: 'Invalid subscription plan selected.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: PRODUCT_PRICES[plan],
          quantity: 1,
        },
      ],
      success_url: `${process.env.DOMAIN}/checkout-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/checkout-cancel.html`,
      metadata: {
        plan
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout Session Error:', err.message);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

module.exports = router;
