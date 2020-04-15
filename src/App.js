import React, { useState, useRef } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { Products } from "./product/Products";
import { Homepage } from "./homepage/Homepage";
import "./App.css";
import { Header } from "./header/Header";
import { Navigation } from "./bottomNavigation/BottomNavigation";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Navigation />
    </Router>
  );
}

export default App;
