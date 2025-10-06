// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPi06avlL2IUMthALm63HTqMG6I57o_8k",
  authDomain: "learning-management-syst-d37bb.firebaseapp.com",
  projectId: "learning-management-syst-d37bb",
  storageBucket: "learning-management-syst-d37bb.firebasestorage.app",
  messagingSenderId: "730485178401",
  appId: "1:730485178401:web:6722e21285bded9fb0a360"
};

// Initialize Firebase
console.log('🔥 Initializing Firebase...');
console.log('Firebase config:', firebaseConfig);

const app = initializeApp(firebaseConfig);
console.log('✅ Firebase app initialized');

const auth = getAuth(app);
console.log('✅ Firebase Auth initialized');

const db = getFirestore(app);
console.log('✅ Firestore initialized');

// Make Firebase services available globally
window.firebaseApp = app;
window.auth = auth;
window.db = db;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.signOut = signOut;
window.onAuthStateChanged = onAuthStateChanged;
window.collection = collection;
window.doc = doc;
window.GoogleAuthProvider = GoogleAuthProvider;
window.signInWithPopup = signInWithPopup;
window.setDoc = setDoc;
window.getDoc = getDoc;
window.getDocs = getDocs;
window.serverTimestamp = serverTimestamp;
