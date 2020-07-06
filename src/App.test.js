import React from 'react';
import { wait, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { renderWithProvides } from 'test/testUtils';
import { init } from 'storage/firebaseInit/firebaseInitTest';
import { Products } from 'product/Products';
import { browser } from 'test/testUtils';

const mockUser = { uid: 'foo', email: 'foo@bar.com' };
const { db } = init(mockUser);

beforeAll(async () => {
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
});

test('renders products', async () => {
  const { findByText, container, getByTestId, getByText } = renderWithProvides(<Products />, {
    db,
    user: mockUser,
  });
  await waitForElementToBeRemoved(() => getByTestId('loading'));
  // const b = await findByText(/add product/i);
  // expect(b).toBeInTheDocument();
  await waitFor(() => {
    expect(getByText(/add product/i)).toBeInTheDocument();
    console.log('🛎 ', 'je tam');
    // expect(b).toBeInTheDocument();
  });
  console.log('🛎 ', 'potom');
  getByText(/add product/i);
  await browser(ReactDOM.findDOMNode(container).innerHTML);
  // await browser(container.innerHTML);
  await waitFor(() => {});
});
