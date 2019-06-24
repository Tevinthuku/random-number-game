import actionTypes from "../../actions/actionTypes";
import errorsReducer from "../errors";

describe("Test errors reducer in redux", () => {
  test("should return empty array as initial state", () => {
    const newState = errorsReducer(undefined, {});
    expect(newState).toEqual([]);
  });
  test("should add error message to state", () => {
    const newState = errorsReducer(undefined, {
      type: actionTypes.SET_ERROR,
      payload: "Error here"
    });

    expect(newState[0]).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        id: expect.any(String)
      })
    );
  });

  test("should delete error from state", () => {
    const newState = errorsReducer(
      [
        { id: "1234", message: "Simple error" },
        { id: "5678", message: "Second Simple error" }
      ],
      {
        type: actionTypes.REMOVE_ERROR,
        payload: "1234"
      }
    );

    expect(newState.length).toBe(1);
  });
});
