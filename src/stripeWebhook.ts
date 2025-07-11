import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import fs from 'fs';

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS!;
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

router.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Example: handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('✅ Stripe Checkout Session:', session);

    const email = session.customer_email;
    const tier = session.metadata?.tier || 'free';

    if (email) {
      admin
        .auth()
        .getUserByEmail(email)
        .then(userRecord => {
          return admin.auth().setCustomUserClaims(userRecord.uid, { tier });
        })
        .then(() => {
          console.log(`✅ User ${email} updated with tier: ${tier}`);
        })
        .catch(error => {
          console.error('🔥 Firebase error:', error);
        });
    }
  }

  res.sendStatus(200);
});

export default router;
