const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

const webhookRoute = require('./stripeWebhook');

dotenv.config();
const app = express();

// Stripe raw body parsing
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    bodyParser.raw({ type: 'application/json' })(req, res, next);
  } else {
    bodyParser.json()(req, res, next);
  }
});

// Serve static frontend
app.use(express.static(path.join(__dirname, './docs')));

// API routes
app.use('/', webhookRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
