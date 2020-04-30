import React from 'react';
import { firestoreContext } from 'storage/FirestoreContext';

export const useUserData = () => {
  const { userData } = React.useContext(firestoreContext);
  return userData;
};

export const shops2Array = (shops) => {
  if (!shops) return [];
  return Object.keys(shops).reduce((acc, id) => [...acc, { id, ...shops[id] }], []);
};
