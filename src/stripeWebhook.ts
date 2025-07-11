// stripeWebhook.ts
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

const stripeWebhookHandler = express.raw({ type: 'application/json' });

const handler = async (req: express.Request, res: express.Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    // ✅ Log the incoming event type and full payload
    console.log('✅ Stripe Event Type:', event.type);
    console.log('📦 Stripe Payload:', JSON.stringify(event.data.object, null, 2));
  } catch (err) {
    console.error('❌ Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  // You can expand this to handle different event types later
  switch (event.type) {
    case 'checkout.session.completed':
      console.log('🎉 Payment was successful!');
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};

export default [stripeWebhookHandler, handler];
