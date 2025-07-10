import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0QDbUosoe1Kk9SW1NpXKmGWmHOLKP63U",
  authDomain: "skillbridge-b8235.firebaseapp.com",
  projectId: "skillbridge-b8235",
  storageBucket: "skillbridge-b8235.firebasestorage.app",
  messagingSenderId: "429796326220",
  appId: "1:429796326220:web:f116d2fa624a097c07ede9",
  measurementId: "G-0M3QD9CE0F"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you want to use
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);