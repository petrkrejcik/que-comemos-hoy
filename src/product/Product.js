import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { useHistory, Link } from 'react-router-dom';
import {
  Button,
  TextField,
  IconButton,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  updateIngredient,
  addIngredient,
  validateIngredient,
  removeProduct,
} from './ingredientUtils';
import { globalStateContext } from 'app/GlobalStateContext';
import { Loading } from 'app/Loading';
import { useHeader } from 'header/headerUtils';

export const Product = (props) => {
  const history = useHistory();
  // const classes = useStyles();
  const setHeader = useHeader(props.active);
  const { productId, products, shops } = props;
  const product = products.find((p) => p.id === productId);
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState(null);
  const { userState, globalActions } = React.useContext(globalStateContext);
  const [user] = userState;
  const [shop, setShop] = React.useState('');

  useEffect(() => {
    if (!product) return;
    setTitle(product.title);
    setShop(product.shop || '');
  }, [product]);

  const [{ loading }, handleSave] = useAsyncFn(async () => {
    await updateIngredient(product, user, { title, shop });
    history.goBack();
  }, [product, user, title, shop, history]);

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
    setTitle(newTitle);
    const exists = products.find((p) => p.title === newTitle);
    exists && setTitleError('Already exists');
    newTitle.trim() === '' && setTitleError('Cannot be empty');
  };

  if ((loading, removeLoading)) return <Loading />;

  return (
    <Grid container>
      <Grid item xs={12}>
        <TitleInput
          title={title}
          titleError={titleError}
          handleTitleChange={handleTitleChange}
          focusInput={globalActions.focusInput}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectShop value={shop} options={shops} handleChange={setShop} productId={productId} />
      </Grid>
    </Grid>
  );
};

const TitleInput = (props) => (
  <TextField
    value={props.title}
    label="Product"
    error={!!props.titleError}
    helperText={props.titleError}
    onChange={props.handleTitleChange}
    onFocus={() => props.focusInput(true)}
    onBlur={() => props.focusInput(false)}
    fullWidth
  />
);

const SelectShop = (props) => (
  <Grid container alignItems="center" justify="space-between">
    <Grid item xs={7}>
      <InputLabel id="demo-simple-select-label">Shop</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth
        value={props.value}
        onChange={(e) => props.handleChange(e.target.value)}
      >
        {props.options.map((option) => (
          <MenuItem value={option.id} key={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </Grid>
    {/* <Grid item>
      <Link to={`/products/${props.productId}/shops`} style={{ textDecoration: 'none' }}>
        <Button color="primary">Manage shops</Button>
      </Link>
    </Grid> */}
  </Grid>
);

const useStyles = makeStyles({});
