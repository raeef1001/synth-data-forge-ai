import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin
let serviceAccount;
try {
  serviceAccount = typeof process.env.FIREBASE_SERVICE_ACCOUNT === 'string' 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : process.env.FIREBASE_SERVICE_ACCOUNT;
} catch (error) {
  console.error('Error parsing Firebase service account:', error);
  throw new Error('Invalid Firebase service account configuration');
}

if (!serviceAccount?.project_id) {
  throw new Error('Firebase service account is missing required fields');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();

export default admin;
