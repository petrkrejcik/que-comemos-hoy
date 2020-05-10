import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { GlobalStateProvider } from 'app/GlobalStateContext';
import { Login } from 'login/Login';
import { Snackbar } from 'snackbar/Snackbar';
import { Content } from 'content/Content';
import { ErrorBoundary } from 'app/ErrorBoundary';

function App() {
  console.log('🛎 ', 'App');
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
