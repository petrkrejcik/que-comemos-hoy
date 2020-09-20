import React from 'react';
import { TextField } from '@material-ui/core';
import produce from 'immer';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import { CrudTable } from 'crudTable/crudTable';
import { ItemDetail } from 'itemDetail/itemDetail';
import { ItemDetailSelect } from 'itemDetail/itemDetailFields';
import { useProduct, useProductVariant } from 'product/productHooks';
import { upsert } from 'product/productUtils';
import { useFirestore } from 'storage/firebase';
import { useUser, useUserData } from 'user/userUtils';

export const ProductVariantDetail = (props) => {
  const { brandId } = useParams();
  const product = useProduct();
  const variant = useProductVariant();
  const db = useFirestore();
  const user = useUser();
  const [userData] = useUserData();
  const userShops = userData?.shops || {};

  if (!props.active) return null;

  const shops = Object.keys(variant.shops)
    .filter((id) => !!userShops[id])
    .map((id) => ({
      shopId: id,
      price: variant.shops[id].price,
    }));

  const userShopsOptions = Object.keys(userShops).reduce((result, id) => {
    result[id] = userShops[id].title;
    return result;
  }, {});

  return (
    <ItemDetail
      id={product.id}
      queryKey="products"
      handleSave={upsert(db, user, (formValues) => {
        const variantId = variant.id || slugify(formValues.title, { lower: true });
        const { shopId, price, ...variantValues } = formValues;
        return produce(product, (draft) => {
          draft.brands[brandId].variants[variantId] = produce(
            draft.brands[brandId].variants[variantId] || variant,
            (variantDraft) => {
              Object.assign(variantDraft, variantValues);
            }
          );
          if (shopId) {
            draft.brands[brandId].variants[variantId].shops[shopId] = { price: parseFloat(price) };
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
      defaultValues={variant}
      renderFields={({ control, setValue, handleSave, getValues }) => [
        <Controller
          as={TextField}
          name="quantity"
          control={control}
          label="Quantity"
          rules={{ required: true }}
          fullWidth
          type="number"
        />,
        <Controller as={ItemDetailSelect} name="unit" control={control} label="Unit" options={UNITS} fullWidth />,
        <Controller
          as={TextField}
          name="title"
          control={control}
          label="Details"
          rules={{ required: true }}
          fullWidth
        />,
        <Controller name="shopId" control={control} />,
        <Controller name="price" control={control} />,
        <CrudTable
          title="Shops"
          columns={[
            { title: 'Shop', field: 'shopId', lookup: userShopsOptions, defaultSort: 'asc' },
            { title: 'Price', field: 'price', type: 'numeric' },
          ]}
          data={shops}
          cellEditable={{
            onCellEditApproved: async (newValue, oldValue, rowData, columnDef) => {
              setValue('shopId', rowData.shopId);
              setValue('price', rowData.price);
              setValue(columnDef.field, newValue);
              handleSave();
            },
          }}
          editable={{
            onRowAdd: async (newData) => {
              setValue('shopId', newData.shopId);
              setValue('price', newData.price);
              handleSave();
            },
            onRowDelete: async ({ tableData }) => {
              const { shopId } = shops[tableData.id];
              upsert(db, user, () => {
                return produce(product, (draft) => {
                  delete draft.brands[brandId].variants[variant.id].shops[shopId];
                });
              })()();
            },
          }}
        />,
      ]}
    />
  );
};

const UNITS = [
  {
    value: 'ml',
    title: 'ml',
  },
  {
    value: 'kg',
    title: 'kg',
  },
];
