import React from 'react';
import { useLocalStorage } from 'react-use';

export const globalStateContext = React.createContext();

export const GlobalStateProvider = ({ children, initialState }) => {
  const [storageUser, setStorageUser] = useLocalStorage('user');
  const [user, setUser] = React.useState(storageUser);
  const [drawerOpened, openDrawer] = React.useState(false);
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

  return <Provider value={{ userState, drawerState }}>{children}</Provider>;
};
