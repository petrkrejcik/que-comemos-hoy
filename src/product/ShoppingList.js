import React from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'snackbar/Snackbar';
import { ToggleList } from 'product/ToggleList';
import { useHeader } from 'header/headerUtils';
import {
  isOnShoppingList,
  toggleIsOnShoppingList,
  updateIngredient,
  SECTIONS,
} from 'product/productUtils';
import { userContext } from 'user/UserProvider';

export const ShoppingList = (props) => {
  const { section, productId } = useParams();
  const showSnackbar = useSnackbar();
  const [{ user }] = React.useContext(userContext);
  const isActive = section === SECTIONS.shoppingList && !productId;
  const setHeader = useHeader(isActive);

  React.useEffect(() => {
    setHeader({});
  }, [setHeader]);

  const handleChecked = (product) => () => {
    const updated = toggleIsOnShoppingList(product);
    updateIngredient(product, user, updated);
    showSnackbar({ message: 'Saved' });
  };

  return (
    <ToggleList
      topProducts={props.topProducts}
      topProductsShopChip
      bottomProducts={props.bottomProducts}
      active={isActive}
      expansionPanelTitle="products available"
      handleChecked={handleChecked}
      isChecked={isOnShoppingList(false)}
      addNew
    />
  );
};
