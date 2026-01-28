import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your Firebase config
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
const auth = getAuth(app);

// UI elements
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const friendsSection = document.getElementById("friendsSection");
const authSection = document.getElementById("authSection");
const authButtons = document.getElementById("authButtons");

// Toggle forms
loginBtn.addEventListener("click", () => {
  signupForm.classList.add("hidden");
  loginForm.classList.toggle("hidden");
});
signupBtn.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  signupForm.classList.toggle("hidden");
});

// Handle signup
document.getElementById("doSignup").addEventListener("click", async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created!");
  } catch (err) {
    alert(err.message);
  }
});

// Handle login
document.getElementById("doLogin").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
});

// Handle logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// Watch auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    authButtons.classList.add("hidden");
    authSection.classList.add("hidden");
    friendsSection.classList.remove("hidden");
  } else {
    authButtons.classList.remove("hidden");
    authSection.classList.remove("hidden");
    friendsSection.classList.add("hidden");
  }
});
