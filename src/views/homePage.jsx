import React, { Component, Fragment } from "react";
import Header from "./Header/header";
import Content from "./Content/content";
import FilterContainer from "./Content/FilterContainer/filterContainer";

class HomePage extends Component {
  render() {
    const token = localStorage.getItem("token");
    debugger;
    return (
      <Fragment>
        <Header />
        <Content />
        <FilterContainer />
      </Fragment>
    );
  }
}

export default HomePage;
