import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBfTjSCoH4xl6UFa31Eyj8h-Tf2ZxwPbmU',
  authDomain: 'que-comemos-hoy-5febf.firebaseapp.com',
  databaseURL: 'https://que-comemos-hoy-5febf.firebaseio.com',
  projectId: 'que-comemos-hoy-5febf',
  storageBucket: 'que-comemos-hoy-5febf.appspot.com',
  messagingSenderId: '545019553365',
  appId: '1:545019553365:web:333935cb9e69e47e4196dc',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export { db, firebase };

export const useColData = (query, options) => {
  const [data, setData] = React.useState([]);
  const [value, loading, error] = useCollection(query, options);

  React.useEffect(() => {
    if (!value) return;
    setData(
      value.docs.map((doc) => {
        const docData = { ...doc.data() };
        if (options.idField) {
          docData[options.idField] = doc.id;
        }
        if (options.extend) {
          Object.assign(docData, options.extend(docData));
        }
        return docData;
      })
    );
  }, [value, options]);

  return [data, loading, error];
};

export const useDocData = (query, options) => {
  const [data, setData] = React.useState(null);
  const [value, , error] = useDocument(query, options);

  React.useEffect(() => {
    if (!value) return;
    const data = value.data();
    if (!data) return; // When opening the app from a link in a new tab. User is probably not authed yet.
    const docData = { ...data };
    if (options.idField) {
      docData[options.idField] = value.id;
    }
    if (options.extend) {
      Object.assign(docData, options.extend(docData));
    }
    setData(docData);
  }, [value, options]);

  const loading = !data && !error;

  return [data, loading, error];
};
