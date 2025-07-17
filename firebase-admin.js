const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let serviceAccount;

try {
  const serviceAccountPath = '/etc/secrets/firebase-service-account.json';

  if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    console.error('❌ Service account JSON not found at expected path:', serviceAccountPath);
    throw new Error('Missing service account file.');
  }
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
  throw error;
}

const db = admin.firestore();
module.exports = db;
