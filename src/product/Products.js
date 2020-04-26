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
import { db, useColData } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';
import { ProductList } from './ProductList';
import { AddNew } from './ProductListAddNew';
import { Product } from './Product';

export const Products = () => {
  const { productId } = useParams();
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const classes = useStyles();

  const [ingredients, loading, error] = useColData(
    db.collection(`userGroups/${user.groupId}/ingredients`),
    // .orderBy('insertDate')
    { idField: 'id' }
  );

  //   const deleteIngredient = (ingredient) => {
  //     updateIngredient(ingredient, 'delete');
  //     handleIngredientEdit(null);
  //   };

  if (error) {
    console.log('🛎 ', 'errorrr', error);
    return null;
  }

  if (loading) return LoadingComponent;

  const available = ingredients && ingredients.filter(({ available }) => available);

  return (
    <Swipeable index={productId ? 1 : 0} backIcon={!!productId}>
      <Container index={0}>
        <List>
          <ProductList ingredients={ingredients.filter(({ available }) => !available)} />
          <AddNew ingredients={ingredients} />
        </List>
        {available.length > 0 && (
          <ExpansionPanel>
            <ExpansionPanelSummary>{available.length} products stocked</ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              <List>
                <ProductList ingredients={available} />
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </Container>
      <Container index={1}>
        <Product products={ingredients} productId={productId} />
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
