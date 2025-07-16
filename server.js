const http = require('http');
const fs = require('fs');
const path = require('path');
const createCheckoutSession = require('./createCheckoutSession');

const PORT = process.env.PORT || 10000;
const publicDir = path.join(__dirname, 'docs');

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/create-checkout-session') {
    // Collect incoming data
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

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

  // Serve static files from /docs
  let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);
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

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Static server running at http://localhost:${PORT}`);
});
