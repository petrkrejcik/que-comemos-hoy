export const initialState = {
  headerRightIcons: null,
  headerLeftIcon: null,
  bottomNavigationVisible: true,
};
export const actions = (state) => ({
  setHeaderRightIcons: (icons) => {
    return { ...state, headerRightIcons: icons };
  },
  setHeaderLeftIcon: (icon) => {
    return { ...state, headerLeftIcon: icon };
  },
  setHeaderMenu: (items) => {
    return { ...state, headerMenu: items };
  },
  resetHeader: () => {
    return { ...state, headerMenu: null, headerRightIcons: null, headerLeftIcon: null };
  },
  focusInput: (isFocused) => {
    return { ...state, inputFocused: isFocused, bottomNavigationVisible: !isFocused };
  },
});
