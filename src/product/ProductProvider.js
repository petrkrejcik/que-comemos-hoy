import React from 'react';
import { useFirestore, useColData } from 'storage/firebase';
import { useMap } from 'react-use';
import { useUser } from 'user/userUtils';

export const productContext = React.createContext();

export const ProductProvider = ({ children }) => {
  const { Provider } = productContext;
  const user = useUser();
  const db = useFirestore();
  const [productOptions] = useMap({
    idField: 'id',
  });

  const products = useColData(
    db.collection(`userGroups/${user.groupId}/ingredients`).orderBy('insertDate'),
    productOptions
  );

  return (
    <Provider
      value={{
        products,
      }}
    >
      {children}
    </Provider>
  );
};
