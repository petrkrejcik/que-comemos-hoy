// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
// import { init as mockInit } from 'storage/firebaseInit.mock';
// import * as mockFirebase from 'firebase/app';
import * as mockFirebase from '@firebase/testing';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

jest.mock('storage/firebaseInit', () => ({
  init: () => {
    const user = { uid: 'foo', email: 'foo@bar.com' };
    const db = mockFirebase
      .initializeTestApp({
        projectId: 'que-comemos-develop',
        auth: user,
      })
      .firestore();
    return {
      db,
      firebase: {
        ...mockFirebase,
        auth: () => ({
          onAuthStateChanged: (cb) => {
            setTimeout(() => {
              cb(user);
            }, 1);
          },
        }),
      },
    };
  },
}));
