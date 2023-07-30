import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_DRp6Ug-ZrxKy5LLMBMDDqXuvfUbvyyU",
  authDomain: "social-media-70e81.firebaseapp.com",
  projectId: "social-media-70e81",
  storageBucket: "social-media-70e81.appspot.com",
  messagingSenderId: "150864508831",
  appId: "1:150864508831:web:9ed47017c9cde032a66faa",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getAuth,
  createUserWithEmailAndPassword,
  query,
  where,
  getDocs,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteDoc,
  updateDoc,
};
