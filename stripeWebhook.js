// stripeWebhook.js (CommonJS version)

const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const fs = require('fs');
const admin = require('firebase-admin');

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Load Firebase service account key
const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH, 'utf8')
);

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Stripe webhook endpoint
router.use(express.raw({ type: 'application/json' }));

router.post('/stripe-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email || 'unknown_email';
    const sessionId = session.id;

    try {
      await db
        .collection('users')
        .doc(email)
        .collection('sessions')
        .doc(sessionId)
        .set(session);

      console.log(`✅ Stored session for ${email}`);
    } catch (err) {
      console.error('❌ Firestore write failed:', err.message);
      return res.status(500).send('Firestore error');
    }
  }

  res.status(200).send('Webhook received');
});

module.exports = router;
