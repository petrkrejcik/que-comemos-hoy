import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Products } from './product/Products';
import { Recipes } from './recipe/Recipes';
import './App.css';
import { Header } from './header/Header';
import { Navigation } from './bottomNavigation/BottomNavigation';
import { GlobalStateProvider } from 'app/GlobalStateContext';
import { PrivateRoute } from 'app/PrivateRoute';
import { Login } from 'login/Login';
import { AddMember } from 'addMember/AddMember';
import { Snackbar } from 'snackbar/Snackbar';

function App() {
  return (
    <GlobalStateProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <>
            <Header />
            <Switch>
              <PrivateRoute path="/products/:productId?">
                <Products />
              </PrivateRoute>
              <PrivateRoute path="/recipes">
                <Recipes />
              </PrivateRoute>
              <PrivateRoute path="/add-member">
                <AddMember />
              </PrivateRoute>
              <Redirect to="/products" />
            </Switch>
            <Navigation />
          </>
        </Switch>
      </Router>
      <Snackbar />
    </GlobalStateProvider>
  );
}

export default App;
