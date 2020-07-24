import React from 'react';
import { TextField } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
// import { makeStyles } from '@material-ui/core/styles';
import { Loading } from 'app/Loading';
import { ItemDetail } from 'itemDetail/itemDetail';
import { useProducts } from 'product/productUtils';
import { useRecipes, useSave } from 'recipe/recipesHooks';
import { upsert, remove } from 'recipe/recipeUtils';
import { useFirestore } from 'storage/firebase';
import { useUser, useUserData, shops2Array } from 'user/userUtils';

export const RecipeDetail = (props) => {
  const [products, productsLoading] = useProducts();
  const { recipeId } = useParams();
  const db = useFirestore();
  const user = useUser();
  const recipes = useRecipes();
  const recipe = recipes.find((r) => r.id === recipeId) || {
    title: '',
    description: '',
    ingredients: '',
  };

  if (productsLoading) {
    return <Loading />;
  }

  // const ingredients = Object.keys(recipe.ingredients).reduce((acc, key) => {
  //   return [...acc, { ...recipe.ingredients[key], id: key }];
  // }, []);

  return (
    <ItemDetail
      id={recipeId === 'new' ? null : recipeId}
      queryKey="recipes"
      handleSave={upsert(db, user)}
      handleRemove={remove(db, user)}
      active={props.active}
      defaultValues={recipe}
      renderFields={(control) => [
        <Controller as={TextField} name="title" control={control} label="Title" fullWidth />,
        <Controller as={TextField} name="description" control={control} label="Description" fullWidth />,
      ]}
    />
  );
};
