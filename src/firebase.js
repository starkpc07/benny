// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these dummy values with your actual config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA-DUMMY-KEY-123456789",
  authDomain: "benny-events.firebaseapp.com",
  projectId: "benny-events",
  storageBucket: "benny-events.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Optional: Configure Google Provider (e.g., forcing account selection)
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;