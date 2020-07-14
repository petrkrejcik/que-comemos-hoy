import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Products } from 'product/Products';
import { Recipes } from 'recipe/Recipes';
import { Shops } from 'shop/Shops';
import { Members } from 'member/Members';
import { Loading } from 'app/Loading';
import { authContext } from 'user/AuthProvider';

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
    <Switch>
      <Route path="/products">
        <Switch>
          <Route path="/products/:section/:productId?/:variant?/:variantId?">
            <Products />
          </Route>
          <Redirect to="/products/shopping-list" />
        </Switch>
      </Route>
      <Route path="/recipes">
        <Switch>
          <Route path="/recipes/:recipeId?">
            <Recipes />
          </Route>
          <Redirect to="/recipes" />
        </Switch>
      </Route>
      <Route path="/members/:memberId?">
        <Members />
      </Route>
      <Route path="/shops/:shopId?">
        <Shops />
      </Route>
      <Redirect to="/products/shopping-list" />
    </Switch>
  );
};
