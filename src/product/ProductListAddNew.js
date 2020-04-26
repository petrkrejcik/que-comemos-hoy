import React from 'react';
import { Button, IconButton, Grid } from '@material-ui/core';
import { Add as AddIcon, CheckBoxOutlineBlank } from '@material-ui/icons';
import { ProductAutocomplete } from './ProductAutocomplete';

export const AddNew = (props) => {
  const [isAddingNew, setIsAdding] = React.useState(false);

  return isAddingNew ? (
    <Grid container alignItems="center">
      <IconButton>
        <CheckBoxOutlineBlank />
      </IconButton>
      <ProductAutocomplete ingredients={props.ingredients} onAfterEdit={() => setIsAdding(false)} />
    </Grid>
  ) : (
    <AddNewButton onClick={() => setIsAdding(true)} />
  );
};

const AddNewButton = (props) => {
  return (
    <Grid container>
      <Grid item>
        <IconButton>
          <AddIcon />
        </IconButton>
      </Grid>
      <Button onClick={props.onClick} color="primary">
        Add ingredient
      </Button>
    </Grid>
  );
};
