import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD1oaDXPMBJzQr3A02hySOVmO6FTQd1S4w",
  authDomain: "insta-mock-react.firebaseapp.com",
  databaseURL: "https://insta-mock-react.firebaseio.com",
  projectId: "insta-mock-react",
  storageBucket: "insta-mock-react.appspot.com",
  messagingSenderId: "26527387794",
  appId: "1:26527387794:web:de7a0368ca1935e25d964b",
  measurementId: "G-SEWVSXPJ61",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
