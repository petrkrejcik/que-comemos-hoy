import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import { makeStyles } from '@material-ui/core/styles';
import { globalStateContext } from 'app/GlobalStateContext';
import { useFirestore } from 'storage/firebase';
import { useUser, useUserData, shops2Array } from 'user/userUtils';
import { Loading } from 'app/Loading';
import { useHeader } from 'header/headerUtils';
import { addShop, updateShop, removeShop } from 'shop/shopUtils';
import { useProducts } from 'product/productUtils';
import { useRecipes, useSave } from 'recipe/recipesHooks';

export const AddEditIngredient = (props) => {
  const history = useHistory();
  const [products, productsLoading] = useProducts();
  const { recipeId } = useParams();
  const [userData] = useUserData();
  const [recipes, recipesLoading] = useRecipes();
  const setHeader = useHeader(props.active);
  const { globalActions } = React.useContext(globalStateContext);
  const recipe = (recipes && recipes[recipeId]) || {
    title: '',
    description: '',
    ingredients: '',
  };
  const { control, handleSubmit, getValues, setValue, reset } = useForm({ defaultValues: recipe });
  const { refetch: save, isLoading: isSaving } = useSave({ ...getValues(), recipeId }, recipe);

  useEffect(() => {
    if (!recipe.title) return;
    Object.keys(recipe).map((key) => {
      setValue(key, recipe[key]);
    });
  }, [recipe.title, setValue]);

  useEffect(() => {
    setHeader({
      left: {
        icon: 'close',
        action: history.goBack,
      },
      right: [
        {
          title: 'Save',
          action: handleSubmit(save),
        },
      ],
      // menu: [{ title: 'Remove', action: handleRemove }],
    });
    if (!props.active) {
      reset();
    }
  }, [save, history, setHeader, props.active]);

  if (recipesLoading || productsLoading) {
    return 'loading';
  }

  const ingredients = Object.keys(recipe.ingredients).reduce((acc, key) => {
    return [...acc, { ...recipe.ingredients[key], id: key }];
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Controller
          as={
            <TextField
              label="Title"
              onFocus={() => globalActions.focusInput(true)}
              onBlur={() => globalActions.focusInput(false)}
              fullWidth
            />
          }
          name="title"
          control={control}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          as={
            <TextField
              label="Description"
              onFocus={() => globalActions.focusInput(true)}
              onBlur={() => globalActions.focusInput(false)}
              fullWidth
            />
          }
          name="description"
          control={control}
        />
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          options={products.filter((product) => !ingredients.find((i) => i.id === product.id))}
          getOptionLabel={(option) => option.title}
          freeSolo
          renderInput={(params) => <TextField {...params} label="Add Ingredient" />}
          onChange={(event, value) => {
            console.log('🛎 ', 'change', value);
          }}
        />
      </Grid>
    </Grid>
  );
};
