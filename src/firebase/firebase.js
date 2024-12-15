// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "abhi-project-showarama-momos.firebaseapp.com",
    projectId: "abhi-project-showarama-momos",
    storageBucket: "abhi-project-showarama-momos.firebasestorage.app",
    messagingSenderId: "208883426291",
    appId: "1:208883426291:web:75a1f5fa5d98b5a5d2a886"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth }