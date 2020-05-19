import React from 'react';
import { useLocalStorage, useMethods } from 'react-use';
import firebase from 'firebase/app';
import { useFirestore } from 'storage/firebase';
import { actions as userActions } from 'user/userState';
import { createUserGroup } from 'user/userUtils';
import { globalStateContext } from 'app/GlobalStateContext';

export const authContext = React.createContext();
const { Provider } = authContext;

export const AuthProvider = ({ initialUser, children }) => {
  const [storageUser, setStorageUser] = useLocalStorage('user', initialUser);
  const initialUserState = React.useRef({ user: storageUser });
  const [state, actions] = useMethods(userActions, initialUserState.current);
  const [oAuthUser, setOAuthUser] = React.useState();
  const { drawerState } = React.useContext(globalStateContext);
  const [, openDrawer] = drawerState;
  const db = useFirestore();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((loggedUser) => {
      setOAuthUser(loggedUser || null);
    });
  }, []);

  React.useEffect(() => {
    if (state.user === undefined) return;
    setStorageUser(state.user);
  }, [state.user, setStorageUser]);

  React.useEffect(() => {
    if (oAuthUser === null) {
      // null = Logged out
      actions.setUser(null);
    }
    if (!oAuthUser) {
      return;
    }
    if (oAuthUser.uid === state.user?.id) return;

    const onOAuthChange = async () => {
      let storedUser;
      try {
        const doc = await db.collection('users').doc(oAuthUser.uid).get();
        if (doc.exists) {
          storedUser = doc.data();
        } else {
          storedUser = {
            email: oAuthUser.email,
            groupId: `group-${oAuthUser.uid}`,
            originalGroupId: `group-${oAuthUser.uid}`,
          };
          await Promise.all([
            db.collection('users').doc(oAuthUser.uid).set(storedUser),
            createUserGroup(db, storedUser),
          ]);
        }
      } catch (e) {
        console.log('🛎 ', 'Error quering user');
        console.error(e);
        return;
      }
      const user = {
        ...storedUser,
        id: oAuthUser.uid,
        displayName: oAuthUser.displayName,
        email: oAuthUser.email,
        photoURL: oAuthUser.photoURL,
      };
      actions.setUser(user);
      openDrawer(false)();
    };
    onOAuthChange();
  }, [oAuthUser, actions, openDrawer, state.user, db]);

  return <Provider value={[state, actions]}>{children}</Provider>;
};
