import React from 'react';
import { firestoreContext } from 'storage/FirestoreContext';

export const useProducts = () => {
  const { products } = React.useContext(firestoreContext);
  return products;
};
