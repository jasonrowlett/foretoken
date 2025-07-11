// Line 1
import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Line 6
dotenv.config();
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15' // ✅ FIXED
});

router.post('/stripe-webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string, endpointSecret as string); // ✅ FIXED
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ LOG THE EVENT
  console.log('✅ Received Stripe event:', event);

  // Example: handle completed checkout session
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('🎉 Payment succeeded for session:', session.id);
    // TODO: Add Firebase user write here
  }

  res.status(200).json({ received: true });
});

export default router;
