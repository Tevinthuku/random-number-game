import actionTypes from "./actionTypes";

export const setGuess = guess => {
  return (dispatch, getState) => {
    const { game } = getState();
    const randomresult = game.randomresult ? game.randomresult.data : [];
    // is the guessed number the lucky number
    const isguessTheJackpot = randomresult.includes(guess);
    // set the guess
    dispatch({
      type: actionTypes.SET_GUESS,
      payload: guess
    });
    // set guess status
    dispatch({
      type: actionTypes.SET_SUCCESS_STATUS,
      payload: isguessTheJackpot
    });
    // if the guess is incorrect add another error.
    // if its correct reset the errors.
    return !isguessTheJackpot
      ? dispatch({
          type: actionTypes.SET_ERROR,
          payload: `The number ${guess} is not the correct guess. Try Again`
        })
      : dispatch({
          type: actionTypes.RESET_ERRORS
        });
  };
};
