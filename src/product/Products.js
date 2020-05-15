import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { Swipeable } from 'app/Swipeable';
import { ShoppingList } from 'product/ShoppingList';
import { FrozenList } from 'product/FrozenList';
import { Product } from 'product/Product';
import { SECTIONS } from 'product/productUtils';

const PAGES = {
  list: 0,
  product: 1,
  frozen: 2,
};

export const Products = () => {
  const { section, productId } = useParams();

  const getIndex = () => {
    if (productId) return PAGES.product;
    if (section === SECTIONS.frozen) return PAGES.frozen;
    return PAGES.list;
  };

  return (
    <Swipeable index={getIndex()}>
      <Container>
        <ShoppingList />
      </Container>
      <Container>
        <Product productId={productId} active={getIndex() === PAGES.product} />
      </Container>
      <Container>
        <FrozenList />
      </Container>
    </Swipeable>
  );
};
