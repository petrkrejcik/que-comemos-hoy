import React from 'react';
import { Dialog as MuiDialog, DialogTitle, DialogContent } from '@material-ui/core';

export const Dialog = (props) => {
  const { open, title, children, handleClose } = props;
  return (
    <MuiDialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
};
