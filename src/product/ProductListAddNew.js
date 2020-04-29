import React from 'react';
import { Button, IconButton, Grid, Box } from '@material-ui/core';
import { Add as AddIcon, CheckBoxOutlineBlank } from '@material-ui/icons';
import { ProductAutocomplete } from './ProductAutocomplete';

export const AddNew = (props) => {
  const [isAddingNew, setIsAdding] = React.useState(false);

  return isAddingNew ? (
    <Grid container alignItems="center">
      <Grid item>
        <IconButton style={{ padding: 9 }}>
          <CheckBoxOutlineBlank />
        </IconButton>
      </Grid>
      <Grid item xs={10}>
        <ProductAutocomplete
          ingredients={props.ingredients}
          onAfterEdit={() => setIsAdding(false)}
          style={{ paddingLeft: 8 }}
        />
      </Grid>
    </Grid>
  ) : (
    <AddNewButton onClick={() => setIsAdding(true)}>Add ingredient</AddNewButton>
  );
};

export const AddNewButton = (props) => {
  return (
    <Grid container>
      <Grid item>
        <IconButton style={{ padding: 9 }}>
          <AddIcon />
        </IconButton>
      </Grid>
      <Button onClick={props.onClick} color="primary">
        {props.children}
      </Button>
    </Grid>
  );
};
