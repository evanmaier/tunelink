// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW9i7pzk2xEL7pgDZFNlfvVriSaT6kGHE",
  authDomain: "tunelink-99edc.firebaseapp.com",
  projectId: "tunelink-99edc",
  storageBucket: "tunelink-99edc.appspot.com",
  messagingSenderId: "101567786009",
  appId: "1:101567786009:web:e66d3e1089fc91ff420e88",
  measurementId: "G-6XEX4Y0M76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();