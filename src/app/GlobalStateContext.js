import React from 'react';
import { useLocalStorage, useMethods } from 'react-use';
import { initialState, actions } from 'app/globalState';

export const globalStateContext = React.createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalState, globalActions] = useMethods(actions, initialState);
  const [storageUser, setStorageUser] = useLocalStorage('user');
  const [user, setUser] = React.useState(storageUser);
  const [drawerOpened, openDrawer] = React.useState(false);
  const snackbar = React.useState(null);
  const { Provider } = globalStateContext;

  const setUserMemo = React.useCallback(
    (user) => {
      setUser(user);
      setStorageUser(user);
    },
    [setStorageUser]
  );

  const openDrawerMemo = React.useCallback(
    (open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      openDrawer(open);
    },
    [openDrawer]
  );

  const userState = [user, setUserMemo];
  const drawerState = [drawerOpened, openDrawerMemo];

  return (
    <Provider
      value={{
        userState,
        drawerState,
        snackbar,
        globalState,
        globalActions,
      }}
    >
      {children}
    </Provider>
  );
};
