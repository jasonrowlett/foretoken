// stripeWebhook.js
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const stripeWebhookHandler = (req, res) => {
  const sig = req.headers['stripe-signature'];

  if (!sig || typeof sig !== 'string') {
    return res.status(400).send('Missing or invalid Stripe signature header.');
  }

  let event;

  try {
    const rawBody = req.body; // Buffer from express.raw
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const metadata = session.metadata || {};
    const customerEmail =
      session.customer_details?.email || 'No email found';

    console.log('✅ Checkout session completed');
    console.log('📧 Email:', customerEmail);
    console.log('📦 Metadata:', metadata);
  }

  res.status(200).json({ received: true });
};
