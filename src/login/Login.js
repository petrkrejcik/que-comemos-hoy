import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { firebase } from 'storage/firebase';
import { Dialog } from 'dialog/Dialog';
import { userContext } from 'user/UserProvider';
import { Loading } from 'app/Loading';

export const Login = () => {
  const classes = useStyles();
  const [{ user }] = React.useContext(userContext);
  const [isErrorOpen, setErrorOpen] = React.useState(true);
  const [oAuth, login] = useAsyncFn(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise(async (resolve, reject) => {
      try {
        await firebase.auth().signInWithPopup(provider);
        // Do not call resolve, because we want the loader to be displayed.
        // Loader will be hidden by onAuthStateChanged.
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  const handleCloseError = () => setErrorOpen(false);

  if (user) {
    return <Redirect to="/products/shopping-list" />;
  }

  return (
    <>
      {oAuth.error && (
        <Dialog handleClose={handleCloseError} open={isErrorOpen} title="Login error">
          {oAuth.error.message}
        </Dialog>
      )}
      <Grid container justify="center" alignItems="center" className={classes.container}>
        <Grid item>
          {oAuth.loading || user !== null ? (
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
