import React from 'react';
import { TextField } from '@material-ui/core';
import produce from 'immer';
import { Controller } from 'react-hook-form';
import slugify from 'slugify';
import { ItemDetail } from 'itemDetail/itemDetail';
import { ProductVariantList } from 'product/productBrand/productVariant/productVariantList';
import { useProduct, useProductBrand } from 'product/productHooks';
import { upsert } from 'product/productUtils';
import { useFirestore } from 'storage/firebase';
import { useUser } from 'user/userUtils';

export const ProductBrandDetail = (props) => {
  const product = useProduct();
  const brand = useProductBrand();
  const db = useFirestore();
  const user = useUser();

  if (!props.active) return null;

  return (
    <ItemDetail
      queryKey="products"
      handleSave={(brandValues) => () => {
        const brandId = brand.id || slugify(brandValues.title, { lower: true });
        // Kinda hacky... I need to return brandId to pass it to onSuccess
        upsert(db, user, () => {
          return produce(product, (draft) => {
            draft.brands[brandId] = { ...brand, ...brandValues };
            if (draft.brands[brandId].rating && typeof draft.brands[brandId].rating === 'string') {
              draft.brands[brandId].rating = draft.brands[brandId].rating.replace(',', '.');
              draft.brands[brandId].rating = parseFloat(draft.brands[brandId].rating);
            }
          });
        })(brandValues)();
        return brandId;
      }}
      handleRemove={(brandId) => () => {
        upsert(db, user, () => {
          return produce(product, (draft) => {
            delete draft.brands[brandId];
          });
        })()();
      }}
      active={props.active}
      defaultValues={brand}
      renderFields={(control) => [
        <Controller as={TextField} name="title" control={control} label="Title" rules={{ required: true }} fullWidth />,
        <Controller as={TextField} name="rating" control={control} label="Rating" fullWidth />,
        <ProductVariantList />,
      ]}
    />
  );
};
