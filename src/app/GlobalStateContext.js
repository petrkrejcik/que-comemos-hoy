import React from 'react';
import { useMethods } from 'react-use';
import { initialState, actions } from 'app/globalState';

export const globalStateContext = React.createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalState, globalActions] = useMethods(actions, initialState);
  const [drawerOpened, openDrawer] = React.useState(false);
  const snackbar = React.useState(null);
  const { Provider } = globalStateContext;

  const openDrawerMemo = React.useCallback(
    (open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      openDrawer(open);
    },
    [openDrawer]
  );

  const drawerState = [drawerOpened, openDrawerMemo];

  return (
    <Provider
      value={{
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
