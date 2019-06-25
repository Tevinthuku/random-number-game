import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./containers/home/home";
import Nomatch from "./containers/notfound/notfound";

export { Home, Nomatch };

export default props => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Nomatch} />
      </Switch>
    </Router>
  );
};
