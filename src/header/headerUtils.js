import React from 'react';
import { globalStateContext } from 'app/GlobalStateContext';

export const useHeader = (isActive) => {
  const { globalActions } = React.useContext(globalStateContext);

  const setHeader = React.useCallback(
    (icons) => {
      if (!isActive) return;
      globalActions.resetHeader();
      icons.right && globalActions.setHeaderRightButtons(icons.right);
      icons.menu && globalActions.setHeaderMenu(icons.menu);
      icons.left && globalActions.setHeaderLeftIcon(icons.left);
    },
    [globalActions, isActive]
  );
  return setHeader;
};
