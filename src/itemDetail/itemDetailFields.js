import React from 'react';
import { FormControlLabel, Checkbox, Grid, InputLabel, Select, MenuItem } from '@material-ui/core';

export const ItemDetailCheckbox = (props) => (
  <FormControlLabel
    control={<Checkbox checked={!!props.value} onChange={() => props.onChange(!props.value)} />}
    {...props}
  />
);

export const ItemDetailSelect = (props) => (
  <Grid container alignItems="center" justify="space-between">
    <Grid item xs={7}>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.options.map((option) => (
          <MenuItem value={option.id || option.value} key={option.id || option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </Grid>
    {/* <Grid item>
      <Link to={`/products/${props.productId}/shops`} style={{ textDecoration: 'none' }}>
        <Button color="primary">Manage shops</Button>
      </Link>
    </Grid> */}
  </Grid>
);
