// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzpOUPFwDJG9KUJ9pFvLSGcX_jycVhfLc",
  authDomain: "meterhub-e4cb9.firebaseapp.com",
  projectId: "meterhub-e4cb9",
  storageBucket: "meterhub-e4cb9.appspot.com",
  messagingSenderId: "409238977389",
  appId: "1:409238977389:web:a5d2a66d336059a0c2b864",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const authentication = getAuth(app);
