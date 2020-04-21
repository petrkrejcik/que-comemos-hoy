import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const value = pages.findIndex(({ route }) => {
    if (route === '/') {
      return location.pathname === '/';
    }
    return location.pathname.indexOf(route) >= 0;
  });

  return (
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
    label: 'Ingredients',
    route: '/products',
    icon: RestoreIcon,
  },
  {
    label: 'Recipes',
    route: '/recipes',
    icon: FavoriteIcon,
  },
  // {
  //   label: 'Schedule',
  //   route: '/schedule',
  //   icon: LocationOnIcon,
  // },
];
