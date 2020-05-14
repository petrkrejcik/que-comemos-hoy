import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, List, ListItem, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { Swipeable } from 'app/Swipeable';
import { ShoppingList } from 'product/ShoppingList';
import { FrozenList } from 'product/FrozenList';
import { Product } from 'product/Product';
import { isOnShoppingList, useProducts, SECTIONS } from 'product/productUtils';

const PAGES = {
  list: 0,
  product: 1,
  frozen: 2,
};

export const Products = () => {
  const { section, productId } = useParams();
  // const classes = useStyles();
  const [ingredients, loading, error] = useProducts();

  if (error) {
    console.log('🛎 ', 'errorrr', error);
    return null;
  }

  if (loading) return LoadingComponent;

  const getIndex = () => {
    if (productId) return PAGES.product;
    if (section === SECTIONS.frozen) return PAGES.frozen;
    return PAGES.list;
  };

  const notOnShoppingList = ingredients && ingredients.filter(isOnShoppingList(false));

  return (
    <Swipeable index={getIndex()}>
      <Container>
        <ShoppingList
          topProducts={ingredients.filter(isOnShoppingList(true))}
          bottomProducts={notOnShoppingList}
        />
      </Container>
      <Container>
        <Product productId={productId} active={getIndex() === PAGES.product} />
      </Container>
      <Container>
        <FrozenList />
      </Container>
    </Swipeable>
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
