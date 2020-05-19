import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { config } from 'config';

const env = process.env.REACT_APP_ENV || 'production';
// Initialize Firebase
firebase.initializeApp(config.firebase[env]);
// firebase.firestore.setLogLevel('debug');
const db = firebase.firestore();

db.enablePersistence().catch(function (err) {
  if (err.code === 'failed-precondition') {
    console.log("More tabs opened. Offline support won't work.");
  } else if (err.code === 'unimplemented') {
    console.log('Offline mode not supported.');
  }
});

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
