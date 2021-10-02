import axios from "axios";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
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
  measurementId: "G-C8MLH2Y877",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

export const getParamValues = (url) => {
  return url
    .slice(1)
    .split("&")
    .reduce((prev, curr) => {
      const [title, value] = curr.split("=");
      prev[title] = value;
      return prev;
    }, {});
};

export const cleanUpAuthToken = (str) => {
  return str.split("&")[1].slice(5);
};

export const testAuthGetter = async (authTok) => {
  try {
    const response = await axios.post(
      `https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&code=${authTok}&grant_type=authorization_code&scope=read,write`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (userID, accessToken) => {
  try {
    const response = await axios.get(
      `https://www.strava.com/api/v3/athletes/${userID}/stats`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUserActivity = async (userID, accessToken) => {
  try {
    const response = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response;
  } catch (error) {
    console.log("something wrong " + error);
  }
};

export const createUser = async (userID, user) => {
  try {
	// Add a new document with a generated id
	//const newUser = doc(collection(db, userID));
	//const docRef = await setDoc(newUser, user);
	
	await setDoc(doc(db, "avengers-challenge/2021/users", ""+userID), user);
    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
