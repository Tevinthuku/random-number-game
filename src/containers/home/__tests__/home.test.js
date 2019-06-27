import React from "react";
import { shallow } from "enzyme";

import ConnectedHome, { Home } from "../home";

import { findByTestAttr, storeFactory } from "../../../tests/testutils";

const setUp = (initialState = {}) => {
  return storeFactory(initialState);
};

describe("Testing <Home />", () => {
  test("should render input box", () => {
    const wrapper = shallow(<Home game={{}} />);
    const input = findByTestAttr(wrapper, "play-input");
    expect(input.length).toBe(1);
  });
  test("should not render input box on successfull guess", () => {
    const wrapper = shallow(
      <Home
        game={{
          success: true
        }}
      />
    );
    const input = findByTestAttr(wrapper, "play-input");
    expect(input.length).toBe(0);
  });
  test("should change value on input change", () => {
    const wrapper = shallow(
      <Home
        game={{
          success: false
        }}
      />
    );
    const input = findByTestAttr(wrapper, "play-input");
    input.simulate("change", {
      target: {
        value: "12"
      }
    });
    expect(wrapper.state().guess).toBe(12);
  });
  test("should pass game to the connected component", () => {
    const store = setUp({
      game: {
        success: true
      },
      errors: [
        {
          message: "The number 123 is not the correct guess, try again"
        }
      ]
    });

    const wrapper = shallow(<ConnectedHome {...{ store }} />);
    const input = findByTestAttr(wrapper, "play-input");
    expect(input.length).toBe(0);
  });

  test("should pass lasterror message as null if there is no message", () => {
    const store = setUp({
      game: {
        success: true
      },
      errors: []
    });

    const wrapper = shallow(<ConnectedHome {...{ store }} />);
    const errorinput = findByTestAttr(wrapper, "error-message");
    expect(errorinput.length).toBe(0);
  });

  test("should call setGuess prop on Submit", () => {
    const setGuess = jest.fn();
    const wrapper = shallow(
      <Home
        {...{ setGuess }}
        game={{
          success: false
        }}
      />
    );

    wrapper.setState({ guess: 100 });
    const submitbutton = findByTestAttr(wrapper, "submit-guess");
    submitbutton.simulate("click");
    expect(setGuess).toHaveBeenCalled();
    expect(setGuess).toBeCalledWith([100]);
  });

  test("should call fetchRandomNumbers on componentDidMount", () => {
    const fetchRandomNumber = jest.fn();
    const wrapper = shallow(
      <Home
        {...{ fetchRandomNumber }}
        game={{
          success: false
        }}
      />
    );

    //run lifecycle method
    wrapper.instance().componentDidMount();
    expect(fetchRandomNumber).toHaveBeenCalled();
  });

  test("should render error message to the dom", () => {
    const wrapper = shallow(
      <Home
        game={{
          success: false
        }}
        lasterror={{
          message: "The number is not valid"
        }}
      />
    );
    const errorinput = findByTestAttr(wrapper, "error-message");
    expect(errorinput.text()).toBe("The number is not valid");
  });

  test("a call to handleReload should call window.location.reload", () => {
    window.location.reload = jest.fn();
    const wrapper = shallow(
      <Home
        game={{
          success: false
        }}
        lasterror={{
          message: "The number is not valid"
        }}
      />
    );
    wrapper.instance().handleReload();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
