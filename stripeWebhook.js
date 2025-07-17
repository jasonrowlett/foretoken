const db = require('./firebase-admin');

module.exports = async function stripeWebhook(req, res) {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const event = JSON.parse(body);
      console.log('[Webhook Event]', event.type);

      if (event.type === 'invoice.payment_succeeded') {
        const customerEmail = event.data.object.customer_email || 'unknown';
        const timestamp = new Date().toISOString();

        console.log('[🔥 Writing to Firestore]', customerEmail);

        if (!db) {
          throw new Error('Firestore is not initialized.');
        }

        await db.collection('users').add({
          email: customerEmail,
          timestamp,
        });

        console.log('[✅ Firestore Write Successful]');
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ received: true }));
    } catch (err) {
      console.error('❌ Webhook handler error:', err.message || err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Webhook error' }));
    }
  });
};
