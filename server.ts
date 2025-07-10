// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import stripeWebhookHandler from './stripeWebhook.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

// Needed for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Raw body parser for Stripe (must be before json parser!)
app.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhookHandler
);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Foretoken backend server is running.');
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is listening on port ${port}`);
});
