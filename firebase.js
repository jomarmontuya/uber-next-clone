import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuXbCzVLVU98nSjg0fLiFgWnvOU7mEIQM",
  authDomain: "uber-next-clone-e6968.firebaseapp.com",
  projectId: "uber-next-clone-e6968",
  storageBucket: "uber-next-clone-e6968.appspot.com",
  messagingSenderId: "623941017846",
  appId: "1:623941017846:web:3bd915875fdcb0adee0cd7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, auth, provider };
