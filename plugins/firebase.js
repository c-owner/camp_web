// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWttqTxf6PyLnP3bsjdSCdRQDBHFe4Lcc",
  authDomain: "camp24-4364f.firebaseapp.com",
  projectId: "camp24-4364f",
  storageBucket: "camp24-4364f.appspot.com",
  messagingSenderId: "128327237570",
  appId: "1:128327237570:web:56a6a048a4e279fcbba05b",
  measurementId: "G-5M87MP84JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
