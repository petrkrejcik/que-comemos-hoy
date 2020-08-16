import React from 'react';
import { TextField, Button } from '@material-ui/core';
import produce from 'immer';
import { Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import slugify from 'slugify';
import { CrudTable } from 'crudTable/crudTable';
import { ItemDetail } from 'itemDetail/itemDetail';
import { useProduct, useProductBrand, useProductVariant } from 'product/productHooks';
import { upsert } from 'product/productUtils';
import { useFirestore } from 'storage/firebase';
import { useUser } from 'user/userUtils';

export const ProductBrandDetail = (props) => {
  const { section } = useParams();
  const product = useProduct();
  const brand = useProductBrand();
  const variant = useProductVariant();
  const db = useFirestore();
  const user = useUser();
  const history = useHistory();

  if (!props.active) return null;

  const variants = Object.keys(brand.variants).map((id) => ({
    id,
    title: brand.variants[id].title,
  }));

  return (
    <ItemDetail
      queryKey="products"
      handleSave={upsert(db, user, (formValues) => {
        const brandId = brand.id || slugify(formValues.title, { lower: true });
        return produce(product, (draft) => {
          const { variantTitle, ...brandValues } = formValues;
          if (!draft.brands[brandId]) draft.brands[brandId] = { ...brand }; // Brand doesn't exist yet
          Object.assign(draft.brands[brandId], brandValues);
          if (draft.brands[brandId].rating && typeof draft.brands[brandId].rating === 'string') {
            draft.brands[brandId].rating = draft.brands[brandId].rating.replace(',', '.');
            draft.brands[brandId].rating = parseFloat(draft.brands[brandId].rating);
          }
          if (variantTitle) {
            if (formValues.variantId) {
              draft.brands[brandId].variants[formValues.variantId].title = variantTitle;
            } else {
              const variantId = slugify(variantTitle, { lower: true });
              draft.brands[brandId].variants[variantId] = { ...variant, title: variantTitle };
            }
          }
        });
      })}
      handleRemove={(brandId) => () => {
        upsert(db, user, () => {
          return produce(product, (draft) => {
            delete draft.brands[brandId];
          });
        })()();
      }}
      active={props.active}
      defaultValues={brand}
      renderFields={({ control, setValue, handleSave }) => [
        <Controller as={TextField} name="title" control={control} label="Title" rules={{ required: true }} fullWidth />,
        <Controller as={TextField} name="rating" control={control} label="Rating" fullWidth />,
        <Controller name="variantId" control={control} />,
        <Controller name="variantTitle" control={control} />,
        <CrudTable
          title="Variants"
          columns={[
            { title: 'Title', field: 'title' },
            {
              title: 'Shops',
              field: 'shops',
              editable: 'never',
              render: (rowData) => (
                <Button
                  onClick={() =>
                    history.push(`/products/${section}/${product.id}/brand/${brand.id}/variant/${rowData.id}`)
                  }
                >
                  Edit
                </Button>
              ),
            },
          ]}
          data={variants}
          cellEditable={{
            onCellEditApproved: async (newValue, oldValue, rowData, columnDef) => {
              setValue('variantId', rowData.id);
              setValue('variantTitle', newValue);
              handleSave();
            },
          }}
          editable={{
            onRowAdd: async (newData) => {
              setValue('variantTitle', newData.title);
              handleSave();
            },
            onRowDelete: async ({ tableData }) => {
              const variantId = variants[tableData.id].id;
              upsert(db, user, () => {
                return produce(product, (draft) => {
                  delete draft.brands[brand.id].variants[variantId];
                });
              })()();
            },
          }}
        />,
      ]}
    />
  );
};
