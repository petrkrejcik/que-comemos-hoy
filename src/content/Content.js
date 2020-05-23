import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { Products } from 'product/Products';
import { Recipes } from 'recipe/Recipes';
import { Header } from 'header/Header';
import { Navigation } from 'bottomNavigation/BottomNavigation';
import { Shops } from 'shop/Shops';
import { Members } from 'member/Members';
import { Loading } from 'app/Loading';
import { authContext } from 'user/AuthProvider';
import { ProductProvider } from 'product/ProductProvider';

export const Content = () => {
  const [{ user }] = React.useContext(authContext);

  if (user === null) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
  if (!user) {
    // Waiting for auth to verify this user if it is logged.
    return <Loading />;
  }

  return (
    <>
      <Header />
      <Box mt={2} style={{ height: 'calc(100% - (56px + 56px + 16px + 3px))' }}>
        <Switch>
          <Route path="/products">
            <Switch>
              <Route path="/products/:section/:productId?">
                <ProductProvider>
                  <Products />
                </ProductProvider>
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
    </>
  );
};
