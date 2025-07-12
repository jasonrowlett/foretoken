import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import fs from 'fs';
import admin from 'firebase-admin';
import { Buffer } from 'buffer';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Load and parse Firebase service account credentials from JSON
const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH, 'utf8')
);

// Initialize Firebase Admin if not already
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Middleware to collect raw body
router.use(
  express.raw({ type: 'application/json' })
);

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

export default router;
