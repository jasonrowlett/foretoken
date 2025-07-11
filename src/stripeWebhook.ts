// src/stripeWebhook.ts
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

router.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      if (!sig || typeof sig !== 'string') {
        throw new Error('Missing or invalid Stripe signature header');
      }

      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unknown error';
      console.error(`❌ Webhook error: ${message}`);
      return res.status(400).send(`Webhook Error: ${message}`);
    }

    console.log('✅ Webhook event received:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`🎉 Subscription completed: ${session.id}`);
    }

    res.status(200).send('✅ Webhook handled');
  }
);

export default router;
