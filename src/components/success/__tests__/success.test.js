import React from "react";
import { shallow } from "enzyme";
import Success from "../success";

import { findByTestAttr } from "../../../tests/testutils";
describe("<Success />", () => {
  test("should render success component", () => {
    const playAgain = jest.fn();
    const game = {
      guess: 123
    };
    const wrapper = shallow(<Success {...{ game, playAgain }} />);
    const replayBtn = findByTestAttr(wrapper, "play-again");
    replayBtn.simulate("click");
    expect(playAgain).toHaveBeenCalled();
  });
});
