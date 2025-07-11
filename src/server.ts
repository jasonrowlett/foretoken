import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stripeWebhookHandler from './stripeWebhook.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use raw body only for Stripe webhook
app.use('/stripe-webhook', express.raw({ type: 'application/json' }));

// Middleware / Use JSON parser for all other routes
app.use((req, res, next) => {
  if (req.originalUrl === '/stripe-webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(cors());

app.get('/', (_req, res) => {
  res.send('Foretoken backend server is running.');
});

app.post('/stripe-webhook', stripeWebhookHandler);

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
