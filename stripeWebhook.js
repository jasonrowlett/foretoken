const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('Method Not Allowed');
  }

  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));

  req.on('end', async () => {
    const rawBody = Buffer.concat(chunks);
    const sig = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification error:', err.message);
      res.writeHead(400);
      return res.end(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session.customer_email;
      const priceId = session?.display_items?.[0]?.price?.id || 'unknown';
      const tier = priceId === 'price_123' ? 'Insider' :
                   priceId === 'price_456' ? 'Enterprise' : 'Unknown';

      try {
        await firestore.collection('users').doc(email).set({
          email,
          tier,
          createdAt: new Date()
        });
        console.log(`User ${email} written to Firestore`);
        res.writeHead(200);
        return res.end('Success');
      } catch (err) {
        console.error('Firestore error:', err);
        res.writeHead(500);
        return res.end('Database error');
      }
    }

    res.writeHead(200);
    res.end('Event not handled');
  });
};
