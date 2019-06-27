import actionTypes from "./actionTypes";

/**
 *
 * @param {Array} guesses - the guesses you have made
 * @param {Array} randomresult - the random results fetched from the SERVER
 * @returns {Object} {
 *   isGuessTheJackPot {Boolean} - Does any of the guessed numbers in the array match any of random numbers from server
 *   correctGuess {Array} - Array of correct guesses you made
 *   guesses {Array} - Array of your guesses (Unfiltered)
 * }
 */
export const formatGuessResults = (guesses, randomresult) => {
  const matchingItems = randomresult.filter(element =>
    guesses.includes(element)
  );
  return {
    isguessTheJackpot: Boolean(matchingItems.length),
    correctGuesses: matchingItems
  };
};

export const setGuess = allguesses => {
  return (dispatch, getState) => {
    const { game } = getState();
    const randomresult = game.randomresult ? game.randomresult.data : [];
    // is the guessed number the lucky number
    const { isguessTheJackpot } = formatGuessResults(allguesses, randomresult);
    // set the guess
    dispatch({
      type: actionTypes.SET_GUESS,
      payload: allguesses
    });
    // set guess status
    dispatch({
      type: actionTypes.SET_SUCCESS_STATUS,
      payload: isguessTheJackpot
    });
    // if the guess is incorrect add another error.
    // if its correct reset the errors.
    manageErrors(isguessTheJackpot, dispatch, allguesses);
  };
};

/**
 *
 * @param {Boolean} isguessTheJackpot - has user guessed correctly
 * @param {Function} dispatch - dispatches action creators
 * @param {Array} allguesses - Array of all the guesses present
 * Will reset errors if guess is correct and add a
 * new error if your guess is not correct
 *
 */
const manageErrors = (isguessTheJackpot, dispatch, allguesses) => {
  return !isguessTheJackpot
    ? dispatch({
        type: actionTypes.SET_ERROR,
        payload:
          allguesses.length === 1
            ? `The number ${allguesses[0]} is not the correct guess. Try Again`
            : `Of your ${
                allguesses.length
              } guesses ${allguesses} non is correct. Try Again`
      })
    : dispatch({
        type: actionTypes.RESET_ERRORS
      });
};
