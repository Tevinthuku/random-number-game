import actionTypes from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_GUESS:
      const randomresult = state.randomresult ? state.randomresult.data : [];
      return {
        ...state,
        guess: action.payload,
        success: action.payload in randomresult ? true : false
      };
    case actionTypes.SET_RANDOM_RESULT:
      return { ...state, randomresult: action.payload };
    default:
      return state;
  }
};
