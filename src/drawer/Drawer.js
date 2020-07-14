import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Divider, SwipeableDrawer } from '@material-ui/core';
import { useLogout } from 'user/userUtils';
import { globalStateContext } from 'app/GlobalStateContext';
import { useUser } from 'user/userUtils';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export const Drawer = (props) => {
  const classes = useStyles();
  const logout = useLogout();
  const user = useUser();
  const { drawerState } = React.useContext(globalStateContext);
  const [drawerOpened, openDrawer] = drawerState;

  return (
    <SwipeableDrawer
      open={drawerOpened}
      onClose={openDrawer(false)}
      onOpen={openDrawer(true)}
      className={classes.root}
    >
      <List>
        {user && (
          <>
            <ListItem>
              <ListItemText>{user.email}</ListItemText>
            </ListItem>
            <Divider />
          </>
        )}
        <ListItem button>
          {user && (
            <ListItemText>
              <Link to="/members" style={{ textDecoration: 'none' }}>
                Members
              </Link>
            </ListItemText>
          )}
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link to="/shops" style={{ textDecoration: 'none' }}>
              Shops
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link to="/recipes" style={{ textDecoration: 'none' }}>
              Recipes
            </Link>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>{user && <ListItemText primary="Logout" onClick={logout} />}</ListItem>
      </List>
    </SwipeableDrawer>
  );
};
