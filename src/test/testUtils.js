import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStateProvider } from 'app/GlobalStateContext';
import { AuthProvider } from 'user/AuthProvider';
import { FirestoreProvider } from 'storage/FirestoreContext';
const fs = require('fs');

export const renderWithProvides = (component, { db, user }) => {
  return {
    ...render(
      <GlobalStateProvider>
        <FirestoreProvider db={db}>
          <AuthProvider initialUser={user}>
            <Router basename={process.env.PUBLIC_URL}>{component}</Router>
          </AuthProvider>
        </FirestoreProvider>
      </GlobalStateProvider>
    ),
  };
};

export const browser = (html) => {
  return new Promise((resolve) => {
    fs.writeFile('/Users/pkrejcik/tmp/test.html', html, function (err) {
      if (err) return console.log(err);
      resolve();
    });
  });
};
