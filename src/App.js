import React, { useState, useRef } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Products } from './product/Products';
import { Recipes } from './recipe/Recipes';
import './App.css';
import { Header } from './header/Header';
import { Navigation } from './bottomNavigation/BottomNavigation';
import { GlobalStateProvider } from 'app/GlobalStateContext';

function App() {
  return (
    <GlobalStateProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Navigation />
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
