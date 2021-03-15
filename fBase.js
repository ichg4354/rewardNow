import dotenv from "dotenv";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

dotenv.config();
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAL0Iw9c7DkHXxhK6zf6phAKDvuRd9JQWo",
  authDomain: "rewardnow-4056d.firebaseapp.com",
  projectId: "rewardnow-4056d",
  storageBucket: "rewardnow-4056d.appspot.com",
  messagingSenderId: "810332693325",
  appId: "1:810332693325:web:0b6926c1998cef7554cd04",
  measurementId: "G-1QXELTYTHX",
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();

export const storeService = firebase.firestore();

export const ArrayTool = firebase.firestore.FieldValue;
