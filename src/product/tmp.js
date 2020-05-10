export const configReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DARK_THEME':
      return {
        ...state,
        config: {
          ...state.config,
          ui: {
            ...state.config.ui,
            theme: 'dark',
          },
        },
      };
    default:
      return state;
  }
};
