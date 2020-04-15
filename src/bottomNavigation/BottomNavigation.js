import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {
    bottom: 0,
    position: "fixed",
    width: "100%",
  },
});

export const Navigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Groceries" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Recipes" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Schedule" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
};
