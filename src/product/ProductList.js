import React from 'react';
import { Button, Checkbox, TextField, List, IconButton } from '@material-ui/core';

export const ProductList = (props) => {
  const [editingId, setEditingId] = React.useState(null);
  const [editingTitle, setEditingTitle] = React.useState(null);

  const handleIngredientEdit = (ingredient) => {
    let title = null;
    let id = null;
    if (ingredient) {
      title = ingredient.title;
      id = ingredient.id;
    }
    setEditingTitle(title);
    setEditingId(id);
  };

  const editIngredient = (ingredient) => {
    props.onUpdate(ingredient, { title: editingTitle });
    handleIngredientEdit(null);
  };

  return props.ingredients.map((product) => (
    <div key={product.id}>
      {editingId === product.id ? (
        <>
          <TextField
            onChange={(e) => setEditingTitle(e.target.value)}
            value={editingTitle}
            autoFocus
          />
          <Button
            onClick={() => editIngredient(product)}
            color="secondary"
            variant="outlined"
            disabled={editingTitle.trim() === ''}
          >
            Save
          </Button>
          {/* <Button
                  onClick={() => deleteIngredient(product)}
                  color="secondary"
                  variant="outlined"
                  disabled={editingTitle.trim() === ''}
                >
                  Delete
                </Button> */}
        </>
      ) : (
        <>
          <Checkbox
            checked={product.available}
            onChange={() => props.onUpdate(product, { available: !product.available })}
          />
          <span onClick={() => handleIngredientEdit(product)}>{product.title}</span>
        </>
      )}
    </div>
  ));
};
