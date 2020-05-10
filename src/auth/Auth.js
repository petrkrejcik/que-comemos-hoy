import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { useHistory } from 'react-router-dom';
import { db, firebase } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';
import { createUserGroup } from 'user/userUtils';

export const useLogin = () => {
  const { userState, drawerState } = React.useContext(globalStateContext);
  const [user, setUser] = userState;
  const [, openDrawer] = drawerState;
  const history = useHistory();
  const login = useAsyncFn(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise(async (resolve, reject) => {
      try {
        await firebase.auth().signInWithPopup(provider);
        // Do not call resolve, because we want the loader to be displayed.
        // Loader will be hidden by onAuthStateChanged.
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  useEffect(() => {
    console.log('🛎 ', 'Auth useEffect');
    firebase.auth().onAuthStateChanged(async (loggedUser) => {
      if (!loggedUser) {
        setUser(null);
        return;
      }
      if (loggedUser.uid === user?.id) return;
      const doc = await db.collection('users').doc(loggedUser.uid).get();
      let storedUser;
      if (doc.exists) {
        storedUser = doc.data();
      } else {
        storedUser = {
          groupId: `group-${loggedUser.uid}`,
          originalGroupId: `group-${loggedUser.uid}`,
        };
        await Promise.all([
          db.collection('users').doc(loggedUser.uid).set(storedUser),
          createUserGroup(storedUser),
        ]);
      }
      setUser({
        ...storedUser,
        id: loggedUser.uid,
        displayName: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
      });
      openDrawer(false)();
      console.log('🛎 ', 'Auth useEffect fin');
      history.push('/products/shopping-list');
    });
  }, [setUser, history, openDrawer, user]);

  return login;
};

export const useLogout = () => {
  const { userState, drawerState } = React.useContext(globalStateContext);
  const [, openDrawer] = drawerState;
  const [, setUser] = userState;
  const logout = () => {
    openDrawer(false)();
    setUser(null);
    firebase.auth().signOut();
  };
  return logout;
};
