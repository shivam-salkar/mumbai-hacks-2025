import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTXikz3insokEFOCFaumxlIJMuulwX4mM",
    authDomain: "soujanya-d3cc0.firebaseapp.com",
    projectId: "soujanya-d3cc0",
    storageBucket: "soujanya-d3cc0.firebasestorage.app",
    messagingSenderId: "449037202914",
    appId: "1:449037202914:web:c661bba4452d2fd6bcb5bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
