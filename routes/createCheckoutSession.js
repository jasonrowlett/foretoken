// createCheckoutSession.js (no Express)

const Stripe = require('stripe');
const dotenv = require('dotenv');
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Replace with your real Stripe price IDs
const PRODUCT_PRICES = {
  monthly: 'price_1Oxyz123abcMonthly',
  yearly: 'price_1Oxyz123abcYearly'
};

async function handleCheckoutRequest(req, res) {
  let data = '';

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', async () => {
    let body;
    try {
      body = JSON.parse(data);
    } catch {
      res.writeHead(400);
      return res.end('Invalid JSON');
    }

    const { plan } = body;
    if (!plan || !PRODUCT_PRICES[plan]) {
      res.writeHead(400);
      return res.end('Invalid subscription plan selected.');
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [{ price: PRODUCT_PRICES[plan], quantity: 1 }],
        success_url: `${process.env.DOMAIN}/checkout-success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.DOMAIN}/checkout-cancel.html`,
        metadata: { plan },
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ url: session.url }));
    } catch (err) {
      console.error('Checkout Session Error:', err.message);
      res.writeHead(500);
      res.end('Unable to create checkout session');
    }
  });
}

module.exports = { handleCheckoutRequest };
