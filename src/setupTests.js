// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { browser } from 'test/testUtils';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

console.warn = jest.fn();

beforeEach(() => browser('running'));

jest.mock('firebase/app', () => ({
  auth: () => ({
    onAuthStateChanged: (cb) => {
      setTimeout(() => {
        cb({ uid: 'foo', email: 'foo@bar.com' });
        // cb(mockUser);
      }, 1);
    },
  }),
}));
