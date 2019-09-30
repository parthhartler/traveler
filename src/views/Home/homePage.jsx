import React, { Component, Fragment } from "react";
import Header from "../Header/header";
import HomePageHelper from "./homePageHelper";
import WidgetContainer from "./Widgets/widgetContainer";

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <div className="bannerWrapper">
          <Header />
          <HomePageHelper />
          <WidgetContainer />
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
