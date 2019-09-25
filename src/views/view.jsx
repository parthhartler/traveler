import React, { Component, Fragment } from "react";
import Header from "./Header/header";
import Content from "./Content/content";
import FilterContainer from "./Content/FilterContainer/filterContainer";

class View extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Content />
        <FilterContainer />
      </Fragment>
    );
  }
}

export default View;
