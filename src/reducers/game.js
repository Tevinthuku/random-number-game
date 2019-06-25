import actionTypes from "../actions/actionTypes";

export default (state = { success: false }, action) => {
  switch (action.type) {
    case actionTypes.SET_GUESS:
      return {
        ...state,
        guess: action.payload
      };
    case actionTypes.SET_SUCCESS_STATUS:
      return {
        ...state,
        success: action.payload
      };
    case actionTypes.SET_RANDOM_RESULT:
      return { ...state, randomresult: action.payload };
    default:
      return state;
  }
};
