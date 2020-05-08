import React from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'snackbar/Snackbar';
import { ToggleList } from 'product/ToggleList';
import {
  isOnShoppingList,
  toggleIsOnShoppingList,
  updateIngredient,
  SECTIONS,
} from 'product/productUtils';
import { globalStateContext } from 'app/GlobalStateContext';

export const ShoppingList = (props) => {
  const { section } = useParams();
  const showSnackbar = useSnackbar();
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;

  const handleChecked = (product) => () => {
    const updated = toggleIsOnShoppingList(product);
    updateIngredient(product, user, updated);
    showSnackbar({ message: 'Saved' });
  };

  return (
    <ToggleList
      topProducts={props.topProducts}
      bottomProducts={props.bottomProducts}
      active={section === SECTIONS.shoppingList}
      expansionPanelTitle="products available"
      handleChecked={handleChecked}
      isChecked={isOnShoppingList(false)}
      addNew
    />
  );
};
