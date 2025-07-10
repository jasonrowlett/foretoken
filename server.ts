import { IncomingMessage } from 'http';

declare module 'http' {
  interface IncomingMessage {
    rawBody: string;
  }
}
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stripeWebhookHandler from './stripeWebhook.js'; // ✅ Import handler

dotenv.config(); // Load environment variables

const app = express(); // ✅ Declare app BEFORE using it
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    // ✅ Needed to verify Stripe signature
    req.rawBody = buf.toString();
  }
}));

// ✅ Stripe webhook route
app.post('/stripe-webhook', stripeWebhookHandler);

// Root route
app.get('/', (_req, res) => {
  res.send('Foretoken backend server is running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
