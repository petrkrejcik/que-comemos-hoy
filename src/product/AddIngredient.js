import React from 'react';
import { Button, TextField, IconButton, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Add, CheckBoxOutlineBlank } from '@material-ui/icons';
import { updateIngredient, addIngredient, validateIngredient } from './ingredientUtils';
import { globalStateContext } from 'app/GlobalStateContext';

export const AddIngredient = (props) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState(props.edit?.title || '');
  const [isTypingNew, setIsTypingNew] = React.useState(!!props.edit);
  const { userState, inputState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [, focusInput] = inputState;

  const clearInput = () => {
    setTitle('');
    setIsTypingNew(false);
    focusInput(false);
    props.onAfterEdit && props.onAfterEdit();
  };

  const handleConfirmNew = async () => {
    if (!validateIngredient(title, props.ingredients)) return;
    if (props.edit) {
      updateIngredient(props.edit, { title });
    } else {
      addIngredient(title, user);
    }
    clearInput();
  };

  const handleAutocompleteSelect = (event, ingredient, reason) => {
    if (reason !== 'select-option') return;
    if (!validateIngredient(ingredient, props.ingredients)) return;
    updateIngredient(ingredient, { available: false });
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
    <>
      <Grid container alignItems="center">
        {isTypingNew ? (
          <>
            <Grid item>
              <IconButton>
                <CheckBoxOutlineBlank />
              </IconButton>
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                freeSolo
                clearOnEscape
                inputValue={title}
                classes={classes}
                options={props.ingredients.filter(({ available }) => available)}
                getOptionLabel={(option) => option.title || option}
                onInputChange={handleType}
                onChange={handleAutocompleteSelect}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoFocus
                    onFocus={() => focusInput(true)}
                    onBlur={handleBlur}
                  />
                )}
                onClose={(event, reason) => {
                  if (reason === 'select-option') return;
                  handleConfirmNew();
                }}
              />
            </Grid>
            {/* {title && <AddRow onClick={() => setIsTypingNew(true)} />} */}
          </>
        ) : (
          <AddRow onClick={() => setIsTypingNew(true)} />
        )}
      </Grid>
    </>
  );
};

const AddRow = (props) => {
  return (
    <>
      <Grid item>
        <IconButton>
          <Add />
        </IconButton>
      </Grid>
      <Button onClick={props.onClick} color="primary">
        Add ingredient
      </Button>
    </>
  );
};

const useStyles = makeStyles({
  clearIndicator: {
    visibility: 'visible',
  },
});
