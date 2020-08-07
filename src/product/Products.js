import React from 'react';
import { Container } from '@material-ui/core';
import { AcUnit, ShoppingCart } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import { Shell } from 'app/Shell';
import { Swipeable } from 'app/Swipeable';
// import { FrozenList } from 'product/FrozenList';
// import { Product } from 'product/Product';
import { ProductBrandDetail } from 'product/productBrand/productBrandDetail';
import { ProductVariantDetail } from 'product/productBrand/productVariant/productVariantDetail';
import { ProductDetail } from 'product/ProductDetail';
import { ProductProvider } from 'product/ProductProvider';
import { SECTIONS } from 'product/productUtils';
import { ShoppingList } from 'product/ShoppingList';

const PAGES = {
  list: 0,
  product: 1,
  brand: 2,
  variant: 3,
  // frozen: 4,
};

export const Products = () => {
  const { section, productId, brand, variant } = useParams();

  const getIndex = () => {
    if (variant) return PAGES.variant;
    if (brand) return PAGES.brand;
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
            {/* <Product productId={productId} active={getIndex() === PAGES.product} /> */}
            <ProductDetail active={getIndex() === PAGES.product} />
          </Container>
          <Container>
            <ProductBrandDetail active={getIndex() === PAGES.brand} />
          </Container>
          <Container>
            <ProductVariantDetail active={getIndex() === PAGES.variant} />
          </Container>
          {/* <Container>
            <FrozenList />
          </Container> */}
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
  // {
  //   label: 'Frozen',
  //   route: '/products/frozen',
  //   icon: AcUnit,
  // },
  // {
  //   label: 'Schedule',
  //   route: '/schedule',
  //   icon: LocationOnIcon,
  // },
];
