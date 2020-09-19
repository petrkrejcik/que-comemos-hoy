import React from 'react';
import { useParams } from 'react-router-dom';
import { productContext } from 'product/ProductProvider';
import { sanitizeBrands, sortBrands } from 'product/productUtils';

export const useProduct = () => {
  const { products } = React.useContext(productContext);
  const { productId } = useParams();

  // todo: use products as array directly
  const product = products[0].find((p) => p.id === productId) || {};
  const brands = sanitizeBrands(product.brands);
  return {
    title: '',
    shop: '',
    categories: {},
    availability: {
      default: false,
    },
    lists: {
      shopping: true,
    },
    ...product,
    meta: {
      brandsByTitle: sortBrands(brands),
    },
    brands,

    // do not store these values to db
    isOnShoppingList: product.lists ? !!product.lists.shopping : true,
  };
};

export const useProductBrand = () => {
  const { brandId } = useParams();
  const product = useProduct();
  const brand = (product.brands && product.brands[brandId]) || {};

  return {
    title: '',
    rating: '',
    variants: {},
    ...(brandId && { id: brandId }),
    ...brand,
  };
};

export const useProductVariant = () => {
  const { variantId } = useParams();
  const brand = useProductBrand();
  const variant = brand.variants[variantId] || {};

  return {
    title: '',
    shops: {},
    quantity: '',
    unit: '',
    ...(variantId && { id: variantId }),
    ...variant,
  };
};
