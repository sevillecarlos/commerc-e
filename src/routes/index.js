import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { renderPage } from "../helper/renderPage";
import { renderViewProduct } from "../helper/renderViewProduct";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import NavBar from "../ui/NavBar";
import Auth from "../pages/Auth";

const Routes = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/products/:id" render={(el) => renderPage(el)} />
        <Route path="/query/:id" render={(el) => renderPage(el)} />
        <Route path="/:id/:id" render={(el) => renderViewProduct(el)} />
        <Route path="/cart" component={Cart} />
        <Route path="/authentication" component={Auth} />
      </Switch>
    </Router>
  );
};
export default Routes;
