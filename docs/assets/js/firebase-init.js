// /assets/js/firebase-init.js
const firebaseConfig = {
  apiKey: "AIzaSyA3jZHrm_gl9XhguUKVf13ZH8rIqQyH7UE",
  authDomain: "foretoken-4e948.firebaseapp.com",
  projectId: "foretoken-4e948",
  storageBucket: "foretoken-4e948.firebasestorage.app",
  messagingSenderId: "882428990857",
  appId: "1:882428990857:web:196baea9aeeffb83113d58",
  measurementId: "G-R5YNMH0KTX"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
