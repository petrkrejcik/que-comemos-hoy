import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';

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
        return docData;
      })
    );
  }, [value, options.idField]);

  return [data, loading, error];
};

export const useDocData = (query, options) => {
  return useDocumentData(query, options);
};
