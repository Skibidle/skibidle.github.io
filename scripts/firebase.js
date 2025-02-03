import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDug_-GY2Z_R8UHDVjnv_YaRWCYyIU11Ks",
    authDomain: "skibidle.firebaseapp.com",
    projectId: "skibidle",
    storageBucket: "skibidle.firebasestorage.app",
    messagingSenderId: "508731005631",
    appId: "1:508731005631:web:7d65c32e207a4c14f5c40a",
    measurementId: "G-NDGRHWHT54"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// GitHub Auth
export async function signInWithGitHub() {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await createUserProfile(result.user);
    return result.user;
  } catch (error) {
    console.error("Auth error:", error);
  }
}

// Create user profile
async function createUserProfile(user) {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    lastLogin: new Date()
  }, { merge: true });
}

// Realtime leaderboard
export function watchLeaderboard(gameId, callback) {
  return onSnapshot(doc(db, "leaderboards", gameId), (doc) => {
    callback(doc.data()?.scores || []);
  });
}
