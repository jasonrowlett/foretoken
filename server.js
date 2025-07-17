
const http = require('http');
const fs = require('fs');
const path = require('path');
const stripeWebhook = require('./stripeWebhook');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Set CORS headers (optional but useful for MVP)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle Stripe webhook
  if (req.method === 'POST' && req.url === '/stripe-webhook') {
    req.headers['content-type'] = 'application/json'; // Required for raw body verification
    return stripeWebhook(req, res);
  }

  // Handle create-checkout-session
  else if (req.method === 'POST' && req.url === '/api/create-checkout-session') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const { plan, email } = JSON.parse(body);
        const createCheckoutSession = require('./createCheckoutSession');
        const session = await createCheckoutSession(plan, email);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ url: session.url }));
      } catch (err) {
        console.error('Error creating checkout session:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Failed to create checkout session.');
      }
    });
    return;
  }

  // Serve static files from /docs
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
      res.writeHead(404);
      res.end('404 - Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
