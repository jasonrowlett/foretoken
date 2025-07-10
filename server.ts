import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stripeWebhook from './stripeWebhook';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Stripe webhook route (must use raw body for this endpoint)
app.use('/api', stripeWebhook);

// Health check
app.get('/', (req, res) => {
  res.send('Foretoken API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
