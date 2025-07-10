// stripeWebhook.ts

import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15', // ✅ downgrade to supported version
});

const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!webhookSecret) {
      throw new Error('Webhook secret is missing in environment variables.');
    }

    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Example: Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const priceId = session.metadata?.price_id || 'unknown';
    console.log(`Checkout session completed. Price ID: ${priceId}`);
    // Add more logic here (store session, trigger emails, etc.)
  }

  res.json({ received: true });
});

export default router;
