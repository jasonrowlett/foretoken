// stripeWebhook.ts

import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import admin from 'firebase-admin';

// Load environment variables
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

// Adminless Firebase initialization (temporary placeholder)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.applicationDefault(), // Will fail unless running on a service with permissions
  });
}

// Map Stripe Price IDs to Foretoken Tiers
const tierMap: { [key: string]: string } = {
  // Foretoken Insider
  'price_1RPVhwEQSEnAatPzcBLCAqRZ': 'insider_monthly',
  'price_1RUd2pEQSEnAatPzrdY7SY46': 'insider_annual',

  // Foretoken Pro
  'price_1RPVfMEQSEnAatPzBflehIb6': 'pro_monthly',
  'price_1RUct0EQSEnAatPzzvImS36S': 'pro_annual',

  // Foretoken Enterprise (Annual only)
  'prod_SefWHwHTH5AnLP': 'enterprise_annual',
};

export default async function stripeWebhookHandler(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('❌ Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Process event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const priceId = session?.metadata?.price_id || session?.display_items?.[0]?.price?.id;

    console.log(`✅ Checkout complete for: ${customerEmail}, Price ID: ${priceId}`);

    const userTier = tierMap[priceId];
    if (!userTier) {
      console.warn('⚠️ No matching tier for price ID:', priceId);
      return res.status(400).send('Unknown pricing tier.');
    }

    if (!customerEmail) {
      console.warn('⚠️ No email found in session.');
      return res.status(400).send('Missing customer email.');
    }

    try {
      const user = await admin.auth().getUserByEmail(customerEmail);
      await admin.auth().setCustomUserClaims(user.uid, { tier: userTier });

      console.log(`✅ User ${customerEmail} upgraded to tier: ${userTier}`);
    } catch (error) {
      console.error('❌ Firebase error:', error);
      return res.status(500).send('Internal error while setting user tier.');
    }
  }

  res.status(200).send('✅ Webhook received');
}
