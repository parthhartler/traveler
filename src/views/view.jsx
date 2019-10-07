import React, { Component, Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import ProtectedRoutes from "../components/protectedRoutes";
import Login from "./Login/login";
import HomePage from "./Home/homePage";
import "react-toastify/dist/ReactToastify.css";
import HotelIndex from "./Hotels/hotelIndex";

class View extends Component {
  render() {
    return (
      <Fragment>
        <ToastContainer containerId="successAlert" enableMultiContainer />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <ProtectedRoutes path="/homepage" component={HomePage} />
          <ProtectedRoutes path="/hotel" component={HotelIndex} />
        </Switch>
      </Fragment>
    );
  }
}

export default View;
