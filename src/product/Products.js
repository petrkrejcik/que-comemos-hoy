import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { AcUnit, ShoppingCart } from '@material-ui/icons';
import { Swipeable } from 'app/Swipeable';
import { ShoppingList } from 'product/ShoppingList';
import { FrozenList } from 'product/FrozenList';
import { Product } from 'product/Product';
import { SECTIONS } from 'product/productUtils';
import { ProductProvider } from 'product/ProductProvider';
import { ProductVariant } from 'product/productVariant/ProductVariant';
import { Shell } from 'app/Shell';

const PAGES = {
  list: 0,
  product: 1,
  variant: 2,
  frozen: 3,
};

export const Products = () => {
  const { section, productId, variant } = useParams();

  const getIndex = () => {
    if (variant) return PAGES.variant;
    if (productId) return PAGES.product;
    if (section === SECTIONS.frozen) return PAGES.frozen;
    return PAGES.list;
  };

  return (
    <Shell bottomNavigation={bottomNavigation}>
      <ProductProvider>
        <Swipeable index={getIndex()}>
          <Container>
            <ShoppingList />
          </Container>
          <Container>
            <Product productId={productId} active={getIndex() === PAGES.product} />
          </Container>
          <Container>
            <ProductVariant productId={productId} active={getIndex() === PAGES.variant} />
          </Container>
          <Container>
            <FrozenList />
          </Container>
        </Swipeable>
      </ProductProvider>
    </Shell>
  );
};

const bottomNavigation = [
  {
    label: 'Shopping list',
    route: '/products/shopping-list',
    icon: ShoppingCart,
  },
  {
    label: 'Frozen',
    route: '/products/frozen',
    icon: AcUnit,
  },
  // {
  //   label: 'Schedule',
  //   route: '/schedule',
  //   icon: LocationOnIcon,
  // },
];
