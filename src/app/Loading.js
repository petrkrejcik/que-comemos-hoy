import React from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const Loading = () => {
  const classes = useStyles();

  return createPortal(
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </Backdrop>,
    document.body
  );
};

const useStyles = makeStyles({
  backdrop: {
    color: '#fff',
    zIndex: 1101,
  },
});
