import React from 'react';
import { Box } from '@material-ui/core';
import { Header } from 'header/Header';
import { Navigation } from 'bottomNavigation/BottomNavigation';

export const Shell = (props) => {
  return (
    <>
      <Header />
      <Box mt={2} style={{ height: 'calc(100% - (56px + 56px + 16px + 3px))' }}>
        {props.children}
      </Box>
      {props.bottomNavigation && <Navigation pages={props.bottomNavigation} />}
    </>
  );
};
