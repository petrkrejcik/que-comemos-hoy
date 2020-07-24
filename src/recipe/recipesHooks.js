import React from 'react';
import { recipesContext } from 'recipe/RecipesProvider';

export const useRecipes = () => {
  const { recipes } = React.useContext(recipesContext);

  return recipes;
};
