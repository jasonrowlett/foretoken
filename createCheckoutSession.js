const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_...');

module.exports = async function createCheckoutSession(plan) {
  if (!plan) throw new Error('Plan not provided');

  const prices = {
    monthly: 'price_1RlYSGEQSEnAatPzxfUcPt2s',         // Test: Insider Monthly
    yearly: 'price_1RlYTHEQSEnAatPzVoCrrLmo',          // Test: Insider Yearly
    pro_monthly: 'price_1RlYTiEQSEnAatPziOQxQmq1',     // Test: Pro Monthly
    pro_yearly: 'price_1RlYUBEQSEnAatPzmt3U7uTS',      // Test: Pro Yearly
    enterprise_yearly: 'price_1RlYUpEQSEnAatPzz9Vj1e7L'// Test: Enterprise Yearly
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
