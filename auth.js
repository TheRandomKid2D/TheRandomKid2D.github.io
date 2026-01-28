import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Handle Sign Up
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const username = document.getElementById("signupUsername").value;

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        username: username,
        email: email,
        createdAt: new Date()
      });
      alert("✅ Account created successfully!");
      window.location.href = "index.html";
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
}

// Handle Log In (with username instead of email)
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
      // 🔍 Find the email associated with this username
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("❌ No user found with that username!");
        return;
      }

      // ✅ Extract the user's email
      const userDoc = querySnapshot.docs[0];
      const email = userDoc.data().email;

      // ✅ Log in with email + password
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Logged in successfully!");
      window.location.href = "index.html";
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
}


// Handle Auth Changes
onAuthStateChanged(auth, async (user) => {
  const authButtons = document.getElementById("authButtons");
  const friendsButton = document.getElementById("friendsButton");

  if (user) {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    const username = docSnap.exists() ? docSnap.data().username : "User";

    authButtons.innerHTML = `
      <span>👋 ${username}</span>
      <button id="logoutBtn" class="green-btn">Log Out</button>
    `;

    if (friendsButton) {
      friendsButton.style.display = "block";
    }

    document.getElementById("logoutBtn").addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "index.html";
    });
  } else {
    authButtons.innerHTML = `
      <button onclick="window.location.href='login.html'" class="green-btn">Log In</button>
      <button onclick="window.location.href='signup.html'" class="green-btn">Sign Up</button>
    `;
    if (friendsButton) {
      friendsButton.style.display = "none";
    }
  }
});
