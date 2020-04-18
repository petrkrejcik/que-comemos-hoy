import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { Button, Checkbox, TextField, List, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { db, firebase } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';

export const Products = () => {
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  useAsync(async () => {
    if (!user) return;
    const query = db
      .collection('products')
      .where('available', '==', false)
      .where('userId', '==', user.id)
      .limit(50);

    query.onSnapshot((snapshot) => {
      const loadedProducts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProducts(loadedProducts);
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

  //   const update = (product) => async () => {
  //     await db.collection('products').doc(product.id).update({
  //       available: true,
  //     });
  //   };

  const update = (product) => () => {
    const batch = db.batch();
    batch.update(db.doc(`products/${product.id}`), { available: true });
    Object.keys(product.recipes).forEach((recipeId) => {
      batch.update(db.doc(`recipes/${recipeId}`), {
        [`ingredients.${product.id}.available`]: true,
      });
    });
    batch.commit();
  };

  return (
    <div>
      <List>
        {products.map((product) => (
          <div key={product.id}>
            <Checkbox checked={false} onChange={update(product)} />
            {product.title}
          </div>
        ))}
        <IconButton>
          <Add />
        </IconButton>
        <TextField label="Add" value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
        <Button
          onClick={add}
          color="primary"
          variant="outlined"
          disabled={newProduct.trim() === ''}
        >
          Save
        </Button>
      </List>
    </div>
  );
};
