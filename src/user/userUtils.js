import React from 'react';
import firebase from 'firebase/app';
import { useMap } from 'react-use';
import { useDocData, useFirestore } from 'storage/firebase';
import { authContext } from 'user/AuthProvider';
import { globalStateContext } from 'app/GlobalStateContext';

export const useUser = () => {
  const [{ user }] = React.useContext(authContext);
  if (!user) {
    throw new Error('Not logged');
  }
  return user;
};

export const useUserData = () => {
  const user = useUser();
  const db = useFirestore();
  const [userDataOptions] = useMap({
    idField: 'id',
    extend: (data) => ({
      shops: data.shops || {},
    }),
  });

  return useDocData(db.doc(`userGroups/${user.groupId}`), userDataOptions);
};

export const shops2Array = (shops) => {
  if (!shops) return [];
  return Object.keys(shops).reduce((acc, id) => [...acc, { id, ...shops[id] }], []);
};

export const createUserGroup = (db, user) => {
  return db.collection('userGroups').doc(user.groupId).set({
    shops: {},
  });
};

export const useLogout = () => {
  const { drawerState } = React.useContext(globalStateContext);
  const [, { setUser }] = React.useContext(authContext);
  const [, openDrawer] = drawerState;
  const logout = () => {
    openDrawer(false)();
    setUser(null);
    firebase.auth().signOut();
  };
  return logout;
};
