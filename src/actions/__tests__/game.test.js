import { setGuess } from "../game";
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

    store.dispatch(setGuess(12));
    const newState = store.getState();
    expect(newState.game).toEqual({
      guess: 12,
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

    store.dispatch(setGuess(153));
    const newState = store.getState();
    expect(newState.game).toEqual({
      guess: 153,
      randomresult: { type: "uint8", length: 1, data: [153], success: true },
      success: true
    });
  });
  test("should read from empty array if random result is not present", () => {
    const store = setUp({
      game: {}
    });

    store.dispatch(setGuess(12));
    const newState = store.getState();
    expect(newState.game).toEqual({
      guess: 12,
      success: false
    });
  });
  test("should update errors array in store with latest error", () => {
    const store = setUp({
      game: {
        randomresult: { type: "uint8", length: 1, data: [153], success: true }
      }
    });

    store.dispatch(setGuess(12));
    const newState = store.getState();
    expect(newState.errors.length).toBe(1);
  });
});
