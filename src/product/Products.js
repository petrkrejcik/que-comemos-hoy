import React, { useState, useEffect } from 'react';
import { useAsync } from 'react-use';
import { Button, TextField, List, IconButton, Tabs, Tab, Typography, Box } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
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
  const [tab, setTab] = useState(0);

  useAsync(async () => {
    if (!user) return;
    const members = Object.keys(user.members || {});
    const query = db
      .collection('products')
      .where('userId', 'in', [user.id, ...members])
      .limit(50);

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

  const handleTabChange = (index) => {
    setTab(index);
  };
  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };

  return (
    <div>
      <Tabs
        value={tab}
        onChange={(e, value) => handleTabChange(value)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Buy" {...a11yProps(0)} />
        <Tab label="Have" {...a11yProps(1)} />
        <Tab label="All" {...a11yProps(2)} />
      </Tabs>
      <SwipeableViews axis="x" index={tab} onChangeIndex={(e, value) => handleTabChange(value)}>
        <TabPanel value={tab} index={0}>
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
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <List>
            <ProductList
              ingredients={ingredientsAll.filter(({ available }) => available)}
              onUpdate={updateIngredient}
            />
          </List>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <List>
            <ProductList ingredients={ingredientsAll} onUpdate={updateIngredient} />
          </List>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};
