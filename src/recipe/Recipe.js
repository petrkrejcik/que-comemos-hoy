import React from 'react';
import { Button, TextField, List } from '@material-ui/core';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

import { useProducts } from 'product/productUtils';
import { useRecipes } from 'recipe/recipesHooks';
import { useFirestore, useColData } from 'storage/firebase';
import { useUser } from 'user/userUtils';

export const RecipeDeprecated = (props) => {
  const { recipeId } = useParams();
  const user = useUser();
  const db = useFirestore();
  const recipes = useRecipes();
  const [products, productsLoading] = useProducts();
  const [ingredientSearch] = React.useState('');
  // const recipe = (recipes && recipes[recipeId]) || {
  //   title: '',
  //   description: '',
  //   ingredients: '',
  // };
  // const { control, handleSubmit, getValues, setValue, reset } = useForm({ defaultValues: recipe });

  const addIngredient = async (ingredient) => {
    if (!ingredient) return;
    const exists = ingredients.find((ing) => ing.id === ingredient.id);
    if (exists) return;

    // TODO: batch
    db.collection(`recipes`)
      .doc(recipe.id)
      .update({
        [`ingredients.${ingredient.id}`]: {
          id: ingredient.id,
          available: ingredient.available,
          title: ingredient.title,
        },
      });
    db.collection(`products`)
      .doc(ingredient.id)
      .update({
        [`recipes.${recipe.id}`]: true,
      });
  };

  if (productsLoading) {
    return 'loading';
  }

  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    return 'Recipe not found';
  }

  const ingredients = Object.keys(recipe.ingredients || {}).reduce((acc, key) => {
    return [...acc, { ...recipe.ingredients[key], id: key }];
  }, []);

  return (
    <>
      <div>{recipe.title}</div>
      <div>{recipe.description}</div>
      Ingredients
      {/* <IconButton>
        <Add />
      </IconButton> */}
      <List>
        {ingredients.map((ingredient) => (
          <div key={ingredient.id}>
            {ingredient.title} {ingredient.available ? '✅' : '❌'}
          </div>
        ))}
      </List>
    </>
  );
};
