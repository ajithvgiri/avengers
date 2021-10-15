// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDY14eif-G4qsyDpn3gHZ1cmmfQLRULmi8",
  authDomain: "fort-pedallers-palakkad.firebaseapp.com",
  projectId: "fort-pedallers-palakkad",
  storageBucket: "fort-pedallers-palakkad.appspot.com",
  messagingSenderId: "446577497143",
  appId: "1:446577497143:web:2c3f728c50a9c2f85a9bb2",
  measurementId: "G-C8MLH2Y877",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
