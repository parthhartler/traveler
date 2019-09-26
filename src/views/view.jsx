import React, { Component, Fragment } from "react";
import Login from "./Login/login";
import HomePage from "./homePage";
import { Route, Switch } from "react-router-dom";

class View extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/homepage" component={HomePage} />
        </Switch>
      </Fragment>
    );
  }
}

export default View;
