import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// create appy boy
export const app = firebase.initializeApp({
  apiKey: "AIzaSyA_feq5UoB_T8YQ3VLeBhiE-oYBxG683Ek",
  authDomain: "leafmark-771fa.firebaseapp.com",
  databaseURL: "https://leafmark-771fa.firebaseio.com",
  projectId: "leafmark-771fa",
  storageBucket: "leafmark-771fa.appspot.com",
  messagingSenderId: "477064176912",
  appId: "1:477064176912:web:ec9f506bb98b0da4913195",
  measurementId: "G-042V55HSE2"
});

// hire doorman
export const firebaseAppAuth = app.auth();
export const providers = {
  twitterProvider: new firebase.auth.TwitterAuthProvider()
};

// create mr data man
app.firestore().settings({});
