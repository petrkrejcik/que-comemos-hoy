import React, { useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { globalStateContext } from 'app/GlobalStateContext';

export const Swipeable = (props) => {
  const { globalActions } = React.useContext(globalStateContext);
  useEffect(() => {
    globalActions.setBackIcon(props.backIcon);
  }, [props.backIcon, globalActions]);
  const { backIcon, ...swipeableProps } = props;

  return <SwipeableViews {...swipeableProps}>{props.children}</SwipeableViews>;
};
