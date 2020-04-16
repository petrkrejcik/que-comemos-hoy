import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { Button, Checkbox, TextField, List, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { db } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';

export const Recipes = () => {
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [recipes, setRecipes] = useState([]);
  const [newProduct, setNewProduct] = useState('');

  useAsync(async () => {
    if (!user) return;
    const query = db.collection('recipes').where('userId', '==', user.id).limit(50);

    query.onSnapshot((snapshot) => {
      const loadedProducts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setRecipes(loadedProducts);
      // snapshot.forEach((doc) => {
      //   console.log("🛎 ", "doc", doc.data());
      // });
    });
  }, [user]);

  // const add = async () => {
  //   await db.collection('recipes').add({
  //     name: newProduct,
  //     available: false,
  //     userId: user.id,
  //   });
  //   setNewProduct('');
  // };

  // const update = (id) => async () => {
  //   await db.collection('recipes').doc(id).update({
  //     available: true,
  //   });
  // };

  return (
    <div>
      <List></List>
    </div>
  );
};
