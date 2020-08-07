// import React, { useEffect } from 'react';
// import {
//   TextField,
//   Grid,
//   InputLabel,
//   Select as SelectMui,
//   MenuItem,
//   FormControlLabel,
//   Checkbox,
//   Typography,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
// } from '@material-ui/core';
// import { Add } from '@material-ui/icons';
// import { useHistory, useParams } from 'react-router-dom';
// import { useAsyncFn, useMap } from 'react-use';
// import { globalStateContext } from 'app/GlobalStateContext';
// import { Loading } from 'app/Loading';
// import { useHeader } from 'header/headerUtils';
// import { ProductVariantsList } from 'product/productBrand/productVariant/productVariantList';
// import { useFirestore } from 'storage/firebase';
// import { useUser, shops2Array, useUserData } from 'user/userUtils';
// import {
//   updateIngredient,
//   removeProduct,
//   FROZEN_STATES,
//   isOnShoppingList,
//   toggleIsOnShoppingList,
//   setAvailability,
//   isFrozen,
//   isAvailable,
//   useProducts,
// } from './productUtils';

// export const Product = (props) => {
//   const history = useHistory();
//   const { section } = useParams();
//   // const classes = useStyles();
//   const setHeader = useHeader(props.active);
//   const [products] = useProducts();
//   const db = useFirestore();
//   const { productId } = props;
//   const product = products.find((p) => p.id === productId);
//   const [titleError, setTitleError] = React.useState(null);
//   const { globalActions } = React.useContext(globalStateContext);
//   const user = useUser();
//   const [userData] = useUserData();
//   const [productMap, { set, setAll }] = useMap(null);
//   const variants = (product && product.variants) || {};
//   // const [{ loading }, handleSave] = useUpdateIngredient(productMap);

//   useEffect(() => {
//     if (!product) return;
//     setAll(product);
//   }, [product, setAll]);

//   const [{ loading }, handleSave] = useAsyncFn(async () => {
//     const { id, insertDate, ...updated } = productMap;
//     await updateIngredient(db, product, user, updated);
//     history.goBack();
//   }, [productMap, user, history]);

//   const [{ loading: removeLoading }, handleRemove] = useAsyncFn(async () => {
//     await removeProduct(db, product.id, user);
//     history.goBack();
//   }, [product, user]);

//   useEffect(() => {
//     setHeader({
//       left: {
//         icon: 'close',
//         action: history.goBack,
//       },
//       right: [
//         {
//           title: 'Save',
//           action: handleSave,
//         },
//       ],
//       menu: [{ title: 'Remove', action: handleRemove }],
//     });
//   }, [handleSave, handleRemove, history, setHeader]);

//   const handleTitleChange = (event) => {
//     setTitleError(null);
//     const newTitle = event.target.value;
//     set('title', newTitle);
//     const exists = products.find((p) => p.title === newTitle);
//     exists && setTitleError('Already exists');
//     newTitle.trim() === '' && setTitleError('Cannot be empty');
//   };

//   if (!productMap) return null;
//   if ((loading, removeLoading)) return <Loading />;
//   const shops = shops2Array(userData?.shops || {});

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <TitleInput
//           title={productMap.title}
//           titleError={titleError}
//           handleTitleChange={handleTitleChange}
//           focusInput={globalActions.focusInput}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <Select
//           label={'Shop'}
//           value={productMap.shop || ''}
//           options={shops}
//           handleChange={(value) => set('shop', value)}
//           productId={productId}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <Select
//           label={'Frozen'}
//           value={getFrozenValue(productMap)}
//           options={frozenOptions}
//           handleChange={(value) => setAll(setAvailability(productMap, value))}
//           productId={productId}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={isOnShoppingList(true)(productMap)}
//               onChange={() => setAll(toggleIsOnShoppingList(productMap))}
//             />
//           }
//           label="On shopping list"
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <ProductVariantsList variants={variants} productId={productId} />
//       </Grid>
//     </Grid>
//   );
// };

// const TitleInput = (props) => (
//   <TextField
//     value={props.title}
//     label="Product title"
//     error={!!props.titleError}
//     helperText={props.titleError}
//     onChange={props.handleTitleChange}
//     onFocus={() => props.focusInput(true)}
//     onBlur={() => props.focusInput(false)}
//     fullWidth
//   />
// );

// const Select = (props) => (
//   <Grid container alignItems="center" justify="space-between">
//     <Grid item xs={7}>
//       <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
//       <SelectMui
//         labelId="demo-simple-select-label"
//         id="demo-simple-select"
//         fullWidth
//         value={props.value}
//         onChange={(e) => props.handleChange(e.target.value)}
//       >
//         {props.options.map((option) => (
//           <MenuItem value={option.id || option.value} key={option.id || option.value}>
//             {option.title}
//           </MenuItem>
//         ))}
//       </SelectMui>
//     </Grid>
//     {/* <Grid item>
//       <Link to={`/products/${props.productId}/shops`} style={{ textDecoration: 'none' }}>
//         <Button color="primary">Manage shops</Button>
//       </Link>
//     </Grid> */}
//   </Grid>
// );

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
