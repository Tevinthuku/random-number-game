import axios from "axios";

import actionTypes from "./actionTypes";

export const fetchRandomNumber = (size = 1) => {
  return dispatch => {
    return axios
      .get(`https://qrng.anu.edu.au/API/jsonI.php?length=${size}&type=uint8`)
      .then(({ data }) => {
        dispatch({
          type: actionTypes.SET_RANDOM_RESULT,
          payload: data
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: "An error has occured fetching the random number"
        });
      });
  };
};
