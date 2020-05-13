import React, { useEffect } from 'react';
import { useAsyncFn, useMap } from 'react-use';
import { useHistory, Link } from 'react-router-dom';
import {
  Button,
  TextField,
  IconButton,
  Grid,
  InputLabel,
  Select as SelectMui,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  updateIngredient,
  removeProduct,
  FROZEN_STATES,
  isOnShoppingList,
  toggleIsOnShoppingList,
  setAvailability,
  isFrozen,
  isAvailable,
  useProducts,
} from './productUtils';
import { globalStateContext } from 'app/GlobalStateContext';
import { userContext } from 'user/UserProvider';
import { Loading } from 'app/Loading';
import { useHeader } from 'header/headerUtils';
import { useUserData, shops2Array } from 'user/userUtils';

export const Product = (props) => {
  const history = useHistory();
  // const classes = useStyles();
  const setHeader = useHeader(props.active);
  const [products] = useProducts();
  const { productId } = props;
  const product = products.find((p) => p.id === productId);
  const [titleError, setTitleError] = React.useState(null);
  const { globalActions } = React.useContext(globalStateContext);
  const [{ user }] = React.useContext(userContext);
  const [userData] = useUserData();
  const [productMap, { set, setAll }] = useMap(null);

  useEffect(() => {
    if (!product) return;
    setAll(product);
  }, [product, setAll]);

  const [{ loading }, handleSave] = useAsyncFn(async () => {
    const { id, insertDate, ...updated } = productMap;
    await updateIngredient(product, user, updated);
    history.goBack();
  }, [productMap, user, history]);

  const [{ loading: removeLoading }, handleRemove] = useAsyncFn(async () => {
    await removeProduct(product.id, user);
    history.goBack();
  }, [product, user]);

  useEffect(() => {
    setHeader({
      left: {
        icon: 'close',
        action: history.goBack,
      },
      right: [
        {
          title: 'Save',
          action: handleSave,
        },
      ],
      menu: [{ title: 'Remove', action: handleRemove }],
    });
  }, [handleSave, handleRemove, history, setHeader]);

  const handleTitleChange = (event) => {
    setTitleError(null);
    const newTitle = event.target.value;
    set('title', newTitle);
    const exists = products.find((p) => p.title === newTitle);
    exists && setTitleError('Already exists');
    newTitle.trim() === '' && setTitleError('Cannot be empty');
  };

  if (!productMap) return null;
  if ((loading, removeLoading)) return <Loading />;
  const shops = shops2Array(userData?.shops || {});

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TitleInput
          title={productMap.title}
          titleError={titleError}
          handleTitleChange={handleTitleChange}
          focusInput={globalActions.focusInput}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          label={'Shop'}
          value={productMap.shop || ''}
          options={shops}
          handleChange={(value) => set('shop', value)}
          productId={productId}
        />
      </Grid>
      <Grid item xs={12}>
        <Select
          label={'Frozen'}
          value={getFrozenValue(productMap)}
          options={frozenOptions}
          handleChange={(value) => setAll(setAvailability(productMap, value))}
          productId={productId}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isOnShoppingList(true)(productMap)}
              onChange={() => setAll(toggleIsOnShoppingList(productMap))}
            />
          }
          label="On shopping list"
        />
      </Grid>
    </Grid>
  );
};

const TitleInput = (props) => (
  <TextField
    value={props.title}
    label="Product title"
    error={!!props.titleError}
    helperText={props.titleError}
    onChange={props.handleTitleChange}
    onFocus={() => props.focusInput(true)}
    onBlur={() => props.focusInput(false)}
    fullWidth
  />
);

const Select = (props) => (
  <Grid container alignItems="center" justify="space-between">
    <Grid item xs={7}>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <SelectMui
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth
        value={props.value}
        onChange={(e) => props.handleChange(e.target.value)}
      >
        {props.options.map((option) => (
          <MenuItem value={option.id || option.value} key={option.id || option.value}>
            {option.title}
          </MenuItem>
        ))}
      </SelectMui>
    </Grid>
    {/* <Grid item>
      <Link to={`/products/${props.productId}/shops`} style={{ textDecoration: 'none' }}>
        <Button color="primary">Manage shops</Button>
      </Link>
    </Grid> */}
  </Grid>
);

const useStyles = makeStyles({});

const getFrozenValue = (product) => {
  const frozen = isFrozen(product);
  return frozen
    ? isAvailable(product)
      ? FROZEN_STATES.both
      : FROZEN_STATES.yes
    : FROZEN_STATES.no;
};

const frozenOptions = [
  {
    title: 'No',
    value: FROZEN_STATES.no,
  },
  {
    title: 'Yes',
    value: FROZEN_STATES.yes,
  },
  {
    title: 'Both',
    value: FROZEN_STATES.both,
  },
];
