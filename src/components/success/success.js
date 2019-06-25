import React from "react";

export default props => {
  return (
    <div data-test="success-container">
      <h1>Yeeeey !!! You won, the random number is {props.game.guess}</h1>
      <button onClick={props.playAgain} data-test="play-again">
        Replay Again
      </button>
    </div>
  );
};
