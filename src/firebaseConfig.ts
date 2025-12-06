// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add your web app's Firebase configuration
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClePsYBEvFKkLNo7uDhRPlLScxWhlCd_s",
  authDomain: "gestaocontasusers.firebaseapp.com",
  projectId: "gestaocontasusers",
  storageBucket: "gestaocontasusers.firebasestorage.app",
  messagingSenderId: "93455409450",
  appId: "1:93455409450:web:9dd725f0a2c56f2a47fe53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
