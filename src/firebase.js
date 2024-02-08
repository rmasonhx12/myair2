// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACPO2cJgRRFzKfOMkW6Y9lOS8aCn_64Hs",
  authDomain: "jtf1-3b18d.firebaseapp.com",
  projectId: "jtf1-3b18d",
  storageBucket: "jtf1-3b18d.appspot.com",
  messagingSenderId: "1049805349314",
  appId: "1:1049805349314:web:55351add776c41328d365b"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();