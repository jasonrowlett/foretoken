
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use live secret from .env

module.exports = async function createCheckoutSession(plan, email) {
  if (!plan || !email) throw new Error('Plan or email not provided');

  const prices = {
    monthly: 'price_1RdxZZEQSEnAatPzHi8xTC3b',         // Insider Monthly (LIVE)
    yearly: 'price_1RdxZZEQSEnAatPzzYA83mdh',          // Insider Yearly (LIVE)
    pro_monthly: 'price_1RdxZZEQSEnAatPzqab2Ph5S',     // Pro Monthly (LIVE)
    pro_yearly: 'price_1RdxZaEQSEnAatPz23U3dnNN',      // Pro Yearly (LIVE)
    enterprise: 'price_1RjMB8EQSEnAatPzjW7b28bU'        // Enterprise Yearly (LIVE)
  };

  const selectedPrice = prices[plan];
  if (!selectedPrice) throw new Error('Invalid plan: ' + plan);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: email,
    line_items: [
      {
        price: selectedPrice,
        quantity: 1,
      },
    ],
    success_url: 'https://foretoken.xyz/checkout-success.html',
    cancel_url: 'https://foretoken.xyz/subscribe.html',
  });

  return session.url;
};
