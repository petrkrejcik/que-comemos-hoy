import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  IconButton,
  List,
  ListItem,
  Grid,
  Box,
  ExpansionPanel as MuiExpansionPanel,
  ExpansionPanelSummary as MuiExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Swipeable } from 'app/Swipeable';
import { ProductList } from './ProductList';
import { useProducts } from 'product/productUtils';
import { AddNew } from './ProductListAddNew';
import { Product } from './Product';
import { isOnShoppingList } from './ingredientUtils';

const PAGES = {
  list: 0,
  product: 1,
};

export const Products = () => {
  const { productId } = useParams();
  const classes = useStyles();
  const [ingredients, loading, error] = useProducts();

  //   const deleteIngredient = (ingredient) => {
  //     updateIngredient(ingredient, 'delete');
  //     handleIngredientEdit(null);
  //   };

  if (error) {
    console.log('🛎 ', 'errorrr', error);
    return null;
  }

  if (loading) return LoadingComponent;

  const getIndex = () => {
    if (!productId) return PAGES.list;
    return PAGES.product;
  };

  const notOnShoppingList = ingredients && ingredients.filter(isOnShoppingList(false));

  return (
    <Swipeable index={getIndex()}>
      <Container index={PAGES.list}>
        <Box ml={-1}>
          <ProductList
            ingredients={ingredients.filter(isOnShoppingList(true))}
            active={getIndex() === PAGES.list}
            showShops
          />
          <AddNew ingredients={ingredients} />
          <Divider />
          {notOnShoppingList.length > 0 && (
            <ExpansionPanel elevation={0} style={{ width: '100%' }}>
              <ExpansionPanelSummary className={classes.summary}>
                <Grid container alignItems="center">
                  <Grid item>
                    <IconButton style={{ padding: 9 }}>
                      <ChevronRight />
                    </IconButton>
                  </Grid>
                  <Grid item xs={10}>
                    <Box pl={'8px'}>{notOnShoppingList.length} products not on shopping list</Box>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                <ProductList ingredients={notOnShoppingList} active={getIndex() === PAGES.list} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
        </Box>
      </Container>
      <Container index={PAGES.product}>
        <Product
          products={ingredients}
          productId={productId}
          active={getIndex() === PAGES.product}
        />
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
        {[...Array(10)].map((i) => (
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
  root: {
    position: 'fixed',
  },
  rect: {
    marginRight: 8,
  },
  expansionPanelDetails: {
    padding: 0,
  },
  summary: { padding: 0 },
});

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);
