import express from 'express';
import Stripe from 'stripe';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' });

app.use(express.json({ verify: (req: any, res, buf) => { req.rawBody = buf; } }));

// Firebase client SDK config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Tier Mapping
const tierMap: Record<string, string> = {
  'price_1RPVhwEQSEnAatPzcBLCAqRZ': 'Insider Monthly',
  'price_1RUd2pEQSEnAatPzrdY7SY46': 'Insider Annual',
  'price_1RPVfMEQSEnAatPzBflehIb6': 'Pro Monthly',
  'price_1RUct0EQSEnAatPzzvImS36S': 'Pro Annual',
  'prod_SefWHwHTH5AnLP': 'Enterprise',
};

app.post('/api/stripe-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook Error:', err);
    return res.status(400).send(`Webhook Error: ${(err as any).message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const priceId = session.metadata?.priceId || session.metadata?.price_id;
    const userTier = tierMap[priceId!] || 'Free';

    if (email) {
      try {
        await setDoc(doc(db, 'userTiers', email), {
          email,
          userTier,
          updatedAt: new Date().toISOString(),
        });
        console.log(`User ${email} upgraded to ${userTier}`);
      } catch (e) {
        console.error('Firestore Error:', e);
        return res.status(500).send('Error saving to Firestore');
      }
    }
  }

  res.status(200).json({ received: true });
});

export default app;
