import React from 'react';
import { List, ListItem, ListItemText, Divider, Drawer as DrawerMui } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { globalStateContext } from 'app/GlobalStateContext';
import { useLogout } from 'user/userUtils';
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
    <DrawerMui open={drawerOpened} onClose={openDrawer(false)} className={classes.root}>
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
              <Link to="/products" style={{ textDecoration: 'none' }}>
                Products
              </Link>
            </ListItemText>
          )}
        </ListItem>
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
    </DrawerMui>
  );
};
