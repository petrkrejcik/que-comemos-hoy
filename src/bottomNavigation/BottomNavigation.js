import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { AcUnit, ShoppingCart } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { globalStateContext } from 'app/GlobalStateContext';

export const Navigation = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { globalState } = React.useContext(globalStateContext);

  const value = pages.findIndex(({ route }) => {
    if (route === '/') {
      return location.pathname === '/';
    }
    return location.pathname.indexOf(route) >= 0;
  });

  if (!globalState.bottomNavigationVisible) return null;

  return (
    <Paper variant="outlined">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          const route = pages[newValue].route;
          history.push(route);
        }}
        showLabels
        className={classes.root}
      >
        {pages.map((page) => (
          <BottomNavigationAction label={page.label} icon={<page.icon />} key={page.route} />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

const useStyles = makeStyles({
  root: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
});

const pages = [
  {
    label: 'Shopping list',
    route: '/products/shopping-list',
    icon: ShoppingCart,
  },
  {
    label: 'Frozen',
    route: '/products/frozen',
    icon: AcUnit,
  },
  // {
  //   label: 'Schedule',
  //   route: '/schedule',
  //   icon: LocationOnIcon,
  // },
];
