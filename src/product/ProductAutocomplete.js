import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { globalStateContext } from 'app/GlobalStateContext';
import { useProduct } from 'product/productHooks';
import {
  updateIngredient,
  validateIngredient,
  useProducts,
  isOnShoppingList,
  toggleIsOnShoppingList,
  upsert,
} from 'product/productUtils';
import { useFirestore } from 'storage/firebase';
import { useUser } from 'user/userUtils';

export const ProductAutocomplete = (props) => {
  const classes = useStyles();
  const [products] = useProducts();
  const emptyProduct = useProduct();
  const db = useFirestore();
  const [title, setTitle] = React.useState(props.edit?.title || '');
  const { globalActions } = React.useContext(globalStateContext);
  const user = useUser();

  const clearInput = () => {
    setTitle('');
    globalActions.focusInput(false);
    props.onAfterEdit && props.onAfterEdit();
  };

  const handleConfirmNew = async () => {
    if (!validateIngredient(title, products)) return;
    upsert(db, user)({ ...emptyProduct, title })();
    // if (props.edit) {
    //   updateIngredient(db, props.edit, user, { title });
    // } else {
    //   addIngredient(db, title, user);
    // }
    clearInput();
  };

  const handleAutocompleteSelect = (event, product, reason) => {
    if (reason !== 'select-option') return;
    if (!validateIngredient(product, products)) return;
    const updated = toggleIsOnShoppingList(product);
    updateIngredient(db, product, user, updated);
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
          inputProps={{ ...params.inputProps, autoCapitalize: 'sentences' }}
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
