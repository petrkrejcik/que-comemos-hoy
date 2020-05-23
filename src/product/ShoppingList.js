import React from 'react';
import { useParams } from 'react-router-dom';
import { List, ListItem, Grid } from '@material-ui/core';
import { useImmer } from 'use-immer';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'snackbar/Snackbar';
import { ToggleList } from 'product/ToggleList';
import { useHeader } from 'header/headerUtils';
import {
  isOnShoppingList,
  toggleIsOnShoppingList,
  updateIngredient,
  SECTIONS,
  useProducts,
} from 'product/productUtils';
import { useFirestore } from 'storage/firebase';
import { useUser } from 'user/userUtils';

export const ShoppingList = (props) => {
  const { section, productId } = useParams();
  const showSnackbar = useSnackbar();
  const user = useUser();
  const isActive = section === SECTIONS.shoppingList && !productId;
  const setHeader = useHeader(isActive);
  const [products, loading, error] = useProducts();
  const [productsLocal, updateProductsLocal] = useImmer([]);
  const db = useFirestore();

  React.useEffect(() => {
    updateProductsLocal((draft) => {
      draft.splice(0, draft.length, ...products);
    });
  }, [products, updateProductsLocal]);

  React.useEffect(() => {
    setHeader({});
  }, [setHeader]);

  const handleChecked = (product) => async () => {
    const updated = toggleIsOnShoppingList(product);
    updateProductsLocal((draft) => {
      const old = draft.find(({ id }) => id === product.id);
      Object.assign(old, updated);
    });
    showSnackbar({ message: 'Saved' });
    await updateIngredient(db, product, user, updated);
  };

  if (error) {
    console.log('🛎 ', 'errorrr', error);
    return null;
  }

  if (loading) return LoadingComponent;

  const notOnShoppingList = productsLocal && productsLocal.filter(isOnShoppingList(false));

  return (
    <ToggleList
      topProducts={productsLocal.filter(isOnShoppingList(true))}
      topProductsShopChip
      bottomProducts={notOnShoppingList}
      active={isActive}
      expansionPanelTitle="products available"
      handleChecked={handleChecked}
      isChecked={isOnShoppingList(false)}
      addNew
    />
  );
};

const SkeletonCheckbox = () => {
  const classes = useStyles();
  return <Skeleton variant="rect" width={20} height={20} className={classes.rect} />;
};

const SkeletonText = () => {
  const width = Math.ceil(Math.random() * 200) + 80;
  return <Skeleton variant="text" width={width} />;
};

const Loading = () => (
  <Grid container justify="center">
    <Grid item xs={11}>
      <List>
        {[...Array(10)].map((_, i) => (
          <ListItem key={i}>
            <SkeletonCheckbox />
            <SkeletonText />
          </ListItem>
        ))}
      </List>
    </Grid>
  </Grid>
);

const LoadingComponent = <Loading />;

const useStyles = makeStyles({
  rect: {
    marginRight: 8,
  },
});
