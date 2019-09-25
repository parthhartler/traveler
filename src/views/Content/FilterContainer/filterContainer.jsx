import React, { Component, Fragment } from "react";
import { filterLinks } from "../../Common/constants";
import HotelFilters from "./Hotels/filters";
import { Tab, Nav } from "react-bootstrap";

const COMPONENT_MAP = {
  hotels: HotelFilters
};

class filterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { filterActiveTab: "hotels" };
  }

  tabChangeHandler = eventKey => {
    this.setState({
      filterActiveTab: eventKey
    });
  };

  render() {
    const { filterActiveTab } = this.state;
    return (
      <div className="container">
        <div className="row">
          <Fragment>
            <Tab.Container
              onSelect={this.tabChangeHandler}
              activeKey={filterActiveTab}
            >
              <div className="tabsWrapper homeTabs col-lg-6 col-md-8">
                <Nav className="topnav nav nav-tabs border-0">
                  {filterLinks.map(value => {
                    const additionalClass =
                      value.eventKey === "hotels" ? "" : "disabled";
                    return (
                      <Nav.Item className="mb-0" key={value.eventKey}>
                        <Nav.Link
                          eventKey={value.eventKey}
                          className={additionalClass}
                          title={value.title}
                        >
                          {value.title}
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
                <Tab.Content>
                  {filterLinks.map(value => {
                    const ComponentName = COMPONENT_MAP[value.eventKey];
                    return (
                      <Tab.Pane eventKey={value.eventKey} key={value.eventKey}>
                        {filterActiveTab === value.eventKey &&
                          filterActiveTab === "hotels" && <ComponentName />}
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </div>
            </Tab.Container>
          </Fragment>
        </div>
      </div>
    );
  }
}

export default filterContainer;
