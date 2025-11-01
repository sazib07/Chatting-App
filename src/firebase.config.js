
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSr0iY328k0V8PKi9XvaFbyLTi1jn1zd4",
  authDomain: "chattingapp-9fd74.firebaseapp.com",
  projectId: "chattingapp-9fd74",
  storageBucket: "chattingapp-9fd74.firebasestorage.app",
  messagingSenderId: "20968723913",
  appId: "1:20968723913:web:1d1926250bc48033d58418",
  measurementId: "G-ZEF7NN8092"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


let auth=getAuth(app);
export {auth,app}