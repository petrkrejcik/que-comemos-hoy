import React from 'react';
import SwipeableViews from 'react-swipeable-views';

export const Swipeable = (props) => {
  return (
    <SwipeableViews {...props} disabled>
      {props.children}
    </SwipeableViews>
  );
};
