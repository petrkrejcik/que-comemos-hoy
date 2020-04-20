import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { globalStateContext } from 'app/GlobalStateContext';

export const PrivateRoute = ({ children, ...rest }) => {
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
