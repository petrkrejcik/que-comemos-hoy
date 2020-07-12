import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { globalStateContext } from 'app/GlobalStateContext';
import { useFirestore } from 'storage/firebase';
import { useUser, useUserData, shops2Array } from 'user/userUtils';
import { Loading } from 'app/Loading';
import { useHeader } from 'header/headerUtils';
import { addShop, updateShop, removeShop } from 'shop/shopUtils';
import { useSave } from 'product/productVariant/productVariantHooks';
import { useProducts } from 'product/productUtils';

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
  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: variant,
  });
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
  }, [variant.title, setValue]);

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
  }, [save, history, setHeader]);

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
      <Grid item xs={12}>
        <Controller
          as={
            <TextField
              label="Rating"
              onFocus={() => globalActions.focusInput(true)}
              onBlur={() => globalActions.focusInput(false)}
              fullWidth
            />
          }
          name="rating"
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
