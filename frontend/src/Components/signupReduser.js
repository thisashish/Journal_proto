const signupReducer = (state, action) => {
  switch (action.type) {
    case 'Handle Input Change':
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};
export default signupReducer;
