// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2d1pqArjZ98D9upA1bHtiZxIssC8d9ug",
  authDomain: "web-development-37e40.firebaseapp.com",
  projectId: "web-development-37e40",
  storageBucket: "web-development-37e40.appspot.com",
  messagingSenderId: "151991017361",
  appId: "1:151991017361:web:595791d80dae3490988430",
  measurementId: "G-GTQ89Z3SHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };





  