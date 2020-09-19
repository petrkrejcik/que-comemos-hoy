import React from 'react';
import { Grid, Typography, IconButton, Paper, Box } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { useProduct } from 'product/productHooks';

// Deprecated - remove
export const ProductBrandList = (props) => {
  const history = useHistory();
  const { section } = useParams();
  const product = useProduct();

  return (
    <>
      <Typography variant="h6">Brands</Typography>

      <Grid container spacing={2}>
        {product.brandsByTitle.map((id) => (
          <Grid item key={id}>
            <Paper onClick={() => history.push(`/products/${section}/${product.id}/brand/${id}`)}>
              <Box p={2}>
                <Typography>{product.brands[id].title}</Typography>
                <Typography>{product.brands[id].rating && `Rating: ${product.brands[id].rating}`}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
        <Grid item>
          <Paper onClick={() => history.push(`/products/${section}/${product.id}/brand`)}>
            <Box p={2}>
              <IconButton aria-label="add brand">
                <Add />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
