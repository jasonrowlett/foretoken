// firebase-admin.js

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let serviceAccount;

try {
  // Try Render's mounted secret path
  const secretPath = '/etc/secrets/firebase-service-account.json';
  if (fs.existsSync(secretPath)) {
    serviceAccount = require(secretPath);
    console.log('[✅] Loaded service account from /etc/secrets');
  } else {
    // Fallback: local path for development
    const localPath = path.join(__dirname, 'firebase-service-account.json');
    serviceAccount = require(localPath);
    console.log('[✅] Loaded service account from local file');
  }
} catch (error) {
  console.error('[❌] Failed to load Firebase service account credentials:', error);
  throw error;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
