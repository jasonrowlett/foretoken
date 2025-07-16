const admin = require('./firebase-admin'); // assumes firebase-admin.js is in same folder
const db = admin.firestore();

const stripe = require('stripe')('your_stripe_secret_key'); // replace with your secret key
const endpointSecret = 'your_stripe_webhook_secret'; // replace with actual signing secret

const crypto = require('crypto');

// Export handler function
module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('Method Not Allowed');
  }

  let sig = req.headers['stripe-signature'];
  let buf = '';

  req.on('data', (chunk) => {
    buf += chunk;
  });

  req.on('end', async () => {
    let event;

    try {
      const rawBody = Buffer.from(buf, 'utf8');
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      console.error('[Webhook] Signature verification failed:', err.message);
      res.writeHead(400);
      return res.end(`Webhook Error: ${err.message}`);
    }

    // ✅ Handle successful checkout
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_details.email;
      const subscriptionId = session.subscription;

      console.log('[Webhook] Checkout completed for:', customerEmail);

      // Optional: Fetch subscription to get price/tier
      try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0].price.id;

        await db.collection('users').doc(customerEmail).set({
          email: customerEmail,
          stripe_subscription: subscriptionId,
          stripe_price_id: priceId,
          created: new Date().toISOString()
        });

        await db.collection('users').doc(customerEmail).set({
          email: customerEmail,
          tier: tier,
          stripe_subscription: subscriptionId,
          created: new Date().toISOString()
        });

        console.log(`[Firestore] User created: ${customerEmail} (${tier})`);
      } catch (error) {
        console.error('[Firestore] Failed to create user:', error);
      }
    }

    // ✅ Respond to Stripe
    res.writeHead(200);
    res.end('Received');
  });
};
