// server.ts

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Verify environment variables
console.log('🔥 Firebase Project:', process.env.FIREBASE_PROJECT_ID);
console.log('💸 Stripe Secret Loaded:', !!process.env.STRIPE_SECRET_KEY);

// Optional: Route check
app.get('/', (_req, res) => {
  res.send('✅ Foretoken server is running');
});

// Import webhook logic
import stripeWebhookHandler from './stripeWebhook';
app.post('/api/stripe-webhook', stripeWebhookHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
