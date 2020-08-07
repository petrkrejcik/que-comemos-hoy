import React from 'react';
// import { useLongPress } from 'react-use';
import {
  Grid,
  Box,
  IconButton,
  ExpansionPanel as MuiExpansionPanel,
  ExpansionPanelSummary as MuiExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { KeyboardArrowRight, KeyboardArrowDown } from '@material-ui/icons';
import { useHeader } from 'header/headerUtils';
import { ProductList } from 'product/ProductList';
import { AddNew } from './ProductListAddNew';

export const ToggleList = (props) => {
  const classes = useStyles();
  const setHeader = useHeader(props.active);
  const [isBottomProductsVisible, setIsBottomProductsVisible] = React.useState(false);
  // const [hoveredId, setHoveredId] = React.useState(null);
  // const longPress = useLongPress((e) => {
  //   console.log('🛎 ', 'e', e.target);
  //   // setHoveredId()
  // });
  const handleExpand = (event, isExpanded) => {
    setIsBottomProductsVisible(isExpanded);
  };

  React.useEffect(() => {
    setHeader({});
  }, [setHeader]);

  return (
    <Box>
      <Box width={1}>
        <ProductList
          products={props.topProducts}
          isChecked={props.isChecked}
          handleChecked={props.handleChecked}
          shopChip={!!props.topProductsShopChip}
          icon={props.topProductsIcon}
        />
      </Box>

      {props.addNew && <AddNew />}

      <Divider />

      {props.bottomProducts.length > 0 && (
        <ExpansionPanel elevation={0} onChange={handleExpand} style={{ width: '100%' }}>
          <ExpansionPanelSummary className={classes.summary}>
            <Grid container alignItems="center">
              <Grid item>
                <IconButton style={{ padding: 9 }}>
                  {isBottomProductsVisible ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                </IconButton>
              </Grid>
              <Grid item xs={10}>
                <Box pl={'8px'}>
                  {props.bottomProducts.length} {props.expansionPanelTitle}
                </Box>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            <Box width={1}>
              <ProductList
                products={props.bottomProducts}
                isChecked={props.isChecked}
                handleChecked={props.handleChecked}
              />
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </Box>
  );
};

const useStyles = makeStyles({
  label: {
    textTransform: 'none',
    justifyContent: 'flex-start',
  },
  root: {
    position: 'fixed',
  },
  expansionPanelDetails: {
    padding: 0,
  },
  summary: { padding: 0 },
});

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);
