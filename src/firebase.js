import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({});

export default firebaseApp;
