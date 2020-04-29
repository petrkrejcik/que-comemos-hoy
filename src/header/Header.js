import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Menu, MenuItem, Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Menu as MenuIcon, Done, ArrowBack, Close, MoreVert } from '@material-ui/icons';
import { Drawer } from 'drawer/Drawer';
import { globalStateContext } from 'app/GlobalStateContext';

export const Header = () => {
  const classes = useStyles();
  const { drawerState, globalState } = React.useContext(globalStateContext);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [, openDrawer] = drawerState;

  const handleMenuClick = (e) => {
    setMenuAnchor(e.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {globalState.headerLeftIcon ? (
            <IconButton
              onClick={globalState.headerLeftIcon.action}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label={globalState.headerLeftIcon.icon}
            >
              {globalState.headerLeftIcon.icon === 'close' && <Close />}
              {globalState.headerLeftIcon.icon === 'back' && <ArrowBack />}
            </IconButton>
          ) : (
            <IconButton
              onClick={openDrawer(true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}></Typography>
          {globalState.headerRightButtons &&
            globalState.headerRightButtons.map((button) =>
              button.icon ? (
                <IconButton onClick={button.action} color="inherit" key={button.icon}>
                  {button.icon === 'done' && <Done />}
                </IconButton>
              ) : button.title ? (
                <Button color="inherit" onClick={button.action} key={button.title}>
                  {button.title}
                </Button>
              ) : null
            )}
          {globalState.headerMenu && (
            <>
              <IconButton onClick={handleMenuClick} color="inherit" key="menu">
                <MoreVert />
              </IconButton>
              <Menu anchorEl={menuAnchor} keepMounted open={!!menuAnchor} onClose={handleMenuClose}>
                {globalState.headerMenu.map((item) => (
                  <MenuItem
                    key={item.title}
                    onClick={() => {
                      item.action();
                      handleMenuClose();
                    }}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer />
    </div>
  );
};

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
