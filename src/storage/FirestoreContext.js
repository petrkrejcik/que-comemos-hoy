import React from 'react';
import { db, useColData, useDocData } from 'storage/firebase';
import { useMap } from 'react-use';
import { userContext } from 'user/UserProvider';

export const firestoreContext = React.createContext();

export const FirestoreProvider = ({ children }) => {
  const { Provider } = firestoreContext;
  const [{ user }] = React.useContext(userContext);
  const [productOptions] = useMap({
    idField: 'id',
  });
  const [userDataOptions] = useMap({
    idField: 'id',
    extend: (data) => ({
      shops: data.shops || {},
    }),
  });

  const products = useColData(
    db.collection(`userGroups/${user.groupId}/ingredients`).orderBy('insertDate'),
    productOptions
  );

  const userData = useDocData(db.doc(`userGroups/${user.groupId}`), userDataOptions);

  return (
    <Provider
      value={{
        products,
        userData,
      }}
    >
      {children}
    </Provider>
  );
};
