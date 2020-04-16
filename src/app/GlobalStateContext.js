import React from 'react';

export const globalStateContext = React.createContext();

export const GlobalStateProvider = ({ children, initialState }) => {
  const userState = React.useState();
  const { Provider } = globalStateContext;

  return <Provider value={{ userState }}>{children}</Provider>;
};
