import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyC5MhE5RkPvf3Nwz5G3F_RfqTok59Lw53M",
  authDomain: "wedding-website-174f9.firebaseapp.com",
  projectId: "wedding-website-174f9",
  storageBucket: "wedding-website-174f9.firebasestorage.app",
  messagingSenderId: "796313870387",
  appId: "1:796313870387:web:d0d64293271b89d7ddc346",
  measurementId: "G-HHY6BM3KVL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;