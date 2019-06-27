import React from "react";
import { shallow, mount } from "enzyme";
import { StaticRouter } from "react-router-dom";

import { findByTestAttr, storeFactory } from "../../../tests/testutils";
import Advancedcomponent, { UnconnectedAdvanced } from "../advanced";

import Successcomponent from "../../../components/success/success";

const renderAdvancedUnconnectedComponent = props =>
  shallow(<UnconnectedAdvanced {...props} />);

const renderAdvancedComponent = (props = {}) =>
  mount(
    <StaticRouter>
      <Advancedcomponent {...props} />
    </StaticRouter>
  );

describe("<UnconnectedAdvanced />", () => {
  const gameProp = {
    game: {
      success: false
    }
  };
  test("should render all three input boxes", () => {
    const wrapper = renderAdvancedUnconnectedComponent({
      ...gameProp
    });
    const firstInput = findByTestAttr(wrapper, "guess1-input");
    const secondInput = findByTestAttr(wrapper, "guess2-input");
    const thirdInput = findByTestAttr(wrapper, "guess3-input");
    expect(firstInput.length).toBe(1);
    expect(secondInput.length).toBe(1);
    expect(thirdInput.length).toBe(1);
  });
  test("should update state if input boxes are updated", () => {
    const wrapper = renderAdvancedUnconnectedComponent({
      ...gameProp
    });
    const firstInput = findByTestAttr(wrapper, "guess1-input");
    const secondInput = findByTestAttr(wrapper, "guess2-input");
    const thirdInput = findByTestAttr(wrapper, "guess3-input");
    // returns input event object
    const inputEvent = (value, name) => ({
      target: {
        value,
        name
      }
    });
    firstInput.simulate("change", inputEvent(10, "guess1"));
    secondInput.simulate("change", inputEvent(20, "guess2"));
    thirdInput.simulate("change", inputEvent(300, "guess3"));
    const componentState = wrapper.state();
    expect(componentState).toEqual({
      guess1: 10,
      guess2: 20,
      guess3: 300
    });
  });
  test("should call fetchRandomNumber when component mounts", () => {
    const fetchRandomNumber = jest.fn();
    const wrapper = renderAdvancedUnconnectedComponent({
      ...gameProp,
      fetchRandomNumber: fetchRandomNumber
    });
    wrapper.instance().componentDidMount();
    expect(fetchRandomNumber).toHaveBeenCalled();
  });
  test("should call setGuess when handleSubmitGuesses is called", () => {
    const setGuess = jest.fn();
    const wrapper = renderAdvancedUnconnectedComponent({
      ...gameProp,
      setGuess
    });
    wrapper.setState({
      guess1: 10,
      guess2: 20,
      guess3: 300
    });
    wrapper.instance().handleSubmitGuesses({});
    expect(setGuess).toHaveBeenCalled();
    expect(setGuess).toHaveBeenCalledWith([10, 20, 300]);
  });
  test("should call location.reload when handleReload is called", () => {
    window.location.reload = jest.fn();
    const wrapper = renderAdvancedUnconnectedComponent({
      ...gameProp
    });
    wrapper.instance().handleReload();
    expect(window.location.reload).toHaveBeenCalled();
  });
  test("should render lasterror when an error is present", () => {
    const wrapper = renderAdvancedUnconnectedComponent({
      ...gameProp,
      lasterror: {
        message: "An error is present"
      }
    });

    const errorBox = findByTestAttr(wrapper, "error-message");
    expect(errorBox.length).toBe(1);
  });
});

describe("<Advancedcomponent />", () => {
  test("should render Successcomponent if success guess is correct", () => {
    const store = storeFactory({
      game: {
        success: true,
        guess: [123],
        randomresult: {
          data: [123]
        }
      }
    });
    const wrapper = renderAdvancedComponent({ store });

    expect(wrapper.find(Successcomponent).length).toBe(1);
  });
  test("should render error message from Advancedcomponent", () => {
    const store = storeFactory({
      game: {
        success: false,
        randomresult: {
          data: [444]
        }
      },
      errors: [
        {
          message: "Error message",
          id: "12343"
        }
      ]
    });

    const wrapper = renderAdvancedComponent({ store });
    const errorBox = findByTestAttr(wrapper, "error-message");
    expect(errorBox.length).toBe(1);
  });
});
