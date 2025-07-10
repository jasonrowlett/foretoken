import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripeWebhookHandler = (req, res) => {
  const sig = req.headers['stripe-signature'];
  const rawBody = req.body; // Will be a Buffer due to express.raw()

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('✅ Stripe webhook event received:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata || {};
    const priceId = metadata.price_id || 'unknown';
    const customerEmail = session.customer_details?.email || 'no email';

    console.log('💰 Checkout complete for price ID:', priceId);
    console.log('📧 Customer email:', customerEmail);
  }

  res.status(200).json({ received: true });
};

export default stripeWebhookHandler;
