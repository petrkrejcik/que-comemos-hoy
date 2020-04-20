import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Divider, SwipeableDrawer } from '@material-ui/core';
import { useLogin, useLogout } from 'auth/Auth';
import { globalStateContext } from 'app/GlobalStateContext';
import { Dialog } from 'dialog/Dialog';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export const Drawer = (props) => {
  const classes = useStyles();
  const logout = useLogout();
  const [loginState, login] = useLogin();
  const { userState, drawerState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [drawerOpened, openDrawer] = drawerState;
  const [isErrorOpen, setErrorOpen] = React.useState(true);

  const handleCloseError = () => setErrorOpen(false);

  return (
    <SwipeableDrawer
      open={drawerOpened}
      onClose={openDrawer(false)}
      onOpen={openDrawer(true)}
      className={classes.root}
    >
      <List>
        {loginState.error && (
          <Dialog handleClose={handleCloseError} open={isErrorOpen} title="Login error">
            {loginState.error.message}
          </Dialog>
        )}
        <ListItem button>
          {user ? (
            <ListItemText primary="Logout" onClick={logout} />
          ) : (
            <ListItemText primary="Login" onClick={login} />
          )}
        </ListItem>
        <Divider />
      </List>
    </SwipeableDrawer>
  );
};
