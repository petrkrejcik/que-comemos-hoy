export const initialState = {
  headerRightButtons: null,
  headerLeftIcon: null,
  bottomNavigationVisible: true,
};
export const actions = (state) => ({
  setHeaderRightButtons: (buttons) => {
    return { ...state, headerRightButtons: buttons };
  },
  setHeaderLeftIcon: (icon) => {
    return { ...state, headerLeftIcon: icon };
  },
  setHeaderMenu: (items) => {
    return { ...state, headerMenu: items };
  },
  resetHeader: () => {
    return { ...state, headerMenu: null, headerRightButtons: null, headerLeftIcon: null };
  },
  focusInput: (isFocused) => {
    return { ...state, inputFocused: isFocused, bottomNavigationVisible: !isFocused };
  },
});
