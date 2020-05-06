import React from 'react';
import { db, useColData, useDocData } from 'storage/firebase';
import { useMap } from 'react-use';
import { globalStateContext } from 'app/GlobalStateContext';
import { LISTS } from 'product/ingredientUtils';

export const firestoreContext = React.createContext();

export const FirestoreProvider = ({ children }) => {
  const { Provider } = firestoreContext;
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
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
