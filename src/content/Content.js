import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { Products } from 'product/Products';
import { Recipes } from 'recipe/Recipes';
import { Header } from 'header/Header';
import { Navigation } from 'bottomNavigation/BottomNavigation';
import { Shops } from 'shop/Shops';
import { Members } from 'member/Members';
import { globalStateContext } from 'app/GlobalStateContext';
import { FirestoreProvider } from 'storage/FirestoreContext';

export const Content = () => {
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
  return (
    <FirestoreProvider>
      <Header />
      <Box mt={2} style={{ height: 'calc(100% - (56px + 56px + 16px + 3px))' }}>
        <Switch>
          <Route path="/products">
            <Switch>
              <Route path="/products/:section/:productId?">
                <Products />
              </Route>
              <Redirect to="/products/shopping-list" />
            </Switch>
          </Route>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Route path="/members/:memberId?">
            <Members />
          </Route>
          <Route path="/shops/:shopId?">
            <Shops />
          </Route>
          <Redirect to="/products/shopping-list" />
        </Switch>
      </Box>
      <Navigation />
    </FirestoreProvider>
  );
};
