import axios from "axios";
import { storeFactory } from "../../tests/testutils";

import { fetchRandomNumber } from "../fetch";

jest.spyOn(axios, "get");

describe("<Fetch />", () => {
  test("should fetch from random number api and resolve well", () => {
    const data = { type: "uint8", length: 1, data: [153], success: true };
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data
      })
    );
    const store = storeFactory();

    return store.dispatch(fetchRandomNumber()).then(() => {
      const newState = store.getState();
      expect(newState.game).toEqual({
        randomresult: data
      });
    });
  });

  test("should set error when failed to fetch", () => {
    axios.get.mockImplementation(() =>
      Promise.reject({
        error: "Simple error"
      })
    );
    const store = storeFactory();

    return store.dispatch(fetchRandomNumber()).then(() => {
      const newState = store.getState();
      expect(newState.errors.length).toBe(1);
    });
  });
});
