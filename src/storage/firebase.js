import React from 'react';
import 'firebase/firestore';
import 'firebase/auth';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { firestoreContext } from 'storage/FirestoreContext';

export const useFirestore = () => {
  const db = React.useContext(firestoreContext);
  return db;
};

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
