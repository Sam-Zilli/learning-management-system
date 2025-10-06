// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPi06avlL2IUMthALm63HTqMG6I57o_8k",
    authDomain: "learning-management-syst-d37bb.firebaseapp.com",
    projectId: "learning-management-syst-d37bb",
    storageBucket: "learning-management-syst-d37bb.firebasestorage.app",
    messagingSenderId: "730485178401",
    appId: "1:730485178401:web:6722e21285bded9fb0a360"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
