import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { GlobalStateProvider } from 'app/GlobalStateContext';
import { Login } from 'login/Login';
import { Snackbar } from 'snackbar/Snackbar';
import { Content } from 'content/Content';
import { ErrorBoundary } from 'app/ErrorBoundary';
import { UserProvider } from 'user/UserProvider';

function App() {
  return (
    <ErrorBoundary>
      <GlobalStateProvider>
        <UserProvider>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route>
                <Content />
              </Route>
            </Switch>
          </Router>
          <Snackbar />
        </UserProvider>
      </GlobalStateProvider>
    </ErrorBoundary>
  );
}

export default App;
