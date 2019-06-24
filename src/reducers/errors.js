import uuid4 from "uuid4";
import actionTypes from "../actions/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_ERROR:
      return [...state, { message: action.payload, id: uuid4() }];
    case actionTypes.REMOVE_ERROR:
      return state.filter(error => error.id !== action.payload);
    default:
      return state;
  }
};
