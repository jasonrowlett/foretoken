import Stripe from 'stripe';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

// Ensure env key is string or throw early
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables');
}
if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripeWebhookHandler = (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const rawBody = req.body; // Express.raw() ensures this is a Buffer

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Stripe webhook event received:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata ?? {};
    const priceId = metadata.price_id ?? 'unknown';
    const customerEmail = session.customer_details?.email ?? 'no email';

    console.log('🪙 Checkout complete for price ID:', priceId);
    console.log('📧 Customer email:', customerEmail);
  }

  res.status(200).json({ received: true });
};

export default stripeWebhookHandler;
