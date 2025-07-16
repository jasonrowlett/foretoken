const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_...');

module.exports = async function createCheckoutSession(plan) {
  if (!plan) throw new Error('Plan not provided');

  const prices = {
    monthly: 'price_1RlYSGEQSEnAatPzxfUcPt2s',       // Foretoken Insider Monthly – $19.99
    yearly: 'price_1RlYTHEQSEnAatPzVoCrrLmo',        // Foretoken Insider Yearly – $215.89
    pro_monthly: 'price_1RlYTiEQSEnAatPziOQxQmq1',   // Foretoken Pro Monthly – $29.99
    pro_yearly: 'price_1RlYUBEQSEnAatPzmt3U7uTS',    // Foretoken Pro Yearly – $324.99
    enterprise_yearly: 'price_1RlYUpEQSEnAatPzz9Vj1e7L' // Foretoken Enterprise Yearly – $2,149
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
