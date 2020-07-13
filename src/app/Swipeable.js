import React from 'react';
import SwipeableViews from 'react-swipeable-views';

export const Swipeable = (props) => {
  const containerRef = React.useRef();

  const onTransitionEnd = () => {
    containerRef.current.containerNode.parentNode.scrollTop = 0;
  };

  return (
    <SwipeableViews
      {...props}
      disabled
      style={{ height: '100%' }}
      ref={containerRef}
      onTransitionEnd={onTransitionEnd}
    >
      {props.children}
    </SwipeableViews>
  );
};
