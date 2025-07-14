// checkout.js (no Express)

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function handleGenericCheckout(req, res) {
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

    const { priceId } = body;
    if (!priceId) {
      res.writeHead(400);
      return res.end('Missing priceId');
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.DOMAIN}/checkout-success.html`,
        cancel_url: `${process.env.DOMAIN}/checkout-cancel.html`,
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ url: session.url }));
    } ca
