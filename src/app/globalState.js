export const initialState = {
  headerRightIcons: [],
  bottomNavigationVisible: true,
  backIcon: false,
};
export const actions = (state) => ({
  setHeaderRightIcons: (icons) => {
    return { ...state, headerRightIcons: icons };
  },
  setBackIcon: (isVisible) => {
    return { ...state, backIcon: isVisible };
  },
  focusInput: (isFocused) => {
    return { ...state, inputFocused: isFocused, bottomNavigationVisible: !isFocused };
  },
});
