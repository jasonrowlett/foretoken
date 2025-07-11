// src/stripeWebhook.ts
import express from 'express';
import Stripe from 'stripe';
import { buffer } from 'micro';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// ✅ Use supported version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

// ✅ Use express.raw() before express.json()
router.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'] as string | undefined;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      if (!sig) throw new Error('Missing Stripe signature header');
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown webhook error';
      console.error(`❌ Webhook signature verification failed: ${errorMessage}`);
      return res.status(400).send(`Webhook Error: ${errorMessage}`);
    }

    // ✅ Log the event payload cleanly
    console.log('✅ Webhook received:', JSON.stringify(event, null, 2));

    // ✅ Example: Respond to subscription success
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('🧾 Checkout session completed:', session.id);

      // TODO: forward to Firebase based on session info
    }

    res.status(200).send('✅ Webhook handled');
  }
);

export default router;
