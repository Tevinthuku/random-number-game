import actionTypes from "../../actions/actionTypes";
import gameReducer from "../game";
describe("Test game reducer", () => {
  test("should return empty object when nothing is innitialized", () => {
    const newState = gameReducer(undefined, {});

    expect(newState).toEqual({});
  });
  test("should set my guess to the number I guess with", () => {
    const newState = gameReducer(undefined, {
      type: actionTypes.SET_GUESS,
      payload: 12
    });

    expect(newState).toEqual({
      guess: 12,
      success: false
    });
  });
  test("should SET_RANDOM_RESULT ", () => {
    const newState = gameReducer(undefined, {
      type: actionTypes.SET_RANDOM_RESULT,
      payload: { type: "uint8", length: 1, data: [153], success: true }
    });

    expect(newState).toEqual({
      randomresult: { type: "uint8", length: 1, data: [153], success: true }
    });
  });
});
