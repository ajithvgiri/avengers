import axios from "axios";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, collection, doc, setDoc, writeBatch, query, where, getDocs, orderBy  } from "firebase/firestore";
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
const messaging = getMessaging();
getToken(messaging, { vapidKey: 'BJI4y5pNoa5_HomhTr2_XbWUBrDdu3b48Ao_pd9ENize7U1C4dNWbp3986nI-mn1zA7rRifgX-ZP6pzBfdexjfk' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log("notification toke "+currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
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
      `https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&code=${authTok}&response_type=code&grant_type=authorization_code&scope=read,write`
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
      `https://www.strava.com/api/v3/athlete/activities?after=1632960000`, // 1632960000 => 1st Oct 2021
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response;
  } catch (error) {
    console.log("something wrong " + error);
  }
};

export const createUser = async (userID, user) => {
  try {
	await setDoc(doc(db, "avengers-challenge/2021/users", ""+userID), user);
    console.log("User Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createActivities = async (activites) => {
  try {
    console.log("activities createActivities"+ activites);
    // Get a new write batch
    const batch = writeBatch(db);
    activites.data.map((activity:any) => {
      // Set the value for Activity
      const stravaActivity = doc(db, "avengers-challenge/2021/users/"+activity.athlete.id+"/activities",""+activity.id);
      batch.set(stravaActivity, activity);
    });
    // Commit the batch
    await batch.commit();
    console.log("User Activites created: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getUsersFromFirebase = async()=>{
  return getDocs(collection(db, "avengers-challenge/2021/users"));
}

export const getUserActivityWithID = async(userID)=>{
  return getDocs(collection(db, "avengers-challenge/2021/users/"+userID+"/activities"));
}

export const createLeaderboard = async (user,totalDistance,points,team) => {
  try {
	await setDoc(doc(db, "avengers-challenge/2021/leaderboard", ""+user.id), {
    id:user.id,
    username:user.username,
    firstname:user.firstname,
    lastname:user.lastname,
    profile:user.profile,
    profile_medium:user.profile,
    distance:totalDistance,
    points:points,
    team:team

  });
    console.log("Leaderboard Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getLeadboard = async()=>{
  const q = query(collection(db, "avengers-challenge/2021/leaderboard"), where("points", ">", 0),orderBy("points", "desc"));
  return getDocs(q);
};
