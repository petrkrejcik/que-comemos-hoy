import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLongPress } from 'react-use';
import { Checkbox, Grid, Box } from '@material-ui/core';
import { useSnackbar } from 'snackbar/Snackbar';
import { updateIngredient } from './ingredientUtils';
import { globalStateContext } from 'app/GlobalStateContext';

export const ProductList = (props) => {
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  // const [hoveredId, setHoveredId] = React.useState(null);
  // const longPress = useLongPress((e) => {
  //   console.log('🛎 ', 'e', e.target);
  //   // setHoveredId()
  // });

  const handleChecked = (ingredient) => () => {
    updateIngredient(ingredient, user, { available: !ingredient.available });
    showSnackbar({ message: 'Saved' });
  };

  const handleProductClick = (product) => () => {
    history.push(`/products/${product.id}`);
  };

  return props.ingredients.map((product) => (
    <Box key={product.id}>
      <Checkbox checked={product.available} onChange={handleChecked(product)} />
      <span onClick={handleProductClick(product)}>{product.title}</span>
    </Box>
  ));
};
