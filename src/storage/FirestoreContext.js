import React from 'react';
import { init } from 'storage/firebaseInit';

export const firestoreContext = React.createContext();
const { Provider } = firestoreContext;

export const FirestoreProvider = ({ children }) => {
  const { db } = init(); // Initialize Firebase
  return <Provider value={db}>{children}</Provider>;
};
