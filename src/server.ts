import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import webhookRoute from './stripeWebhook.js';

dotenv.config();

const app = express();

// Stripe webhook needs raw body parsing
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/webhook') {
    bodyParser.raw({ type: 'application/json' })(req, res, next);
  } else {
    bodyParser.json()(req, res, next);
  }
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../docs')));

// API routes
import webhookRoute from './stripeWebhook';
app.use('/', webhookRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
