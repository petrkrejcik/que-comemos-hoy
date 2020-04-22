import React from 'react';
import { Checkbox } from '@material-ui/core';
import { AddIngredient } from './AddIngredient';
import { useSnackbar } from 'snackbar/Snackbar';

export const ProductList = (props) => {
  const [editing, setEditing] = React.useState(null);
  const showSnackbar = useSnackbar();

  const handleChecked = (ingredient) => () => {
    props.onUpdate(ingredient, { available: !ingredient.available });
    showSnackbar({ message: 'Saved' });
  };

  return props.ingredients.map((product) => (
    <div key={product.id}>
      {editing && editing.id === product.id ? (
        <AddIngredient
          ingredients={props.ingredients}
          edit={editing}
          onAfterEdit={() => setEditing(false)}
        />
      ) : (
        <>
          <Checkbox checked={product.available} onChange={handleChecked(product)} />
          <span onClick={() => setEditing(product)}>{product.title}</span>
        </>
      )}
    </div>
  ));
};
