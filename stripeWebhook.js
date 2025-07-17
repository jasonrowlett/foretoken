
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('./firebase-admin.js');
const firestore = admin.firestore();

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
      const email = session.customer_email || session.customer_details?.email || 'unknown';
      const priceId = session?.items?.[0]?.price?.id || session?.display_items?.[0]?.price?.id || 'unknown';

      let tier;
      switch (priceId) {
        case 'price_1RdxZZEQSEnAatPzHi8xTC3b':
        case 'price_1RdxZZEQSEnAatPzzYA83mdh':
          tier = 'Insider';
          break;
        case 'price_1RdxZZEQSEnAatPzqab2Ph5S':
        case 'price_1RdxZaEQSEnAatPz23U3dnNN':
          tier = 'Pro';
          break;
        case 'price_1RjMB8EQSEnAatPzjW7b28bU':
          tier = 'Enterprise';
          break;
        default:
          tier = 'Unknown';
      }

      try {
        await firestore.collection('users').doc(email).set({
          email,
          tier,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`✅ User ${email} written to Firestore as ${tier}`);
        res.writeHead(200);
        return res.end('Success');
      } catch (err) {
        console.error('❌ Firestore error:', err);
        res.writeHead(500);
        return res.end('Database error');
      }
    }

    res.writeHead(200);
    res.end('Event not handled');
  });
};
