import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Menu, Done, ArrowBack } from '@material-ui/icons';
import { Drawer } from 'drawer/Drawer';
import { globalStateContext } from 'app/GlobalStateContext';

export const Header = () => {
  const classes = useStyles();
  const { drawerState, globalState } = React.useContext(globalStateContext);
  const [, openDrawer] = drawerState;
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {globalState.backIcon ? (
            <IconButton
              onClick={history.goBack}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="back"
            >
              <ArrowBack />
            </IconButton>
          ) : (
            <IconButton
              onClick={openDrawer(true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}></Typography>
          {globalState.headerRightIcons.map((icon) => (
            <IconButton onClick={icon.callback} color="inherit" key={icon.icon}>
              {icon.icon === 'done' && <Done />}
            </IconButton>
          ))}
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
