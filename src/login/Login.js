import React from 'react';
import { Button } from '@material-ui/core';
import { Dialog } from 'dialog/Dialog';
import { useLogin } from 'auth/Auth';

export const Login = () => {
  const [loginState, login] = useLogin();
  const [isErrorOpen, setErrorOpen] = React.useState(true);

  const handleCloseError = () => setErrorOpen(false);

  return (
    <>
      {loginState.error && (
        <Dialog handleClose={handleCloseError} open={isErrorOpen} title="Login error">
          {loginState.error.message}
        </Dialog>
      )}
      <Button onClick={login} color="primary" variant="outlined">
        Login via Google
      </Button>
    </>
  );
};
