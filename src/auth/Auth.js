import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { useHistory } from 'react-router-dom';
import { db, firebase } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';

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
    firebase.auth().onAuthStateChanged(async (loggedUser) => {
      if (!loggedUser) {
        setUser(null);
        return;
      }
      if (loggedUser.uid === user?.id) return;
      const query = await db.collection('users').doc(loggedUser.uid).get();
      let storedUser;
      if (query.exists) {
        storedUser = query.data();
      } else {
        storedUser = {
          groupId: `group-${loggedUser.uid}`,
          originalGroupId: `group-${loggedUser.uid}`,
        };
        await db.collection('users').doc(loggedUser.uid).set(storedUser);
      }
      setUser({
        ...storedUser,
        id: loggedUser.uid,
        displayName: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
      });
      openDrawer(false)();
      history.push('/');
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
