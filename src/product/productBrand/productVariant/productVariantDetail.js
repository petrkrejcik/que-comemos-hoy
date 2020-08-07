import React from 'react';
import { TextField, Select, MenuItem, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import produce from 'immer';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import { ItemDetail } from 'itemDetail/itemDetail';
import { ItemDetailSelect } from 'itemDetail/itemDetailFields';
import { useProduct, useProductVariant } from 'product/productHooks';
import { upsert, remove } from 'product/productUtils';
import { useFirestore } from 'storage/firebase';
import { useUser, shops2Array, useUserData } from 'user/userUtils';

export const ProductVariantDetail = (props) => {
  const { brandId } = useParams();
  const product = useProduct();
  const variant = useProductVariant();
  const db = useFirestore();
  const user = useUser();

  if (!props.active) return null;

  return (
    <ItemDetail
      id={product.id}
      queryKey="products"
      handleSave={upsert(db, user, (variantValues) => {
        const variantId = variant.id || slugify(variantValues.title, { lower: true });
        return produce(product, (draft) => {
          draft.brands[brandId].variants[variantId] = draft.brands[brandId].variants[variantId] || variant;
          draft.brands[brandId].variants[variantId].title = variantValues.title;
          if (variantValues.shop) {
            draft.brands[brandId].variants[variantId].shops[variantValues.shop] = {
              price: parseFloat(variantValues.price),
            };
          }
        });
      })}
      handleRemove={(variantId) => () => {
        upsert(db, user, () => {
          return produce(product, (draft) => {
            delete draft.brands[brandId].variants[variantId];
          });
        })()();
      }}
      active={props.active}
      defaultValues={{ ...variant, shop: '', price: '' }}
      renderFields={(control) => [
        <Controller as={TextField} name="title" control={control} label="Title" rules={{ required: true }} fullWidth />,
        <Shops control={control} />,
      ]}
    />
  );
};

const Shops = (props) => {
  const [userData] = useUserData();
  const variant = useProductVariant();
  const shops = userData?.shops || {};

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Shop</TableCell>
          <TableCell align="right">Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(variant.shops)
          .filter((id) => !!shops[id])
          .map((id) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {shops[id].title}
              </TableCell>
              <TableCell align="right">{variant.shops[id].price}</TableCell>
            </TableRow>
          ))}
        <TableRow>
          <TableCell component="th" scope="row">
            <Controller
              as={ItemDetailSelect}
              name="shop"
              control={props.control}
              label="Shop"
              options={shops2Array(shops)}
            />
          </TableCell>
          <TableCell align="right">
            <Controller as={TextField} name="price" control={props.control} label="Price" type="number" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
