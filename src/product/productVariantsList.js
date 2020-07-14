import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Typography, IconButton, Paper, Box } from '@material-ui/core';
import { Add } from '@material-ui/icons';

export const ProductVariantsList = (props) => {
  const history = useHistory();
  const { section } = useParams();

  return (
    <>
      <Typography variant="h6">Variants</Typography>

      <Grid container spacing={2}>
        {Object.keys(props.variants).map((key) => (
          <Grid item key={key}>
            <Paper
              onClick={() => history.push(`/products/${section}/${props.productId}/variant/${key}`)}
            >
              <Box p={2}>
                <Typography>{props.variants[key].title}</Typography>
                <Typography>
                  {props.variants[key].rating && `Rating: ${props.variants[key].rating}`}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
        <Grid item>
          <Paper onClick={() => history.push(`/products/${section}/${props.productId}/variant`)}>
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
