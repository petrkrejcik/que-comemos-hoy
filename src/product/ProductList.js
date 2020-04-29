import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLongPress } from 'react-use';
import { Checkbox, Grid, Box, Chip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'snackbar/Snackbar';
import { updateIngredient } from './ingredientUtils';
import { globalStateContext } from 'app/GlobalStateContext';
import { useHeader } from 'header/headerUtils';

export const ProductList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const setHeader = useHeader(props.active);
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  // const [hoveredId, setHoveredId] = React.useState(null);
  // const longPress = useLongPress((e) => {
  //   console.log('🛎 ', 'e', e.target);
  //   // setHoveredId()
  // });

  React.useEffect(() => {
    setHeader({});
  }, [setHeader]);

  const handleChecked = (ingredient) => () => {
    updateIngredient(ingredient, user, { available: !ingredient.available });
    showSnackbar({ message: 'Saved' });
  };

  const handleProductClick = (product) => () => {
    history.push(`/products/${product.id}`);
  };

  return props.ingredients.map((product) => (
    <Grid container alignItems="center" justifyX="space-between" key={product.id}>
      <Grid item>
        <Checkbox checked={product.available} onChange={handleChecked(product)} />
      </Grid>
      <Grid item xs={7}>
        <Button onClick={handleProductClick(product)} classes={classes}>
          {product.title}
        </Button>
      </Grid>
      <Grid item container xs={3} justify="flex-end">
        <Grid item>
          {product.shop && props.shops && props.shops[product.shop] && (
            <Chip label={props.shops[product.shop].title} />
          )}
        </Grid>
      </Grid>
    </Grid>
  ));
};

const useStyles = makeStyles({
  label: {
    textTransform: 'none',
  },
});
