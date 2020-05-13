import React from 'react';
import { useParams } from 'react-router-dom';
import { AcUnit } from '@material-ui/icons';
import { useSnackbar } from 'snackbar/Snackbar';
import { ToggleList } from 'product/ToggleList';
import { useHeader } from 'header/headerUtils';
import {
  isFrozen,
  toggleIsFrozen,
  updateIngredient,
  useProducts,
  SECTIONS,
} from 'product/productUtils';
import { userContext } from 'user/UserProvider';

export const FrozenList = () => {
  const { section, productId } = useParams();
  const [products] = useProducts();
  const showSnackbar = useSnackbar();
  const isActive = section === SECTIONS.frozen && !productId;
  const setHeader = useHeader(isActive);
  const [{ user }] = React.useContext(userContext);

  React.useEffect(() => {
    setHeader({});
  }, [setHeader]);

  const handleChecked = (product) => () => {
    const updated = toggleIsFrozen(product);
    updateIngredient(product, user, updated);
    showSnackbar({ message: 'Saved' });
  };

  return (
    <ToggleList
      topProducts={products.filter((product) => isFrozen(product))}
      topProductsIcon={AcUnit}
      bottomProducts={products.filter((product) => !isFrozen(product))}
      active={isActive}
      expansionPanelTitle="products not frozen"
      handleChecked={handleChecked}
      isChecked={isFrozen}
    />
  );
};
