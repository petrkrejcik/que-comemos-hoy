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
    firebase.auth().onAuthStateChanged(async (loggedUser) => {
      if (!loggedUser) {
        setUser(null);
        return;
      }
      const query = await db.collection('users').doc(loggedUser.uid).get();
      let convertedUser;
      if (query.exists) {
        convertedUser = query.data();
      } else {
        convertedUser = {
          id: loggedUser.uid,
          displayName: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
          members: {},
        };
        // TODO: await
        db.collection('users').doc(convertedUser.id).set(convertedUser);
      }
      setUser(convertedUser);
      openDrawer(false)();
      history.push('/');
    });
  }, [setUser, history, openDrawer]);

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
