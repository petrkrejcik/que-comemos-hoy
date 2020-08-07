import React from 'react';
import { Grid, Typography, IconButton, Paper, Box } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { useProductBrand } from 'product/productHooks';

export const ProductVariantList = (props) => {
  const history = useHistory();
  const brand = useProductBrand();

  const { section, productId } = useParams();

  return (
    <>
      <Typography variant="h6">Variants</Typography>

      <Grid container spacing={2}>
        {Object.keys(brand.variants).map((key) => (
          <Grid item key={key}>
            <Paper onClick={() => history.push(`/products/${section}/${productId}/brand/${brand.id}/variant/${key}`)}>
              <Box p={2}>
                <Typography>{brand.variants[key].title}</Typography>
                <Typography>{brand.variants[key].rating && `Rating: ${brand.variants[key].rating}`}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
        <Grid item>
          <Paper
            onClick={() => {
              if (brand.id) {
                history.push(`/products/${section}/${productId}/brand/${brand.id}/variant`);
              } else {
                props.setSaveOptions({
                  onSuccess: (brandId) => {
                    history.push(`/products/${section}/${productId}/brand/${brandId}/variant`);
                  },
                });
              }
            }}
          >
            <Box p={2}>
              <IconButton aria-label="add variant">
                <Add />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
