const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use live secret from .env

module.exports = async function createCheckoutSession(plan) {
  if (!plan) throw new Error('Plan not provided');

  const prices = {
    monthly: 'price_1RPVhwEQSEnAatPzcBLCAgRZ',         // Insider Monthly (LIVE)
    yearly: 'price_1RUd2pEQSEnAatPzrdY7SY46',          // Insider Yearly (LIVE)
    pro_monthly: 'price_1RPVfMEQSEnAatPzBfIehlb6',     // Pro Monthly (LIVE)
    pro_yearly: 'price_1RUct0EQSEnAatPzzvImS36S',      // Pro Yearly (LIVE)
    enterprise: 'price_1RIMB8EQSEnAatPzjW7b28bU'        // Enterprise Yearly (LIVE)
  };

  const selectedPrice = prices[plan];
  if (!selectedPrice) throw new Error('Invalid plan: ' + plan);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
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
