import React from 'react';
import { useLocalStorage, useMethods } from 'react-use';
import { db, firebase } from 'storage/firebase';
import { actions as userActions } from 'user/userState';
import { createUserGroup } from 'user/userUtils';
import { globalStateContext } from 'app/GlobalStateContext';

export const userContext = React.createContext();
const { Provider } = userContext;

export const UserProvider = ({ children }) => {
  console.log('🛎 ', 'UserProvider');
  const [storageUser, setStorageUser] = useLocalStorage('user');
  const initialUserState = React.useRef({ user: storageUser });
  const [state, actions] = useMethods(userActions, initialUserState.current);
  const [oAuthUser, setOAuthUser] = React.useState();
  const { drawerState } = React.useContext(globalStateContext);
  const [, openDrawer] = drawerState;

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((loggedUser) => {
      console.log('🛎 ', 'ef 1 cb', loggedUser);
      setOAuthUser(loggedUser || null);
    });
  }, []);

  React.useEffect(() => {
    if (state.user === undefined) return;
    setStorageUser(state.user);
  }, [state.user, setStorageUser]);

  React.useEffect(() => {
    if (oAuthUser === null) {
      console.log('🛎 ', 'ef 3');
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
        console.log('🛎 ', 'ef 4 pred');
        const doc = await db.collection('users').doc(oAuthUser.uid).get();
        if (doc.exists) {
          storedUser = doc.data();
          console.log('🛎 ', 'user existuje');
        } else {
          storedUser = {
            email: oAuthUser.email,
            groupId: `group-${oAuthUser.uid}`,
            originalGroupId: `group-${oAuthUser.uid}`,
          };
          console.log('🛎 ', 'new user', storedUser);
          await Promise.all([
            db.collection('users').doc(oAuthUser.uid).set(storedUser),
            createUserGroup(storedUser),
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
  }, [oAuthUser, actions, openDrawer, state.user]);

  return <Provider value={[state, actions]}>{children}</Provider>;
};
