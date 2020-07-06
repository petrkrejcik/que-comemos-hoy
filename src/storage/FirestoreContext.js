import React from 'react';

export const firestoreContext = React.createContext();
const { Provider } = firestoreContext;

export const FirestoreProvider = ({ db, children }) => {
  return <Provider value={db}>{children}</Provider>;
};
