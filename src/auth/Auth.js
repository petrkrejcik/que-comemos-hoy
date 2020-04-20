import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { useHistory } from 'react-router-dom';
import { db, firebase } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';

export const useLogin = () => {
  const { userState, drawerState } = React.useContext(globalStateContext);
  const [, setUser] = userState;
  const [, openDrawer] = drawerState;
  const history = useHistory();
  const login = useAsyncFn(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((loggedUser) => {
      if (!loggedUser) {
        setUser(null);
        return;
      }
      const convertedUser = {
        id: loggedUser.uid,
        displayName: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
      };
      setUser(convertedUser);
      db.collection('users').doc(convertedUser.id).set(convertedUser);
      openDrawer(false)();
      history.push('/');
    });
  }, [setUser, history, openDrawer]);

  return login;
};

export const useLogout = () => {
  const { drawerState } = React.useContext(globalStateContext);
  const [, openDrawer] = drawerState;
  const logout = () => {
    openDrawer(false)();
    firebase.auth().signOut();
  };
  return logout;
};
