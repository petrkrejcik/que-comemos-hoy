import React from 'react';
import { useMap } from 'react-use';
import { Loading } from 'app/Loading';
import { useFirestore, useColData } from 'storage/firebase';
import { useUser } from 'user/userUtils';

export const recipesContext = React.createContext();

export const RecipesProvider = ({ children }) => {
  const { Provider } = recipesContext;
  const user = useUser();
  const db = useFirestore();
  const [options] = useMap({
    idField: 'id',
  });

  const [recipes, loading] = useColData(
    db.collection(`userGroups/${user.groupId}/recipes`).orderBy('insertDate'),
    options
  );

  if (loading) return <Loading />;

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
