function handleStripeWebhook(req, res) {
  let rawBody = '';

  req.on('data', chunk => rawBody += chunk);
  req.on('end', async () => {
    try {
      const sig = req.headers['stripe-signature'];
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const admin = require('./firebase-admin');
      const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
      const db = admin.firestore();

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const email = session.customer_email || 'unknown_email';

        // Store session in Firestore
        await db.collection('users').doc(email).collection('sessions').doc(session.id).set(session);

        // Assign tier based on test price IDs
        const priceId = session?.display_items?.[0]?.price?.id;
        const tierMap = {
          'price_1RlYSGEQSEnAatPzxfUcPt2s': 'monthly',
          'price_1RlYTHEQSEnAatPzVoCrrLmo': 'yearly',
          'price_1RlYTiEQSEnAatPziOQxQmq1': 'pro_monthly',
          'price_1RlYUBEQSEnAatPzmt3U7uTS': 'pro_yearly',
          'price_1RlYUpEQSEnAatPzz9Vj1e7L': 'enterprise'
        };
        const tier = tierMap[priceId] || 'unknown';

        await db.collection('users').doc(email).set({
          email,
          tier,
          subscribed: true,
          lastCheckout: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log(`✅ Stored session + assigned tier (${tier}) for ${email}`);
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
