import React from 'react';
import { useFirestore, useColData } from 'storage/firebase';
import { useMap } from 'react-use';
import { useUser } from 'user/userUtils';

export const recipesContext = React.createContext();

export const RecipesProvider = ({ children }) => {
  const { Provider } = recipesContext;
  const user = useUser();
  const db = useFirestore();
  const [productOptions] = useMap({
    idField: 'id',
  });

  const recipes = useColData(
    db.collection(`userGroups/${user.groupId}/recipes`).orderBy('insertDate'),
    productOptions
  );

  return (
    <Provider
      value={{
        recipes,
      }}
    >
      {children}
    </Provider>
  );
};
