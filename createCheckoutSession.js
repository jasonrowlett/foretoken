const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_...');

module.exports = async function createCheckoutSession(plan) {
  if (!plan) throw new Error('Plan not provided');

  const prices = {
    monthly: 'price_1RdxZZEQSEnAatPzHi8xTC3b',       // Foretoken Insider Monthly – $19.99
    yearly: 'price_1RdxZZEQSEnAatPzzYA83mdh',        // Foretoken Insider Yearly – $215.89
    pro_monthly: 'price_1RdxZZEQSEnAatPzqab2Ph5S',   // Foretoken Pro Monthly – $29.99
    pro_yearly: 'price_1RdxZaEQSEnAatPz23U3dnNN',    // Foretoken Pro Yearly – $324.99
    enterprise_yearly: 'price_1RjMB8EQSEnAatPzjW7b28bU' // Foretoken Enterprise Yearly – $2,149
  };

  const selectedPrice = prices[plan];
  if (!selectedPrice) throw new Error('Invalid plan');

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
