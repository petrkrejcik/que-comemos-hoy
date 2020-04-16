import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useLogin, useLogout } from 'auth/Auth';
import { globalStateContext } from 'app/GlobalStateContext';
import { Dialog } from 'dialog/Dialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = () => {
  const logout = useLogout();
  const [loginState, login] = useLogin();
  const { userState } = React.useContext(globalStateContext);
  const [user] = userState;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isErrorOpen, setErrorOpen] = React.useState(true);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseError = () => setErrorOpen(false);

  return (
    <div className={classes.root}>
      {loginState.error && (
        <Dialog handleClose={handleCloseError} open={isErrorOpen} title="Login error">
          {loginState.error.message}
        </Dialog>
      )}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          {user ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button onClick={login}>Login</Button>
            // <Login />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
