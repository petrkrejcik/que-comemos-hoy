import React from 'react';
import { db, useColData, useDocData } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';

export const firestoreContext = React.createContext();

export const FirestoreProvider = ({ children }) => {
  const { Provider } = firestoreContext;
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;

  const products = useColData(
    db.collection(`userGroups/${user.groupId}/ingredients`).orderBy('insertDate'),
    {
      idField: 'id',
    }
  );

  const userData = useDocData(db.doc(`userGroups/${user.groupId}`), {
    idField: 'id',
  });

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
