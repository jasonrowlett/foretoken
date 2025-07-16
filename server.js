const http = require('http');
const fs = require('fs');
const path = require('path');
const { handleStripeWebhook } = require('./stripeWebhook');
const createCheckoutSession = require('./createCheckoutSession');

const PORT = process.env.PORT || 10000;
const publicDir = path.join(__dirname, 'docs');

const server = http.createServer((req, res) => {
  // Handle CORS for all requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle POST to /create-checkout-session
  if (req.method === 'POST' && req.url === '/create-checkout-session') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const sessionUrl = await createCheckoutSession(data.plan);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ url: sessionUrl }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Checkout session failed', details: err.message }));
      }
    });
    return;
  }

  // ✅ NEW: Handle Stripe webhook
  if (req.method === 'POST' && req.url === '/webhook') {
    return handleStripeWebhook(req, res);
  }

  // Default: serve static files from /docs
  let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);

  // Prevent backend routes from being treated as static files
  if (req.url === '/create-checkout-session' || req.url === '/webhook') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('Method Not Allowed');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const extname = path.extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
    }[extname] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Static server running at http://localhost:${PORT}`);
});
