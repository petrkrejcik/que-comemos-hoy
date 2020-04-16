import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { db, firebase } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';

export const useLogin = () => {
  const { userState } = React.useContext(globalStateContext);
  const [, setUser] = userState;
  const login = useAsyncFn(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((loggedUser) => {
      const convertedUser = loggedUser
        ? {
            id: loggedUser.uid,
            displayName: loggedUser.displayName,
            email: loggedUser.email,
            photoURL: loggedUser.photoURL,
          }
        : null;
      setUser(convertedUser);
      if (!convertedUser) return;
      db.collection('users').add(convertedUser);
    });
  }, [setUser]);

  return login;
};

export const useLogout = () => {
  const logout = () => {
    firebase.auth().signOut();
  };
  return logout;
};
