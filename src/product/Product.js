import React, { useEffect } from 'react';
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
import { Add, CheckBoxOutlineBlank } from '@material-ui/icons';
import { updateIngredient, addIngredient, validateIngredient } from './ingredientUtils';
import { globalStateContext } from 'app/GlobalStateContext';
import { AddIngredient } from './ProductAutocomplete';

export const Product = (props) => {
  const { productId, products } = props;
  const product = products.find((p) => p.id === productId);
  const classes = useStyles();
  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState(null);
  const { userState, globalActions } = React.useContext(globalStateContext);
  const [user] = userState;
  const [shop, setShop] = React.useState(20);

  useEffect(() => {
    if (!product) return;
    setTitle(product.title);
  }, [product]);

  const handleSave = React.useCallback(() => {
    updateIngredient(product, user, { title });
  }, [product, user, title]);

  useEffect(() => {
    const doneIcon = {
      icon: 'done',
      callback: handleSave,
    };
    globalActions.setHeaderRightIcons(product ? [doneIcon] : []);
  }, [globalActions, product, handleSave]);

  const handleTitleChange = (event) => {
    setTitleError(null);
    const newTitle = event.target.value;
    setTitle(newTitle);
    const exists = products.find((p) => p.title === newTitle);
    exists && setTitleError('Already exists');
    newTitle.trim() === '' && setTitleError('Cannot be empty');
  };

  return (
    <>
      <TitleInput
        title={title}
        titleError={titleError}
        handleTitleChange={handleTitleChange}
        focusInput={globalActions.focusInput}
      />
      <SelectShop value={shop} handleChange={setShop} />
    </>
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
  />
);

const SelectShop = (props) => (
  <>
    <InputLabel id="demo-simple-select-label">Shop</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={props.value}
      onChange={(e) => props.handleChange(e.target.value)}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </>
);

const useStyles = makeStyles({});
