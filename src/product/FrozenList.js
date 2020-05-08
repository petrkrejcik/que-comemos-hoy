import React from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'snackbar/Snackbar';
import { ToggleList } from 'product/ToggleList';
import {
  isFrozen,
  toggleIsFrozen,
  updateIngredient,
  useProducts,
  SECTIONS,
} from 'product/productUtils';
import { globalStateContext } from 'app/GlobalStateContext';

export const FrozenList = () => {
  const { section } = useParams();
  const [products] = useProducts();
  const showSnackbar = useSnackbar();
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;

  const handleChecked = (product) => () => {
    const updated = toggleIsFrozen(product);
    updateIngredient(product, user, updated);
    showSnackbar({ message: 'Saved' });
  };

  return (
    <ToggleList
      topProducts={products.filter((product) => isFrozen(product))}
      bottomProducts={products.filter((product) => !isFrozen(product))}
      active={section === SECTIONS.frozen}
      expansionPanelTitle="products not frozen"
      handleChecked={handleChecked}
      isChecked={isFrozen}
    />
  );
};
