import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stripeWebhookHandler from './stripeWebhook.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// ✅ Only use raw body for the webhook route
app.use('/stripe-webhook', express.raw({ type: 'application/json' }));
// ✅ Use JSON parsing for everything else
app.use((req, res, next) => {
    if (req.originalUrl === '/stripe-webhook') {
        next();
    }
    else {
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
