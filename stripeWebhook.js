const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const admin = require('./firebase-admin');
const firestore = admin.firestore();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    console.log('[Webhook Event Received]', event.type);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.writeHead(400).end(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const email = session.customer_email || session.customer_details?.email;

      if (email) {
        console.log(`[checkout.session.completed] Email: ${email}`);
        await firestore.collection('users').doc(email).set({
          email,
          createdAt: new Date().toISOString(),
          stripeCustomerId: session.customer,
          plan: session.metadata?.plan || 'unknown',
        }, { merge: true });
      }
      break;
    }

    case 'invoice.payment_succeeded':
      console.log('[invoice.payment_succeeded] Payment successful');
      break;

    case 'invoice.payment_failed':
      console.log('[invoice.payment_failed] Payment failed');
      break;

    case 'customer.subscription.created':
      console.log('[customer.subscription.created] Subscription created');
      break;

    case 'customer.subscription.updated':
      console.log('[customer.subscription.updated] Subscription updated');
      break;

    default:
      console.log(`[Unhandled event type] ${event.type}`);
  }

  res.writeHead(200);
  res.end();
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
