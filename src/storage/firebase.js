import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfTjSCoH4xl6UFa31Eyj8h-Tf2ZxwPbmU",
  authDomain: "que-comemos-hoy-5febf.firebaseapp.com",
  databaseURL: "https://que-comemos-hoy-5febf.firebaseio.com",
  projectId: "que-comemos-hoy-5febf",
  storageBucket: "que-comemos-hoy-5febf.appspot.com",
  messagingSenderId: "545019553365",
  appId: "1:545019553365:web:333935cb9e69e47e4196dc",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
