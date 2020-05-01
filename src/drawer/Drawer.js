import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Divider, SwipeableDrawer } from '@material-ui/core';
import { useLogout } from 'auth/Auth';
import { globalStateContext } from 'app/GlobalStateContext';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export const Drawer = (props) => {
  const classes = useStyles();
  const logout = useLogout();
  const { userState, drawerState } = React.useContext(globalStateContext);
  const [user] = userState;
  const [drawerOpened, openDrawer] = drawerState;

  return (
    <SwipeableDrawer
      open={drawerOpened}
      onClose={openDrawer(false)}
      onOpen={openDrawer(true)}
      className={classes.root}
    >
      <List>
        <ListItem>{user && <ListItemText>{user.email}</ListItemText>}</ListItem>
        <ListItem button>
          {user && (
            <ListItemText>
              <Link to="/members">Members</Link>
            </ListItemText>
          )}
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link to="/shops">Shops</Link>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>{user && <ListItemText primary="Logout" onClick={logout} />}</ListItem>
      </List>
    </SwipeableDrawer>
  );
};
