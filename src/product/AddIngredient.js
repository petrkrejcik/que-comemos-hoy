import React from 'react';
import { Button, TextField, IconButton, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Add } from '@material-ui/icons';
import { updateIngredient, addIngredient, validateIngredient } from './ingredientUtils';
import { globalStateContext } from 'app/GlobalStateContext';

export const AddIngredient = (props) => {
  const [newIngredient, setNewIngredient] = React.useState('');
  const [isTypingNew, setIsTypingNew] = React.useState(false);
  const { userState, inputState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [, focusInput] = inputState;

  const clearInput = () => {
    setNewIngredient('');
    setIsTypingNew(false);
    focusInput(false);
  };

  const handleConfirmNew = async () => {
    if (!validateIngredient(newIngredient, props.ingredients)) return;
    addIngredient(newIngredient, user);
    clearInput();
  };

  const handleAutocompleteSelect = (event, ingredient, reason) => {
    if (reason !== 'select-option') return;
    if (!validateIngredient(ingredient, props.ingredients)) return;
    updateIngredient(ingredient, { available: false });
    clearInput();
  };

  const handleType = (e, newIngredient, reason) => {
    if (reason === 'clear') {
      clearInput();
      return;
    }
    setNewIngredient(newIngredient);
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item>
          <IconButton>
            <Add />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          {isTypingNew ? (
            <Autocomplete
              options={props.ingredients.filter(({ available }) => available)}
              getOptionLabel={(option) => option.title || option}
              freeSolo
              autoFocus
              inputValue={newIngredient}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add"
                  autoFocus
                  onFocus={() => focusInput(true)}
                  onBlur={() => focusInput(false)}
                />
              )}
              onInputChange={handleType}
              onChange={handleAutocompleteSelect}
              onClose={(event, reason) => {
                if (reason === 'select-option') return;
                handleConfirmNew();
              }}
            />
          ) : (
            <>
              <Button onClick={() => setIsTypingNew(true)} color="primary">
                Add ingredient
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
