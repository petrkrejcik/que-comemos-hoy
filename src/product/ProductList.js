import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLongPress } from 'react-use';
import { Checkbox, Grid, Box, Chip, Button, Typography, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'snackbar/Snackbar';
import { updateIngredient, isOnShoppingList, toggleIsOnShoppingList } from './ingredientUtils';
import { globalStateContext } from 'app/GlobalStateContext';
import { useHeader } from 'header/headerUtils';
import { useUserData } from 'user/userUtils';

export const ProductList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const setHeader = useHeader(props.active);
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [userData] = useUserData();
  // const [hoveredId, setHoveredId] = React.useState(null);
  // const longPress = useLongPress((e) => {
  //   console.log('🛎 ', 'e', e.target);
  //   // setHoveredId()
  // });

  React.useEffect(() => {
    setHeader({});
  }, [setHeader]);

  const handleChecked = (ingredient) => () => {
    const updated = toggleIsOnShoppingList(ingredient);
    updateIngredient(ingredient, user, updated);
    showSnackbar({ message: 'Saved' });
  };

  const handleProductClick = (product) => () => {
    history.push(`/products/${product.id}`);
  };

  const { shops = [] } = userData || {};

  return (
    <Box width={1}>
      <List disablePadding>
        {props.ingredients.map((product) => (
          <Grid container alignItems="center" key={product.id} width={1}>
            <Grid item>
              <Checkbox
                checked={!isOnShoppingList(true)(product)}
                onChange={handleChecked(product)}
              />
            </Grid>
            <Grid item xs={7}>
              <Button onClick={handleProductClick(product)} classes={classes} width={1}>
                <Typography noWrap>{product.title}</Typography>
              </Button>
            </Grid>
            <Grid item container xs={3} justify="flex-end">
              <Grid item>
                {props.showShops && product.shop && shops[product.shop] ? (
                  <Chip label={shops[product.shop].title} />
                ) : (
                  <span>&nbsp;</span>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </List>
    </Box>
  );
};

const useStyles = makeStyles({
  label: {
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
});
