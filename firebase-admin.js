const admin = require('firebase-admin');
const fs = require('fs');

const secretPath = '/etc/secrets/firebase-service-account.json';

let db = null;

try {
  if (!fs.existsSync(secretPath)) {
    throw new Error(`Secret file not found at ${secretPath}`);
  }

  const serviceAccount = require(secretPath);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  db = admin.firestore();
} catch (err) {
  console.error('❌ Firebase initialization failed:', err.message);
}

module.exports = db;
