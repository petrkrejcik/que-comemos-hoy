import React from 'react';
import produce from 'immer';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import { CrudTable } from 'crudTable/crudTable';
import { ItemDetail } from 'itemDetail/itemDetail';
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
      id,
      shop: userShops[id].title,
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
      defaultValues={{ ...variant, shop: '', price: '' }} // asi to nemusu mit default hodnoty
      renderFields={({ control, setValue, handleSave, getValues }) => [
        <Controller name="title" control={control} />,
        <Controller name="shop" control={control} />,
        <Controller name="price" control={control} />,
        <CrudTable
          title="Shops"
          columns={[
            { title: 'Shop', field: 'shop', lookup: userShopsOptions },
            { title: 'Price', field: 'price', type: 'numeric' },
          ]}
          data={shops}
          cellEditable={{
            onCellEditApproved: async (newValue, oldValue, rowData, columnDef) => {
              setValue('shop', rowData.id);
              setValue(columnDef.field, newValue);
              handleSave();
            },
          }}
          editable={{
            onRowAdd: async (newData) => {
              setValue('shop', newData.shop);
              setValue('price', newData.price);
              handleSave();
            },
            onRowDelete: async ({ tableData }) => {
              const shopId = shops[tableData.id].id;
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
