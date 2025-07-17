const admin = require('firebase-admin');
const fs = require('fs');

// Read credentials from Render secret file
const serviceAccountPath = '/etc/secrets/firebase-service-account.json';

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error('Firebase service account key file not found at expected path.');
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;
