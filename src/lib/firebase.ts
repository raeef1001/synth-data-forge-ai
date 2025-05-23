import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHeaLpgXXWfzYgy2qkTLkalVopxkmAlIs",
  authDomain: "dataforge-ddbe0.firebaseapp.com",
  projectId: "dataforge-ddbe0",
  storageBucket: "dataforge-ddbe0.firebasestorage.app",
  messagingSenderId: "76509336056",
  appId: "1:76509336056:web:49f164f884cac82127460d",
  measurementId: "G-5FLNYXP399"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Authentication helper functions
export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const logOut = () => {
  return signOut(auth);
};

export default app;