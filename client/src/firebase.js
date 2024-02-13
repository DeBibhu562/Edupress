// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "first-blog-149f5.firebaseapp.com",
  projectId: "first-blog-149f5",
  storageBucket: "first-blog-149f5.appspot.com",
  messagingSenderId: "340497161194",
  appId: "1:340497161194:web:eb21aa6343d45ff86cb093",
  measurementId: "G-R4P8833L8K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);