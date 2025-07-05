
// FILE: src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbyCp4vWmFbV9gF5FG9T3fy0DO6XAJXUQ",
  authDomain: "socialcircletracker.firebaseapp.com",
  projectId: "socialcircletracker",
  storageBucket: "socialcircletracker.firebasestorage.app",
  messagingSenderId: "704737504694",
  appId: "1:704737504694:web:df7eb9322ebbbd31962517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
