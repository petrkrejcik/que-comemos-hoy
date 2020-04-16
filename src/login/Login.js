import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { db, firebase } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';

export const Login = () => {
  const { userState } = React.useContext(globalStateContext);
  const [user, setUser] = userState;
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
  if (user) {
    return null;
  }
  return <Button onClick={handleLogin}>Login</Button>;
};

const handleLogin = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await firebase.auth().signInWithPopup(provider);
  } catch (error) {}
};
