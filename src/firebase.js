import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBvLIOUj4calOS8oiC7wKc_8LFCY1W1aAc",
  authDomain: "fir-54b63.firebaseapp.com",
  projectId: "fir-54b63",
  storageBucket: "fir-54b63.appspot.com",
  messagingSenderId: "964615728841",
  appId: "1:964615728841:web:eb6de34833852e4abea718",
  measurementId: "G-5XZKH8VXN0",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
