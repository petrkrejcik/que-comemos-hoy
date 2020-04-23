import React from 'react';
import { useAsync } from 'react-use';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { List, ListItem, Tabs, Tab, Typography, Box, Grid } from '@material-ui/core';
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
  const [tab, setTab] = React.useState(0);
  const classes = useStyles();

  const members = Object.keys(user.members || {});
  const [ingredients, loading, error] = useCollectionData(
    db
      .collection('products')
      .where('userId', 'in', [user.id, ...members])
      .orderBy('insertDate')
      .limit(50),
    { idField: 'id' }
  );

  //   const deleteIngredient = (ingredient) => {
  //     updateIngredient(ingredient, 'delete');
  //     handleIngredientEdit(null);
  //   };

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };

  if (error) {
    console.log('🛎 ', 'errorrr', error);
    return null;
  }

  return (
    <div>
      <Tabs
        value={tab}
        onChange={(e, value) => setTab(value)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="tabs"
      >
        <Tab label="Buy" {...a11yProps(0)} />
        <Tab label="Have" {...a11yProps(1)} />
        <Tab label="All" {...a11yProps(2)} />
      </Tabs>
      {loading ? (
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
      ) : (
        <SwipeableViews
          axis="x"
          index={tab}
          onChangeIndex={(e, value) => setTab(value)}
          className={classes.content}
        >
          <TabPanel value={tab} index={0}>
            <List>
              <ProductList
                ingredients={ingredients.filter(({ available }) => !available)}
                onUpdate={updateIngredient}
              />
              <AddIngredient ingredients={ingredients} />
            </List>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <List>
              <ProductList
                ingredients={ingredients.filter(({ available }) => available)}
                onUpdate={updateIngredient}
              />
            </List>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <List>
              <ProductList ingredients={ingredients} onUpdate={updateIngredient} />
            </List>
          </TabPanel>
        </SwipeableViews>
      )}
    </div>
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
  rect: {
    marginRight: 8,
  },
});
