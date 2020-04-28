import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  List,
  ListItem,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { Swipeable } from 'app/Swipeable';
import { db, useColData, useDocData } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';
import { ProductList } from './ProductList';
import { AddNew } from './ProductListAddNew';
import { Product } from './Product';
import { Shops } from 'shop/Shops';

const PAGES = {
  list: 0,
  product: 1,
  shops: 2,
};

export const Products = () => {
  const { productId, shop } = useParams();
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const classes = useStyles();

  const [ingredients, loading, error] = useColData(
    db.collection(`userGroups/${user.groupId}/ingredients`),
    // .orderBy('insertDate')
    { idField: 'id' }
  );

  const [userData, userDataLoading, userDataError] = useDocData(
    db.doc(`userGroups/${user.groupId}`)
  );

  //   const deleteIngredient = (ingredient) => {
  //     updateIngredient(ingredient, 'delete');
  //     handleIngredientEdit(null);
  //   };

  if (error || userDataError) {
    console.log('🛎 ', 'errorrr', error || userDataError);
    return null;
  }

  if (loading || userDataLoading) return LoadingComponent;

  const getIndex = () => {
    if (!productId) return PAGES.list;
    if (shop) return PAGES.shops;
    return PAGES.product;
  };

  const available = ingredients && ingredients.filter(({ available }) => available);
  const shopsObj = (userData && userData.shops) || {};
  const shops = Object.keys(shopsObj).reduce((acc, id) => [...acc, { id, ...shopsObj[id] }], []);

  return (
    <Swipeable index={getIndex()}>
      <Container index={PAGES.list}>
        <List>
          <ProductList
            ingredients={ingredients.filter(({ available }) => !available)}
            shops={shops}
            active={getIndex() === PAGES.list}
          />
          <AddNew ingredients={ingredients} />
        </List>
        {available.length > 0 && (
          <ExpansionPanel>
            <ExpansionPanelSummary>{available.length} products stocked</ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              <List>
                <ProductList
                  ingredients={available}
                  shops={shops}
                  active={getIndex() === PAGES.list}
                />
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </Container>
      <Container index={PAGES.product}>
        <Product
          products={ingredients}
          productId={productId}
          shops={shops}
          active={getIndex() === PAGES.product}
        />
      </Container>
      <Container index={PAGES.shops}>
        <Shops shops={shops} active={getIndex() === PAGES.shops} />
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
});
