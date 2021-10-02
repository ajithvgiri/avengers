// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY14eif-G4qsyDpn3gHZ1cmmfQLRULmi8",
  authDomain: "fort-pedallers-palakkad.firebaseapp.com",
  projectId: "fort-pedallers-palakkad",
  storageBucket: "fort-pedallers-palakkad.appspot.com",
  messagingSenderId: "446577497143",
  appId: "1:446577497143:web:2c3f728c50a9c2f85a9bb2",
  measurementId: "G-C8MLH2Y877"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);