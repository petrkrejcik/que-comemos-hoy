import React from 'react';
import { Button, IconButton, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
        <ProductAutocomplete onAfterEdit={() => setIsAdding(false)} style={{ paddingLeft: 8 }} />
      </Grid>
    </Grid>
  ) : (
    <AddNewButton onClick={() => setIsAdding(true)}>Add ingredient</AddNewButton>
  );
};

export const AddNewButton = (props) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item>
        <IconButton style={{ padding: 9 }}>
          <AddIcon />
        </IconButton>
      </Grid>
      {props.onClick ? (
        <Button onClick={props.onClick} color="primary" classes={classes}>
          {props.children}
        </Button>
      ) : (
        <Link to={props.to} style={{ textDecoration: 'none' }}>
          <Button color="primary" classes={classes}>
            {props.children}
          </Button>
        </Link>
      )}
    </Grid>
  );
};

const useStyles = makeStyles({
  label: {
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
});
