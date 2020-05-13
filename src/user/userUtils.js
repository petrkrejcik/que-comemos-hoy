import React from 'react';
import { db, firebase } from 'storage/firebase';
import { firestoreContext } from 'storage/FirestoreContext';
import { globalStateContext } from 'app/GlobalStateContext';
import { userContext } from 'user/UserProvider';

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

export const useLogout = () => {
  const { drawerState } = React.useContext(globalStateContext);
  const [, { setUser }] = React.useContext(userContext);
  const [, openDrawer] = drawerState;
  const logout = () => {
    openDrawer(false)();
    setUser(null);
    firebase.auth().signOut();
  };
  return logout;
};
