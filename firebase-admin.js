const admin = require('firebase-admin');
const path = '/etc/secrets/firebase-service-account.json';

try {
  const serviceAccount = require(path);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin SDK:', error);
}

const db = admin.firestore();
module.exports = db;
