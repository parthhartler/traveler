import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ReactMapboxGl from "react-mapbox-gl";
import { ReactMapboxGlCluster } from "react-mapbox-gl-cluster";

import { geodata } from "../../config/data";

const style = {
  display: "block",
  paddingRight: "17px"
};

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicGFydGhzaGFoMTk5NCIsImEiOiJjazFnYm00ZzkwNDB5M2hwY2luY2x2NGJ1In0.lpC8o51fthImwkHg8W7l3Q"
});

const mapProps = {
  center: [-95.7129, 37.0902],
  zoom: [3],
  style: "mapbox://styles/mapbox/streets-v8"
};

class HotelMap extends Component {
  constructor(props) {
    super(props);
  }

  getEventHandlers() {
    return {
      onClick: (properties, coords, offset) =>
        console.log(
          `Receive event onClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`
        ),
      onMouseEnter: (properties, coords, offset) =>
        console.log(
          `Receive event onMouseEnter at properties: ${properties}, coords: ${coords}, offset: ${offset}`
        ),
      onMouseLeave: (properties, coords, offset) =>
        console.log(
          `Receive event onMouseLeave at properties: ${properties}, coords: ${coords}, offset: ${offset}`
        ),
      onClusterClick: (properties, coords, offset) =>
        console.log(
          `Receive event onClusterClick at properties: ${properties}, coords: ${coords}, offset: ${offset}`
        )
    };
  }

  render() {
    const {
      showModal,
      handleClose,
      hotelListingsData,
      hotelWidget
    } = this.props;
    console.log("features", geodata.features);
    return (
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        style={style}
        aria-modal="true"
      >
        <Modal
          show={showModal}
          onHide={handleClose}
          dialogClassName="map-modal"
        >
          <Modal.Header className="border-bottom-0">
            <button
              type="button"
              className="close btnModalClose"
              onClick={handleClose}
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <h5
              className="modal-title w-100 text-center"
              id="exampleModalLongTitle"
            >
              {hotelWidget.destination ? hotelWidget.destination.label : ""}
            </h5>
          </Modal.Header>
          <Modal.Body>
            {/* <Map {...mapProps} onStyleLoad={this.onStyleLoad}>
              <ReactMapboxGlCluster
                data={geodata}
                {...this.getEventHandlers()}
              />
            </Map> */}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default HotelMap;
