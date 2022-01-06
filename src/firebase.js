// import * as firebase from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf4EM3ocnka3_NPpWRcVz5VBNbdyOWKKY",
  authDomain: "playback-9d0fb.firebaseapp.com",
  projectId: "playback-9d0fb",
  storageBucket: "playback-9d0fb.appspot.com",
  messagingSenderId: "1017822107866",
  appId: "1:1017822107866:web:8aa28b61aed021c9ec6de3",
  measurementId: "G-PGRCJ01NKT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };