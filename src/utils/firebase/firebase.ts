// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2TzHeF1MR7WLs0PpGIsNeIL0ujDTkFbI",
  authDomain: "cursus-e431a.firebaseapp.com",
  projectId: "cursus-e431a",
  storageBucket: "cursus-e431a.appspot.com",
  messagingSenderId: "656267021510",
  appId: "1:656267021510:web:979349a51a3e9d5cd1dbc7",
  measurementId: "G-G8D5NBKFG1"
};
export const firebaseApp = initializeApp(firebaseConfig); // Khởi tạo app
export const storage = getStorage(firebaseApp); // Lấy Firebase Storage instance