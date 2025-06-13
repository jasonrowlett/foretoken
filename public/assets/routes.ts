import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stripeSecretKey =
  process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_SECRET_KEY
    : process.env.STRIPE_TEST_KEY;

console.log('Using Stripe key (partial):', stripeSecretKey?.slice(0, 12) + '********');

if (!stripeSecretKey) {
  console.error('No valid Stripe key found for current environment');
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2022-11-15',
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('Creating checkout session with body:', req.body);

    if (!req.body.priceId) {
      return res.status(400).json({ error: 'Missing priceId in request body' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
