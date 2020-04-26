import React, { useState, useEffect } from 'react';
import { useAsync } from 'react-use';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Switch, Route, useLocation, useParams } from 'react-router-dom';
import {
  Button,
  Checkbox,
  TextField,
  List,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { db, firebase, useColData } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';
// import { getRecipeById } from './recipeUtils';

export const Recipe = (props) => {
  const { recipeId } = useParams();
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [ingredientSearch, setIngredientSearch] = React.useState('');

  const [recipe, loading, error] = useDocumentData(
    db.doc(`userGroups/${user.groupId}/recipes/${recipeId}`),
    { idField: 'id' }
  );

  const [ingredients, ingredientsLoading, ingredientsError] = useColData(
    db.collection(`userGroups/${user.groupId}/ingredients`),
    { idField: 'id' }
  );

  const addIngredient = async (ingredient) => {
    if (!ingredient) return;
    const exists = recipeIngredients.find((ing) => ing.id === ingredient.id);
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

  if (loading || ingredientsLoading) {
    return 'loading';
  }

  if (error) {
    console.log('🛎 ', 'error', error);
    return null;
  }
  const recipeIngredients = Object.keys(recipe.ingredients).reduce((acc, key) => {
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
        {recipeIngredients.map((ingredient) => (
          <div key={ingredient.id}>
            {ingredient.title} {ingredient.available ? '✅' : '❌'}
          </div>
        ))}
      </List>
      <Autocomplete
        options={ingredients.filter((ing) => !recipeIngredients.find((i) => i.id === ing.id))}
        getOptionLabel={(option) => option.title}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Search" />}
        onChange={(event, value) => {
          addIngredient(value);
        }}
      />
      <Button
        onClick={addIngredient}
        color="primary"
        variant="outlined"
        disabled={ingredientSearch.trim() === ''}
      >
        Add
      </Button>
    </>
  );
};
