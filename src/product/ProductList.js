import React from 'react';
import { Checkbox, Grid } from '@material-ui/core';
import { AddIngredient } from './AddIngredient';
import { useSnackbar } from 'snackbar/Snackbar';

export const ProductList = (props) => {
  const [editing, setEditing] = React.useState(null);
  const showSnackbar = useSnackbar();

  const handleChecked = (ingredient) => () => {
    props.onUpdate(ingredient, { available: !ingredient.available });
    showSnackbar({ message: 'Saved' });
  };

  return (
    <Grid container>
      {props.ingredients.map((product) =>
        editing && editing.id === product.id ? (
          <Grid item key={product.id} xs={12}>
            <AddIngredient
              ingredients={props.ingredients}
              edit={editing}
              onAfterEdit={() => setEditing(false)}
            />
          </Grid>
        ) : (
          <Grid container item key={product.id} xs={12} alignItems="center">
            <Grid item>
              <Checkbox checked={product.available} onChange={handleChecked(product)} />
            </Grid>
            <Grid item onClick={() => setEditing(product)} xs={10}>
              {product.title}
            </Grid>
          </Grid>
        )
      )}
    </Grid>
  );
};
