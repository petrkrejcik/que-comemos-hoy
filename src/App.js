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

function App() {
  return (
    <GlobalStateProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Switch>
          <PrivateRoute exact path="/">
            <Products />
          </PrivateRoute>
          <PrivateRoute path="/recipes">
            <Recipes />
          </PrivateRoute>
          <PrivateRoute path="/add-member">
            <AddMember />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Navigation />
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
