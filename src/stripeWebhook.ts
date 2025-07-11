import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // apiVersion not needed — Stripe uses default version from your dashboard
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!endpointSecret) throw new Error("Missing STRIPE_WEBHOOK_SECRET in .env");

const stripeWebhookHandler = express.raw({ type: 'application/json' });

const handler = async (req: express.Request, res: express.Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('✅ Webhook received:', event.type);

  // TODO: Forward subscriber to Firebase logic here...

  res.json({ received: true });
};

export default [stripeWebhookHandler, handler];
