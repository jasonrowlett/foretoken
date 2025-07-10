import express from 'express';
import bodyParser from 'body-parser';
import stripeWebhookHandler from './stripeWebhook.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

// Use raw body for Stripe webhook
app.post('/stripe-webhook',
  bodyParser.raw({ type: 'application/json' }),
  stripeWebhookHandler
);

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(port, () => {
  console.log(`✅ Server is listening on port ${port}`);
});
