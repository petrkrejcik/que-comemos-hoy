import React from 'react';
import { TextField, Grid, InputLabel, Select as SelectMui, MenuItem } from '@material-ui/core';
import produce from 'immer';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ItemDetail } from 'itemDetail/itemDetail';
import { ItemDetailCheckbox, ItemDetailSelect } from 'itemDetail/itemDetailFields';
import { ProductBrandList } from 'product/productBrand/productBrandList';
import { useProduct } from 'product/productHooks';
import { upsert, remove } from 'product/productUtils';
import { useFirestore } from 'storage/firebase';
import { useUser, shops2Array, useUserData } from 'user/userUtils';

export const ProductDetail = (props) => {
  const { productId } = useParams();
  const product = useProduct();
  const db = useFirestore();
  const user = useUser();
  const [userData] = useUserData();

  if (!props.active) return null;

  const shops = shops2Array(userData?.shops || {});
  return (
    <ItemDetail
      id={productId === 'new' ? null : productId}
      queryKey="products"
      handleSave={upsert(db, user, (values) => {
        const { isOnShoppingList, ...updatedProduct } = values;
        return produce(product, (draft) => {
          Object.assign(draft, updatedProduct);
          if (product.id) {
            Object.assign(draft, { 'lists.shopping': !!isOnShoppingList });
          }
        });
      })}
      handleRemove={remove(db, user)}
      active={props.active}
      defaultValues={product}
      renderFields={({ control }) => [
        <Controller as={TextField} name="title" control={control} label="Title" fullWidth />,
        <Controller as={ItemDetailSelect} name="shop" control={control} label="Shop" options={shops} fullWidth />,
        <Controller as={ItemDetailCheckbox} name="isOnShoppingList" control={control} label="On shopping list" />,
        <ProductBrandList />,
      ]}
    />
  );
};

// const getFrozenValue = (product) => {
//   const frozen = isFrozen(product);
//   return frozen ? (isAvailable(product) ? FROZEN_STATES.both : FROZEN_STATES.yes) : FROZEN_STATES.no;
// };

// const frozenOptions = [
//   {
//     title: 'No',
//     value: FROZEN_STATES.no,
//   },
//   {
//     title: 'Yes',
//     value: FROZEN_STATES.yes,
//   },
//   {
//     title: 'Both',
//     value: FROZEN_STATES.both,
//   },
// ];
