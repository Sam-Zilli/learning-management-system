// Firebase configuration
const firebaseConfig = 
{
    "projectId": "learning-management-syst-d37bb",
    "appId": "1:730485178401:web:e8468856be144bcbb0a360",
    "storageBucket": "learning-management-syst-d37bb.firebasestorage.app",
    "apiKey": "AIzaSyAPi06avlL2IUMthALm63HTqMG6I57o_8k",
    "authDomain": "learning-management-syst-d37bb.firebaseapp.com",
    "messagingSenderId": "730485178401",
    "projectNumber": "730485178401",
    "version": "2"
  }


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
