import React, { Component, Fragment } from "react";
import Header from "./Header/header";
import Content from "./Content/content";
import FilterContainer from "./Content/FilterContainer/filterContainer";

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <div className="bannerWrapper">
          <Header />
          <Content />
          <FilterContainer />
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
