import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sample from "../pages/Sample";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sample" component={Sample} />
      </Switch>
    </Router>
  );
};
export default Routes;
