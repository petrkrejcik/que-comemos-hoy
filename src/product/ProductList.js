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
              {props.shopChip && <ShopChip product={product} shops={shops} />}
              {props.icon && <props.icon />}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </List>
  );
};

export const ShopChip = (props) =>
  props.product.shop && props.shops[props.product.shop] ? (
    <Chip label={props.shops[props.product.shop].title} />
  ) : (
    <span>&nbsp;</span>
  );

const useStyles = makeStyles({
  label: {
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
});
