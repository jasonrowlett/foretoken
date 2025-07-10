// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import stripeWebhookHandler from './stripeWebhook.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Stripe webhook route must use raw body for signature verification
app.post(
  '/stripe-webhook',
  bodyParser.raw({ type: 'application/json' }),
  stripeWebhookHandler
);

// All other routes can use JSON parser
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Foretoken backend server is running.');
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
