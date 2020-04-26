import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog } from 'dialog/Dialog';
import { useLogin } from 'auth/Auth';
import { globalStateContext } from 'app/GlobalStateContext';
import { Loading } from 'app/Loading';

export const Login = () => {
  const classes = useStyles();
  const [loginState, login] = useLogin();
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [isErrorOpen, setErrorOpen] = React.useState(true);

  const handleCloseError = () => setErrorOpen(false);

  if (user) {
    return <Redirect to="/products" />;
  }

  return (
    <>
      {loginState.error && (
        <Dialog handleClose={handleCloseError} open={isErrorOpen} title="Login error">
          {loginState.error.message}
        </Dialog>
      )}
      <Grid container justify="center" alignItems="center" className={classes.container}>
        <Grid item>
          {loginState.loading ? (
            <Loading />
          ) : (
            <Button onClick={login} color="primary" variant="outlined">
              Login via Google
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    minHeight: 'calc(100vh - 56px)',
  },
  backdrop: {
    color: '#fff',
  },
});
