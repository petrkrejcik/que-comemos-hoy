import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Checkbox, Grid, Chip, Button, Typography, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useUserData } from 'user/userUtils';

export const ProductList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { section } = useParams();
  const [userData] = useUserData();

  const handleProductClick = (product) => () => {
    history.push(`/products/${section}/${product.id}`);
  };

  const { shops = [] } = userData || {};

  return (
    <List disablePadding>
      {props.products.map((product) => (
        <Grid container alignItems="center" key={product.id} width={1}>
          <Grid item>
            <Checkbox checked={props.isChecked(product)} onChange={props.handleChecked(product)} />
          </Grid>
          <Grid item xs={7}>
            <Button onClick={handleProductClick(product)} className={classes.label} width={1}>
              <Typography noWrap>{product.title}</Typography>
            </Button>
          </Grid>
          <Grid item container xs={3} justify="flex-end">
            <Grid item>
              {product.shop && shops[product.shop] ? (
                <Chip label={shops[product.shop].title} />
              ) : (
                <span>&nbsp;</span>
              )}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </List>
  );
};

const useStyles = makeStyles({
  label: {
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
});
