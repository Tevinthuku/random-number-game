import { setGuess, formatGuessResults } from "../game";
import { storeFactory } from "../../tests/testutils";

const setUp = initialState => {
  return storeFactory(initialState);
};

describe("Game action creators", () => {
  test("should update guessednumber", () => {
    const store = setUp({
      game: {
        randomresult: { type: "uint8", length: 1, data: [153], success: true }
      }
    });

    store.dispatch(setGuess([12]));
    const newState = store.getState();
    expect(newState.game).toEqual({
      guess: [12],
      randomresult: { type: "uint8", length: 1, data: [153], success: true },
      success: false
    });
  });
  test("should update guessednumber and also success prop", () => {
    const store = setUp({
      game: {
        randomresult: { type: "uint8", length: 1, data: [153], success: true }
      }
    });

    store.dispatch(setGuess([153]));
    const newState = store.getState();
    expect(newState.game).toEqual({
      guess: [153],
      randomresult: { type: "uint8", length: 1, data: [153], success: true },
      success: true
    });
  });
  test("should read from empty array if random result is not present", () => {
    const store = setUp({
      game: {}
    });

    store.dispatch(setGuess([12]));
    const newState = store.getState();
    expect(newState.game).toEqual({
      guess: [12],
      success: false
    });
  });
  test("should update errors array in store with latest error", () => {
    const store = setUp({
      game: {
        randomresult: { type: "uint8", length: 1, data: [153], success: true }
      }
    });

    store.dispatch(setGuess([12]));
    const newState = store.getState();
    expect(newState.errors.length).toBe(1);
  });
  test("should have different error for multiple guesses", () => {
    const store = setUp({
      game: {
        randomresult: { type: "uint8", length: 1, data: [153], success: true }
      }
    });

    store.dispatch(setGuess([12, 34]));
    const newState = store.getState();
    expect(newState.errors[0].message).toEqual(
      "Of your 2 guesses 12,34 non is correct. Try Again"
    );
  });
});

describe("test auxilliary functions", () => {
  test("should return array of matching elements from my guesses and server", () => {
    const { isguessTheJackpot, correctGuesses } = formatGuessResults(
      [1, 2, 3],
      [3, 2, 0]
    );

    expect(isguessTheJackpot).toBe(true);
    expect(correctGuesses).toEqual([3, 2]);
  });
  test("should not return any correct guesses if my guesses did not match", () => {
    const { isguessTheJackpot, correctGuesses } = formatGuessResults(
      [2, 3, 5],
      [233]
    );
    expect(isguessTheJackpot).toBe(false);
    expect(correctGuesses).toEqual([]);
  });
});
