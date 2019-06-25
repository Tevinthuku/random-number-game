import React from "react";
import { shallow } from "enzyme";
import { Route } from "react-router-dom";

import Routes, { Home, Notfound } from "./routes";

let pathMap = {};
describe("<Routes />", () => {
  beforeAll(() => {
    const component = shallow(<Routes />);
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
  });
  test("should render Home component on / route", () => {
    expect(pathMap["/"]).toBe(Home);
  });
  test("should render Notfound on an /undefined route", () => {
    expect(pathMap["/undefined"]).toBe(Notfound);
  });
});
