// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlNGYhWS3byTjIsMk7-hf23lBE5mnlk-8",
  authDomain: "assurenews25.firebaseapp.com",
  projectId: "assurenews25",
  storageBucket: "assurenews25.appspot.com",
  messagingSenderId: "534053082905",
  appId: "1:534053082905:web:8df6626911fd2f6ba2d788",
  measurementId: "G-DVTKLJYD4N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);