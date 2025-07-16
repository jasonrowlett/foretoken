
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const fs = require('fs');

// Lazy initialize Firebase admin
if (!admin.apps.length) {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH || './foretoken-4e948-firebase-adminsdk-fbsvc-e99027cd03.json';
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const firestore = admin.firestore();

module.exports = async (req, res) => {
  let data = '';

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', async () => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(data, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook Error:', err.message);
      res.writeHead(400);
      return res.end(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session.customer_email;
      const priceId = session?.display_items?.[0]?.price?.id || session?.items?.[0]?.price?.id || session?.subscription || 'unknown';
      const tier = session.metadata?.plan || 'unknown';

      try {
        await firestore.collection('users').doc(email).set({ email, tier, priceId, timestamp: new Date().toISOString() });
        console.log(`User ${email} added to Firestore.`);
      } catch (err) {
        console.error('Firestore error:', err);
      }
    }

    res.writeHead(200);
    res.end('Received');
  });
};
