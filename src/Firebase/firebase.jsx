// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDB8njqWjT3f0J5O6sH9AK-6ToNIpuic2c",
  authDomain: "sign-in-progrees.firebaseapp.com",
  projectId: "sign-in-progrees",
  storageBucket: "sign-in-progrees.appspot.com",
  messagingSenderId: "125518392921",
  appId: "1:125518392921:web:b7fc240f2816ec054bcb48",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
