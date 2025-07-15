function handleStripeWebhook(req, res) {
  let rawBody = '';

  req.on('data', chunk => rawBody += chunk);
  req.on('end', async () => {
    try {
      const sig = req.headers['stripe-signature'];
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const admin = require('firebase-admin');
      const fs = require('fs');

      const serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH, 'utf8'));
      if (!admin.apps.length) {
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
      }

      const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
      const db = admin.firestore();

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const email = session.customer_email || 'unknown_email';
        await db.collection('users').doc(email).collection('sessions').doc(session.id).set(session);
        console.log(`✅ Stored session for ${email}`);
      }

      res.writeHead(200);
      res.end('Webhook received');
    } catch (err) {
      console.error('❌ Stripe webhook error:', err.message);
      res.writeHead(400);
      res.end(`Error: ${err.message}`);
    }
  });
}

module.exports = { handleStripeWebhook };
