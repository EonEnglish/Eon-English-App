// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2CekCV9iouIPEFpSeCj46ljctTMb3kmQ",
  authDomain: "eon-english-app.firebaseapp.com",
  projectId: "eon-english-app",
  storageBucket: "eon-english-app.appspot.com",
  messagingSenderId: "894295453065",
  appId: "1:894295453065:web:4f3045d2716f6894790558",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };
