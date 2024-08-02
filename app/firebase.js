/// firebase.js or firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAERrOBCOMKLi9DIsRgYs8R4Bn5QJwDyB0",
  authDomain: "pantry-tracker-8bfb0.firebaseapp.com",
  projectId: "pantry-tracker-8bfb0",
  storageBucket: "pantry-tracker-8bfb0.appspot.com",
  messagingSenderId: "550837398234",
  appId: "1:550837398234:web:0de92c490123ea0a0e93e3",
  measurementId: "G-FGJ1G5DNQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // This should be the Firestore instance