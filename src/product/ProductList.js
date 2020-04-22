import React from 'react';
import { Checkbox } from '@material-ui/core';
import { AddIngredient } from './AddIngredient';

export const ProductList = (props) => {
  const [editing, setEditing] = React.useState(null);

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
          <Checkbox
            checked={product.available}
            onChange={() => props.onUpdate(product, { available: !product.available })}
          />
          <span onClick={() => setEditing(product)}>{product.title}</span>
        </>
      )}
    </div>
  ));
};
