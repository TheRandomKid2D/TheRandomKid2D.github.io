// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  setDoc, 
  doc, 
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDM3_vpaeh6e8ODIQGAwM1nmg3xsI6wPvI",
  authDomain: "dynaduck-305ae.firebaseapp.com",
  projectId: "dynaduck-305ae",
  storageBucket: "dynaduck-305ae.firebasestorage.app",
  messagingSenderId: "1095752853036",
  appId: "1:1095752853036:web:bd47e8e3858417a0429389",
  measurementId: "G-G9F4XVWRS1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
