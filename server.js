const http = require('http');
const fs = require('fs');
const path = require('path');
const stripeWebhook = require('./stripeWebhook');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Global CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://foretoken.xyz');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Stripe webhook handler
  if (req.method === 'POST' && req.url === '/stripe-webhook') {
    req.headers['content-type'] = 'application/json';
    return stripeWebhook(req, res);
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS' && req.url === '/api/create-checkout-session') {
    res.writeHead(204); // No Content
    return res.end();
  }

  // Create Stripe Checkout session
  if (req.method === 'POST' && req.url === '/api/create-checkout-session') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { plan, email } = JSON.parse(body);
        console.log('[Checkout Request]', { plan, email });

        const createCheckoutSession = require('./createCheckoutSession');
        const session = await createCheckoutSession(plan, email);

        if (!session || !session.url) {
          console.error('❌ Stripe session creation failed');
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Failed to create session.');
        }

        console.log('[✅ Stripe Session URL]', session.url);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ url: session.url }));
      } catch (err) {
        console.error('❌ Error in /api/create-checkout-session:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
    return;
  }

  // Serve static files from /docs (GitHub Pages)
  const filePath = path.join(__dirname, 'docs', req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.warn('[404] File not found:', filePath);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
