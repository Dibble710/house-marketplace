// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZsIEejB5v79KxTjjRVTKLUQ9UkqKkk1U",
  authDomain: "house-marketplace-app-cece4.firebaseapp.com",
  projectId: "house-marketplace-app-cece4",
  storageBucket: "house-marketplace-app-cece4.appspot.com",
  messagingSenderId: "462168510637",
  appId: "1:462168510637:web:cff6402380a372f9773624"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();