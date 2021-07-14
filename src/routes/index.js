import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { renderPage } from "../helper/renderPage";

import Home from "../pages/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/products/:id" render={(el) => renderPage(el)} />
      </Switch>
    </Router>
  );
};
export default Routes;
