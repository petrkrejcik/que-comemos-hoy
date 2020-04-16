import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { Button, Checkbox, TextField, List, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { db } from 'storage/firebase';
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
      // snapshot.forEach((doc) => {
      //   console.log("🛎 ", "doc", doc.data());
      // });
    });
  }, [user]);

  const add = async () => {
    await db.collection('products').add({
      name: newProduct,
      available: false,
      userId: user.id,
    });
    setNewProduct('');
  };

  const update = (id) => async () => {
    await db.collection('products').doc(id).update({
      available: true,
    });
  };

  return (
    <div>
      <List>
        {products.map((product) => (
          <div key={product.id}>
            <Checkbox checked={false} onChange={update(product.id)} />
            {product.name}
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
