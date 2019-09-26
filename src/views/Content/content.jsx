import React, { Component } from "react";
const hiddenStyle = { visibility: "hidden" },
  styleStatic = {
    position: "static",
    top: "0px",
    left: "0px",
    zIndex: 99,
    opacity: 1,
    display: "block",
    visibility: "hidden"
  },
  styleImage = {
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: 99,
    opacity: 1,
    display: "block",
    visibility: "visible"
  };

class Content extends Component {
  render() {
    return (
      <div
        className="cycle-slideshow bannerSlideShow"
        data-cycle-fx="scrollHorz"
        data-cycle-timeout="0"
        data-cycle-slides=".slide"
        data-cycle-speed="1500"
      >
        <div className="slide cycle-slide cycle-sentinel" style={styleStatic}>
          <div className="row" style={hiddenStyle}>
            <div className="col-lg-6" style={hiddenStyle}></div>
            <div
              className="col-lg-4 contentWrapper col-md-3"
              style={hiddenStyle}
            >
              <h2 style={hiddenStyle}>
                Enjoy big savings compared to other online travel sites. Where
                do YOU want to go?
              </h2>
              <a href="" className="" style={hiddenStyle}>
                Learn more
                <i className="material-icons" style={hiddenStyle}>
                  keyboard_arrow_right
                </i>
              </a>
            </div>
          </div>
        </div>
        <div
          className="slide cycle-slide cycle-slide-active"
          style={styleImage}
        >
          <div className="row">
            <div className="col-lg-6"></div>
            <div className="col-lg-4 contentWrapper col-md-3">
              <h2>
                Enjoy big savings compared to other online travel sites. Where
                do YOU want to go?
              </h2>
              <a href="" className="">
                Learn more{" "}
                <i className="material-icons">keyboard_arrow_right</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
