const http = require('http');
const fs = require('fs');
const path = require('path');
const stripeWebhook = require('./stripeWebhook');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // CORS headers for MVP
  res.setHeader('Access-Control-Allow-Origin', 'https://foretoken.xyz');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS' && req.url === '/api/create-checkout-session') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Stripe webhook
  if (req.method === 'POST' && req.url === '/stripe-webhook') {
    req.headers['content-type'] = 'application/json';
    return stripeWebhook(req, res);
  }

  // Checkout session creation
  if (req.method === 'POST' && req.url === '/api/create-checkout-session') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        console.log('[Incoming POST body]', body);
        const { plan, email } = JSON.parse(body);

        console.log('[Checkout Request]', { plan, email });

        const createCheckoutSession = require('./createCheckoutSession');
        const sessionUrl = await createCheckoutSession(plan, email);

        console.log('[✅ Stripe session created]', sessionUrl);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ url: sessionUrl }));
      } catch (err) {
        console.error('❌ Stripe session creation failed');
        console.error(err);

        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Checkout failed: ' + err.message }));
      }
    });

    return;
  }

  // 404 fallback
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
