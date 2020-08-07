import React, { useEffect } from 'react';
import { TextField, Grid, Select, MenuItem, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
// import { makeStyles } from '@material-ui/core/styles';
import { globalStateContext } from 'app/GlobalStateContext';
import { Loading } from 'app/Loading';
import { useHeader } from 'header/headerUtils';
import { useSave } from 'product/productBrand/productVariant/productVariantHooks';
import { useProducts } from 'product/productUtils';
import { addShop, updateShop, removeShop } from 'shop/shopUtils';
import { useFirestore } from 'storage/firebase';
import { useUser, useUserData, shops2Array } from 'user/userUtils';

export const ProductVariant = (props) => {
  const history = useHistory();
  const [products] = useProducts();
  const { shopId, productId, variantId } = useParams();
  const [userData] = useUserData();
  const product = products.find((p) => p.id === productId);
  const setHeader = useHeader(props.active);
  const { globalActions } = React.useContext(globalStateContext);
  const variant = (product && product.variants && product.variants[variantId]) || {
    title: '',
    rating: '',
    shop: '',
    price: '',
  };
  const { control, handleSubmit, getValues, setValue, reset } = useForm({ defaultValues: variant });
  const { refetch: save, isLoading: isSaving } = useSave({ ...getValues(), variantId }, variant);
  const shops = userData?.shops || {};
  const shopsArray = shops2Array(shops);
  const variantShops = variant.shops || {};

  // const handleRemove = (data) => {
  //   console.log('🛎 ', 'remove');
  // }

  useEffect(() => {
    if (!variant.title) return;
    Object.keys(variant).map((key) => {
      setValue(key, variant[key]);
    });
  }, [variant.title, setValue, variant]);

  useEffect(() => {
    setHeader({
      left: {
        icon: 'close',
        action: history.goBack,
      },
      right: [
        {
          title: 'Save',
          action: handleSubmit(save),
        },
      ],
      // menu: [{ title: 'Remove', action: handleRemove }],
    });
    if (!props.active) {
      reset();
    }
  }, [save, history, setHeader, props.active, handleSubmit, reset]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Controller
          as={
            <TextField
              label="Title"
              onFocus={() => globalActions.focusInput(true)}
              onBlur={() => globalActions.focusInput(false)}
              fullWidth
            />
          }
          name="title"
          control={control}
        />
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Shop</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(variantShops).map((id) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {shops[id].title}
              </TableCell>
              <TableCell align="right">{variantShops[id].price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell component="th" scope="row">
              <Controller
                as={
                  <Select label="Shop" options={shops}>
                    {shopsArray.map((shop) => (
                      <MenuItem value={shop.id || shop.value} key={shop.id || shop.value}>
                        {shop.title}
                      </MenuItem>
                    ))}
                  </Select>
                }
                name="shop"
                control={control}
              />
            </TableCell>
            <TableCell align="right">
              <Controller
                as={
                  <TextField
                    label="Price"
                    onFocus={() => globalActions.focusInput(true)}
                    onBlur={() => globalActions.focusInput(false)}
                    fullWidth
                    type="number"
                  />
                }
                name="price"
                control={control}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  );
};
