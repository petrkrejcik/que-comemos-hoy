import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory, useLocation } from 'react-router-dom';
import { globalStateContext } from 'app/GlobalStateContext';

export const Navigation = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { globalState } = React.useContext(globalStateContext);

  const value = props.pages.findIndex(({ route }) => {
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
          const route = props.pages[newValue].route;
          history.push(route);
        }}
        showLabels
        className={classes.root}
      >
        {props.pages.map((page) => (
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
    height: 56,
  },
});
