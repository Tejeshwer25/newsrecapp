// Import the functions you need from the SDKs you need
// import { firebase } from "firebase/app"
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlNGYhWS3byTjIsMk7-hf23lBE5mnlk-8",
  authDomain: "assurenews25.firebaseapp.com",
  databaseURL: "https://assurenews25-default-rtdb.asia-southeast1.firebasedatabase.app",
  databaseUrl: "https://assurenews25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "assurenews25",
  storageBucket: "assurenews25.appspot.com",
  messagingSenderId: "534053082905",
  appId: "1:534053082905:web:8df6626911fd2f6ba2d788",
  measurementId: "G-DVTKLJYD4N",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();



const db = getFirestore();
const storage = getStorage();
const analytics = getAnalytics(app);
const auth = getAuth(app);
const myDb = getDatabase(app);


export {app, db, storage, analytics, auth, myDb};