// stripeWebhook.js
import express from 'express';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15', // supported version
});
const router = express.Router();
// Stripe expects the raw body to validate signatures
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        if (!webhookSecret) {
            throw new Error('Webhook secret is missing in environment variables.');
        }
        // Coerce req to include rawBody for Stripe verification
        const rawBody = req.body?.toString?.() || req.rawBody?.toString?.();
        if (!rawBody) {
            throw new Error('Missing raw body for Stripe verification.');
        }
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    }
    catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // ✅ Example: Handle checkout session completed
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const priceId = session.metadata?.price_id || 'unknown';
        console.log(`✅ Checkout session completed. Price ID: ${priceId}`);
        // You could store the session or trigger emails here
    }
    res.json({ received: true });
});
export default router;
