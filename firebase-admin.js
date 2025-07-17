const admin = require('firebase-admin');
const path = require('path');

const serviceAccountPath = process.env.NODE_ENV === 'production'
  ? '/etc/secrets/firebase-service-account.json'
  : path.resolve(__dirname, 'firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

const db = admin.firestore();

module.exports = db;