import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { Switch, Route, useLocation } from 'react-router-dom';
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
import { db, firebase } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';
// import { getRecipeById } from './recipeUtils';

export const Recipe = (props) => {
  const location = useLocation();
  const [recipe, setRecipe] = React.useState(location.state?.recipe);
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [ingredientSearch, setIngredientSearch] = React.useState('');
  const [allIngredients, setAllIngredients] = React.useState([]);
  //   const ingredients = [{ title: 'Masa', id: 'avxdsdafea' }];

  //   const recipe = useAsync(async () => {
  //     return await getRecipeById(recipeId);
  //   }, [recipeId]);

  useAsync(async () => {
    const doc = await db.collection('recipes').doc(recipe.id);
    // if (!doc.exists) {
    //   console.log('🛎 ', 'neexistuje');
    //   throw new Error('Recipe not found');
    // }
    console.log('🛎 ', 'jedu');
    doc.onSnapshot((snapshot) => {
      console.log('🛎 ', 'snap');
      setRecipe({
        id: snapshot.id,
        ...snapshot.data(),
      });
    });
  }, []);

  useAsync(async () => {
    if (!user) return;
    const ingredients = await getAllIngredients(user);
    setAllIngredients(ingredients);
  }, [user]);

  const addIngredient = async (ingredient) => {
    if (!ingredient) return;
    console.log('🛎 ', 'add', ingredient, recipe.id);
    const exists = recipe.ingredients.find((ing) => ing.id === ingredient.id);
    if (exists) return;

    await db
      .collection(`recipes`)
      .doc(recipe.id)
      .update({
        ingredients: firebase.firestore.FieldValue.arrayUnion({
          id: ingredient.id,
          available: ingredient.available,
          title: ingredient.title,
        }),
      });
  };

  //   if (recipe.loading) {
  //     return 'loading...';
  //   }

  //   if (recipe.error) {
  //     return recipe.error;
  //   }

  return (
    <>
      <div>{recipe.title}</div>
      <div>{recipe.description}</div>
      Ingredients
      {/* <IconButton>
        <Add />
      </IconButton> */}
      <List>
        {recipe.ingredients.map((ingredient) => (
          <div key={ingredient.id}>{ingredient.title}</div>
        ))}
      </List>
      <Autocomplete
        options={allIngredients.filter((ing) => !recipe.ingredients.find((i) => i.id === ing.id))}
        getOptionLabel={(option) => option.title}
        // style={{ width: 300 }}
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

const getAllIngredients = async (user) => {
  const result = await db.collection('products').where('userId', '==', user.id).get();
  const ingredients = result.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return ingredients;
};
