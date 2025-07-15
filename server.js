const http = require('http');
const fs = require('fs');
const path = require('path');
const { handleStripeWebhook } = require('./stripeWebhook');
const { handleCheckoutRequest } = require('./createCheckoutSession');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/stripe-webhook') {
    return handleStripeWebhook(req, res);
  }

  if (req.method === 'POST' && req.url === '/create-checkout-session') {
    return handleCheckoutRequest(req, res);
  }

  // Serve static files
  let filePath = '.' + (req.url === '/' ? '/signup.html' : req.url);
  const extname = path.extname(filePath);

  const contentTypeMap = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  const contentType = contentTypeMap[extname] || 'application/octet-stream';

  fs.readFile(path.join(__dirname, 'docs', filePath), (err, content) => {
    if (err) {
      res.writeHead(404);
      return res.end('File not found');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Static server running at http://localhost:${PORT}`);
});
