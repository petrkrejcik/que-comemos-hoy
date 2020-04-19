import React, { useState, useEffect } from 'react';
import { useAsync } from 'react-use';
import { Button, TextField, List, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Add } from '@material-ui/icons';
import { db, firebase } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';
import { ProductList } from './ProductList';

export const Products = () => {
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [ingredientsAll, setAllProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');

  useAsync(async () => {
    if (!user) return;
    const query = db.collection('products').where('userId', '==', user.id).limit(50);

    query.onSnapshot((snapshot) => {
      const loadedProducts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setAllProducts(loadedProducts);
    });
  }, [user]);

  const add = async () => {
    await db.collection('products').add({
      title: newProduct,
      available: false,
      userId: user.id,
    });
    setNewProduct('');
  };

  const updateIngredient = (ingredient, data) => {
    if (!ingredient) return;
    const batch = db.batch();
    const ingredientRef = db.doc(`products/${ingredient.id}`);
    if (data === 'delete') {
      batch.delete(ingredientRef);
    } else {
      batch.update(ingredientRef, data);
    }
    if (ingredient.recipes) {
      Object.keys(ingredient.recipes).forEach((recipeId) => {
        if (data === 'delete') {
          batch.set(
            db.doc(`recipes/${recipeId}`),
            { ingredients: { [ingredient.id]: firebase.firestore.FieldValue.delete() } },
            { merge: true }
          );
        } else {
          const values = Object.keys(data).reduce((acc, key) => {
            acc[`ingredients.${ingredient.id}.${key}`] = data[key];
            return acc;
          }, {});
          batch.update(db.doc(`recipes/${recipeId}`), values);
        }
      });
    }
    batch.commit();
  };

  //   const deleteIngredient = (ingredient) => {
  //     updateIngredient(ingredient, 'delete');
  //     handleIngredientEdit(null);
  //   };

  return (
    <div>
      Buy
      <List>
        <ProductList
          ingredients={ingredientsAll.filter(({ available }) => !available)}
          onUpdate={updateIngredient}
        />

        {/* <IconButton>
          <Add />
        </IconButton> */}
        <Autocomplete
          options={ingredientsAll}
          getOptionLabel={(option) => option.title}
          freeSolo
          inputValue={newProduct}
          renderInput={(params) => <TextField {...params} label="Add" />}
          onInputChange={(e, newIngredient) => setNewProduct(newIngredient)}
          onChange={(event, ingredient) => {
            updateIngredient(ingredient, { available: false });
          }}
        />
        <Button
          onClick={add}
          color="primary"
          variant="outlined"
          disabled={newProduct.trim() === ''}
        >
          Save
        </Button>
      </List>
      Have
      <List>
        <ProductList
          ingredients={ingredientsAll.filter(({ available }) => available)}
          onUpdate={updateIngredient}
        />
      </List>
    </div>
  );
};
