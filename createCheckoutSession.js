module.exports = async function (req, res) {
  let body = "";

  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      const { plan } = data;

      if (!plan) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Missing plan");
      }

      // ✅ Replace this block with actual Stripe logic as needed
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Checkout session created for: ${plan}` }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });
};
