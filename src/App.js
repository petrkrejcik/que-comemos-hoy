import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { GlobalStateProvider } from 'app/GlobalStateContext';
import { Login } from 'login/Login';
import { Snackbar } from 'snackbar/Snackbar';
import { Content } from 'content/Content';

function App() {
  return (
    <GlobalStateProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Content />
        </Switch>
      </Router>
      <Snackbar />
    </GlobalStateProvider>
  );
}

export default App;
