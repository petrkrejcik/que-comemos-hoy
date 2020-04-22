import React from 'react';
import { Snackbar as SnackbarMui } from '@material-ui/core';
import { globalStateContext } from 'app/GlobalStateContext';

export const Snackbar = () => {
  const { snackbar } = React.useContext(globalStateContext);
  const [snackbarObject, setSnackbar] = snackbar;
  const { message } = snackbarObject || {};
  return (
    <SnackbarMui
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!snackbarObject}
      autoHideDuration={3000}
      onClose={() => setSnackbar(null)}
      message={message}
      // action={
      //   <React.Fragment>
      //     <Button color="secondary" size="small" onClick={handleClose}>
      //       UNDO
      //     </Button>
      //     <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      //       <CloseIcon fontSize="small" />
      //     </IconButton>
      //   </React.Fragment>
      // }
    />
  );
};

export const useSnackbar = () => {
  const { snackbar } = React.useContext(globalStateContext);
  const [, setSnackbar] = snackbar;
  return setSnackbar;
};
