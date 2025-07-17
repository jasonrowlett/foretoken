// firebase-admin.js
const admin = require('firebase-admin');
const fs = require('fs');

// Path used by Render (matches Secret File key)
const serviceAccountPath = '/etc/secrets/firebase-service-account.json';

let serviceAccount;

if (fs.existsSync(serviceAccountPath)) {
  serviceAccount = require(serviceAccountPath);
  console.log('✅ Loaded service account from Render secrets.');
} else {
  // Local fallback for development
  serviceAccount = require('./firebase-service-account.json');
  console.log('🔧 Loaded local service account file.');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
module.exports = db;
