import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCN703Qk63UXQd615dv9RsYzdGCY6Q5y48",
  authDomain: "niletube-6e242.firebaseapp.com",
  projectId: "niletube-6e242",
  storageBucket: "niletube-6e242.appspot.com",
  messagingSenderId: "198384043700",
  appId: "1:198384043700:web:8e0d52cc8c2391b26e39e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
