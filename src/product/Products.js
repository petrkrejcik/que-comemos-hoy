import React from 'react';
import { useAsync } from 'react-use';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { List, Tabs, Tab, Typography, Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { updateIngredient } from './ingredientUtils';

import { db } from 'storage/firebase';
import { globalStateContext } from 'app/GlobalStateContext';
import { ProductList } from './ProductList';
import { AddIngredient } from './AddIngredient';

export const Products = () => {
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  // const [ingredientsAll, setAllProducts] = React.useState([]);
  const [tab, setTab] = React.useState(0);
  const classes = useStyles();

  const members = Object.keys(user.members || {});
  const [ingredientsAll, ingredientsLoading, ingredientsError] = useCollectionData(
    db
      .collection('products')
      .where('userId', 'in', [user.id, ...members])
      .limit(50),
    { idField: 'id' }
  );

  // const ingredients = useAsync(async () => {
  //   if (!user) return;
  //   const members = Object.keys(user.members || {});
  //   return new Promise((resolve) => {
  //     db.collection('products')
  //       .where('userId', 'in', [user.id, ...members])
  //       .limit(50)
  //       .onSnapshot((snapshot) => {
  //         const loadedProducts = snapshot.docs.map((doc) => {
  //           return {
  //             id: doc.id,
  //             ...doc.data(),
  //           };
  //         });
  //         resolve(loadedProducts);
  //         setAllProducts(loadedProducts);
  //       });
  //   });
  // }, [user]);

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
        aria-label="tabs"
      >
        <Tab label="Buy" {...a11yProps(0)} />
        <Tab label="Have" {...a11yProps(1)} />
        <Tab label="All" {...a11yProps(2)} />
      </Tabs>
      <SwipeableViews
        axis="x"
        index={tab}
        onChangeIndex={(e, value) => handleTabChange(value)}
        className={classes.content}
      >
        {ingredientsLoading ? (
          <div>Loading</div>
        ) : (
          // <Grid container justify="center" wrap="nowrap">
          //   <Grid item xs={11}>
          //     {/* <Skeleton variant="text" /> */}
          //     <Skeleton variant="rect" width={25} />
          //     <Skeleton variant="rect" width={140} />
          //   </Grid>
          //   <Grid item xs={11}>
          //     <Skeleton variant="text" />
          //     {/* <Skeleton variant="text" width={40} /> */}
          //   </Grid>
          // </Grid>
          <>
            <TabPanel value={tab} index={0}>
              <List>
                <ProductList
                  ingredients={ingredientsAll.filter(({ available }) => !available)}
                  onUpdate={updateIngredient}
                />
                <AddIngredient ingredients={ingredientsAll} />
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
          </>
        )}
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

const useStyles = makeStyles({
  root: {
    position: 'fixed',
  },
  content: {
    height: 'calc(100vh - 2 * 56px)',
  },
});
