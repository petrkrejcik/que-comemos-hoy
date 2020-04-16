import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useHistory } from 'react-router-dom';

export const Navigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        const route = pages[newValue].route;
        history.push(route);
        setValue(newValue);
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
    label: 'Products',
    route: '/products',
    icon: RestoreIcon,
  },
  {
    label: 'Recipes',
    route: '/recipes',
    icon: FavoriteIcon,
  },
  {
    label: 'Schedule',
    route: '/schedule',
    icon: LocationOnIcon,
  },
];
