import React, { Component } from "react";
import loadImg from "../../styles/assets/images/load.gif";
import "./loader.css";
class Loader extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div className="loader">
          <img src={loadImg} className="loaderImg" alt="" />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Loader;
