import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stripeWebhookHandler from './stripeWebhook.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Raw body for Stripe webhook
app.post('/stripe-webhook', express.raw({ type: 'application/json' }), stripeWebhookHandler);

// JSON body parser for everything else
app.use(express.json());

// Enable CORS
app.use(cors());

// Health check route
app.get('/', (_req, res) => {
  res.send('Foretoken backend server is running.');
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
