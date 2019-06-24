import actionTypes from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GUESS_NUMBER:
      return state;
    default:
      return state;
  }
};
