import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
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
    quantity: [brand.variants[id].quantity, brand.variants[id].unit].join(' '),
    title: brand.variants[id].title,
  }));

  return (
    <ItemDetail
      queryKey="products"
      handleSave={upsert(db, user, (formValues) => {
        const brandId = brand.id || slugify(formValues.title, { lower: true });
        return produce(product, (draft) => {
          const { variantTitle, variantId, ...brandValues } = formValues;
          draft.brands[brandId] = produce(draft.brands[brandId] || brand, (brandDraft) => {
            Object.assign(brandDraft, brandValues);
            if (brandDraft.rating && typeof brandDraft.rating === 'string') {
              brandDraft.rating = brandDraft.rating.replace(',', '.');
              brandDraft.rating = parseFloat(brandDraft.rating);
            }
            if (variantTitle) {
              if (variantId) {
                brandDraft.variants[formValues.variantId].title = variantTitle;
              } else {
                const variantId = slugify(variantTitle, { lower: true });
                brandDraft.variants[variantId] = produce(variant, (variantDraft) => {
                  variantDraft.title = variantTitle;
                });
              }
            }
          });
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
          actions={[
            {
              icon: AddBox,
              onClick: () => history.push(`/products/${section}/${product.id}/brand/${brand.id}/variant`),
              isFreeAction: true,
              tooltip: 'Add variant',
            },
          ]}
          columns={[
            { title: 'Quantity', field: 'quantity' },
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
