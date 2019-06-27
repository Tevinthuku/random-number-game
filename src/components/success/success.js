import React from "react";
import { formatGuessResults } from "../../actions/game";
export default props => {
  const { guess, randomresult } = props.game;
  const { correctGuesses } = formatGuessResults(guess, randomresult.data);
  return (
    <div data-test="success-container">
      <h1>Yeeeey !!! You won, the random number is {correctGuesses}</h1>
      <button onClick={props.playAgain} data-test="play-again">
        Replay
      </button>
    </div>
  );
};
