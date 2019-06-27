import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./containers/home/home";
import Nomatch from "./containers/notfound/notfound";
import Advanced from "./containers/advanced/advanced";

export { Home, Nomatch, Advanced };

export default props => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/advanced" component={Advanced} />
        <Route component={Nomatch} />
      </Switch>
    </Router>
  );
};
