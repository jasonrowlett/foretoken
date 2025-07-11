import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { buffer } from 'micro';
import admin from 'firebase-admin';
import serviceAccount from './firebaseServiceAccountKey.json' assert { type: 'json' };

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}
const db = admin.firestore();
const auth = admin.auth();

export const stripeWebhook = express.Router();

stripeWebhook.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_LIVE;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string, endpointSecret as string);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  console.log(`🔔 Received event: ${event.type}`);

  // STEP 1: Handle completed checkout sessions
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email || session.customer_email;

    if (!customerEmail) {
      console.warn('No customer email found on session.');
      return res.status(400).send('Missing customer email');
    }

    try {
      // STEP 2: Check if Firebase user exists
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(customerEmail);
        console.log(`✅ Firebase user exists for ${customerEmail}`);
      } catch (error) {
        console.log(`👤 Creating new Firebase user for ${customerEmail}`);
        userRecord = await auth.createUser({
          email: customerEmail,
          emailVerified: true,
        });
      }

      // STEP 3: Save subscription data in Firestore
      await db.collection('users').doc(userRecord.uid).set({
        email: customerEmail,
        tier: 'pro_monthly',
        stripeCustomerId: session.customer,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      console.log(`📦 Stored subscription data in Firestore for ${customerEmail}`);
    } catch (err) {
      console.error('❌ Error handling checkout session:', err);
      return res.status(500).send('Internal Server Error');
    }
  }

  res.json({ received: true });
});
