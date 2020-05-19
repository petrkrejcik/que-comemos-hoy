import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { GlobalStateProvider } from 'app/GlobalStateContext';
import { Login } from 'login/Login';
import { Snackbar } from 'snackbar/Snackbar';
import { Content } from 'content/Content';
import { ErrorBoundary } from 'app/ErrorBoundary';
import { AuthProvider } from 'user/AuthProvider';
import { FirestoreProvider } from 'storage/FirestoreContext';
import { init } from 'storage/firebaseInit/firebaseInit';

function App() {
  const { db } = init(); // Initialize Firebase
  return (
    <ErrorBoundary>
      <GlobalStateProvider>
        <FirestoreProvider db={db}>
          <AuthProvider>
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
          </AuthProvider>
        </FirestoreProvider>
      </GlobalStateProvider>
    </ErrorBoundary>
  );
}

export default App;
