import React from 'react';
import { db } from 'storage/firebase';
import { firestoreContext } from 'storage/FirestoreContext';

export const useUserData = () => {
  const { userData } = React.useContext(firestoreContext);
  return userData;
};

export const shops2Array = (shops) => {
  if (!shops) return [];
  return Object.keys(shops).reduce((acc, id) => [...acc, { id, ...shops[id] }], []);
};

export const createUserGroup = (user) => {
  return db.collection('userGroups').doc(user.groupId).set({
    shops: {},
  });
};
