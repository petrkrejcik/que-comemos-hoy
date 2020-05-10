import produce from 'immer';

export const configReducer = (state, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_DARK_THEME':
        draft.config.ui.theme = 'dark';
        break;
      default:
        return state;
    }
  });
};
