// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmPH6MpXTFVV3WQqqicWCFA95DzPxpYeM",
  authDomain: "email-password-auth-8b2fd.firebaseapp.com",
  projectId: "email-password-auth-8b2fd",
  storageBucket: "email-password-auth-8b2fd.appspot.com",
  messagingSenderId: "242686329182",
  appId: "1:242686329182:web:68e3a07c5c723af6164fcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;