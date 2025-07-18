const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const db = require('./firebase-admin');

const express = require('express');
const app = express();

app.use(express.raw({ type: 'application/json' }));

app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const log = (...args) => console.log(`[Webhook Event]`, ...args);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const email = session.customer_email;
        const subscriptionId = session.subscription;

        log(`🔥 Writing to Firestore`, email);

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const productId = subscription.items.data[0].price.product;
        const product = await stripe.products.retrieve(productId);

        const tier = product.name.toLowerCase(); // e.g. 'insider', 'pro', 'enterprise'

        if (!['insider', 'pro', 'enterprise'].includes(tier)) {
          throw new Error(`Unknown tier: ${tier}`);
        }

        const userDoc = {
          email,
          tier,
          timestamp: new Date().toISOString(),
        };

        if (!db) {
          throw new Error('Firestore DB not initialized.');
        }

        await db.collection('users').add(userDoc);
        log(`✅ Firestore write complete`, userDoc);
        break;
      }

      default:
        log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send();
  } catch (err) {
    console.error('❌ Webhook handler error:', err);
    res.status(500).send(`Internal error: ${err.message}`);
  }
});

module.exports = app;
