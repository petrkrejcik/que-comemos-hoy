import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {
  updateIngredient,
  addIngredient,
  validateIngredient,
  useProducts,
  isOnShoppingList,
  toggleIsOnShoppingList,
} from './productUtils';
import { globalStateContext } from 'app/GlobalStateContext';

export const ProductAutocomplete = (props) => {
  const classes = useStyles();
  const [products] = useProducts();
  const [title, setTitle] = React.useState(props.edit?.title || '');
  const { userState, globalActions } = React.useContext(globalStateContext);
  const [user] = userState;

  const clearInput = () => {
    setTitle('');
    globalActions.focusInput(false);
    props.onAfterEdit && props.onAfterEdit();
  };

  const handleConfirmNew = async () => {
    if (!validateIngredient(title, products)) return;
    if (props.edit) {
      updateIngredient(props.edit, user, { title });
    } else {
      addIngredient(title, user);
    }
    clearInput();
  };

  const handleAutocompleteSelect = (event, product, reason) => {
    if (reason !== 'select-option') return;
    if (!validateIngredient(product, products)) return;
    const updated = toggleIsOnShoppingList(product);
    updateIngredient(product, user, updated);
    clearInput();
  };

  const handleType = (e, text, reason) => {
    if (reason === 'reset') return; // initial reset
    if (reason === 'clear') {
      clearInput();
      return;
    }
    setTitle(text);
  };

  const handleBlur = () => {
    const isTitleEdited = props.edit && props.edit.title !== title;
    if (title && isTitleEdited) return;
    clearInput();
  };

  return (
    <Autocomplete
      freeSolo
      clearOnEscape
      inputValue={title}
      classes={classes}
      options={products.filter(isOnShoppingList(false))}
      getOptionLabel={(option) => option.title || option}
      onInputChange={handleType}
      onChange={handleAutocompleteSelect}
      style={props.style || {}}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus
          InputProps={{ ...params.InputProps, disableUnderline: true }}
          onFocus={() => globalActions.focusInput(true)}
          onBlur={handleBlur}
        />
      )}
      onClose={(event, reason) => {
        if (reason === 'select-option') return;
        handleConfirmNew();
      }}
    />
  );
};

const useStyles = makeStyles({
  clearIndicator: {
    visibility: 'visible',
  },
  root: {},
});
