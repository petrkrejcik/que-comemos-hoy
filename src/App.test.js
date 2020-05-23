import React from 'react';
import { render, wait } from '@testing-library/react';
import App from './App';
// import * as mockFirebase from '@firebase/testing';
// import { init } from 'storage/firebaseInit';
import { db, firebase } from 'storage/firebase';

// test('renders login button', async () => {
//   const { findByText } = render(<App />);
//   const loginBtn = await findByText(/Login via Google/i);
//   expect(loginBtn).toBeInTheDocument();
// });

beforeAll(async () => {
  console.log('🛎 ', 'before');
  await db
    .collection(`userGroups/group-foo/ingredients`)
    .doc('123')
    .set({
      insertDate: new Date(),
      availability: {},
      title: 'foo',
      lists: { shopping: true },
    });
  await db.collection(`users`).doc('foo').set({
    email: 'foo@bar.com',
    groupId: 'group-foo',
    originalGroupId: 'group-foo',
  });
  console.log('🛎 ', 'stored');
});

test('renders products', async () => {
  console.log('🛎 ', 'running test');
  // const { db } = init();
  // console.log('🛎 ', 'db initialized');
  // const ref = await db.collection('neco').add({ name: 'test item' });
  // console.log('🛎 ', 'done test query');
  const { findByText } = render(<App />);
  const addProductBtn = await findByText(/add product/i);
  await wait();
  // expect(addProductBtn).toBeInTheDocument();
});
