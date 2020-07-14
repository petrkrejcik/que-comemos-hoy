import React from 'react';
import { useQuery } from 'react-query';
import { useFirestore } from 'storage/firebase';
import { useUser } from 'user/userUtils';
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'snackbar/Snackbar';
import slugify from 'slugify';
import { MenuItem } from '@material-ui/core';
import { recipesContext } from 'recipe/RecipesProvider';

export const useRecipes = () => {
  const f = React.useContext(recipesContext);
  const { recipes } = React.useContext(recipesContext);

  return recipes;
};

export const useSave = ({ recipeId, title, description, ingredients }, oldRecipe) => {
  const db = useFirestore();
  const user = useUser();
  const { productId } = useParams();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const shops = oldRecipe.shops || {};

  return useQuery(
    ['saveRecipe', { productId }],
    async (key, { productId }) => {
      recipeId = recipeId || slugify(title, { lower: true });
      // await db.doc(`userGroups/${user.groupId}/ingredients/${productId}`).update({
      //   [`variants.${recipeId}`]: {
      //     title,
      //     rating: rating ? parseFloat(rating) : null,
      //     ...(shop && { shops: { ...shops, [shop]: { price } } }),
      //   },
      // });
    },
    {
      enabled: false,
      onSuccess: () => {
        history.goBack();
        showSnackbar({ message: 'Saved' });
      },
    }
  );
};
