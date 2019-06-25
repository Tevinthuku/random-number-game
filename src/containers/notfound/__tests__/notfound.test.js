import React from "react";
import { shallow } from "enzyme";
import Notfound from "../notfound";
import { findByTestAttr } from "../../../tests/testutils";

describe("<Notfound />", () => {
  test("should render h1", () => {
    const wrapper = shallow(<Notfound />);
    const h1 = findByTestAttr(wrapper, "not-found");
    expect(h1.length).toBe(1);
  });
});
