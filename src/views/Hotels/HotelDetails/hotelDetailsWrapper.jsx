import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Header from "../../Header/header";
import auth from "../../../api/authService";
import { hotelAction } from "../../../store/actions";

class HotelDetailsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { hotelId: "" };
  }

  async componentDidMount() {
    const hotelId = this.props.match.params.id,
      { getHotelDetails } = this.props;

    let hotelWidget = JSON.parse(localStorage.getItem("hotelWidget"));
    if (hotelWidget && hotelWidget.hasOwnProperty("rooms")) {
      let filterObject = {
        ...hotelWidget,
        check_in: moment(hotelWidget.check_in),
        check_out: moment(hotelWidget.check_out)
      };
      this.props.setHotelWidgetAtSearch(filterObject);

      let qs = this.buildQueryStringParams(filterObject);
      qs.hotel_id = hotelId;

      this.setState({ hotelId });
      await getHotelDetails(qs);
    } else {
      window.location = "/homepage";
    }
  }

  buildQueryStringParams = hotelWidget => {
    const qsParams = {
      adult_count: hotelWidget.adults,
      room_count: hotelWidget.rooms,
      cachebuster: 9630264,
      check_in_date: hotelWidget.check_in
        ? hotelWidget.check_in.format("YYYY-MM-DD")
        : null,
      check_out_date: hotelWidget.check_out
        ? hotelWidget.check_out.format("YYYY-MM-DD")
        : null,
      children_count: hotelWidget.children,
      city_name: hotelWidget.destination ? hotelWidget.destination.label : "",
      currency: "USD",
      home: false,
      hotel_id: "",
      locale: "en-US",
      onlyLocale: "en-US",
      optional: "amenities,moreDetails,policy,moreRatings",
      preventCache: "0.9299991871126359",
      region_id: hotelWidget.destination ? hotelWidget.destination.id : "",
      room_count: hotelWidget.rooms,
      search_type: "hotel",
      source_market: "US",
      token: auth.getCurrentUser(),
      type: "hotel",
      use_wallets: 0
    };

    return qsParams;
  };

  render() {
    return (
      <Fragment>
        <div className="hotel-detail">
          <Header whiteBackground={true} />
          {this.renderBreadCrumbBar()}
        </div>
      </Fragment>
    );
  }

  renderBreadCrumbBar = () => {
    const { hotelDetailsData } = this.props,
      hotelData =
        hotelDetailsData &&
        hotelDetailsData.data &&
        hotelDetailsData.data.hotels
          ? hotelDetailsData.data.hotels
          : null;

    //Moblie filters render
    return (
      <div className="st-content-wrapper pb-0">
        <div className="search-widget-xs d-sm-block d-block d-md-none px-3 py-2">
          <p className="widget-search-results">Castello Casole Hotel</p>
          <p className="widget-search-date">
            09/23/2019 - 09/24/2019
            <a className="hamburger">
              <i className="material-icons">edit</i>
            </a>
          </p>
        </div>
        <div className="modify-search-xs">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="sort-title mr-3 mb-0 text-dark">Modify Search</h3>
            <a className="close-filter text-dark">
              <i className="material-icons">close</i>
            </a>
          </div>
          <form action="">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>From</label>
                  <div className="typeahead__container">
                    <div className="typeahead__field">
                      <div className="typeahead__query">
                        <input
                          className="js-typeahead-country_v1 typeahead-input form-control"
                          name="country_v1[query]"
                          type="search"
                          value="Pune"
                          autoComplete="off"
                          disabled=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="">Check In - Out</label>
                  <input
                    type="text"
                    className="form-control dateRangepicker"
                    disabled=""
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="">Adults</label>
                  <select className="custom-select" disabled="">
                    <option value="">0</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                  </select>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="">Children</label>
                  <select className="custom-select" disabled="">
                    <option value="">0</option>
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                    <option value="">4</option>
                  </select>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-primary text-uppercase btn-block btn-edit"
                  >
                    edit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Render bread crumbs */}
        <div className="st-breadcrumb d-none d-sm-none d-md-block">
          <div className="container">
            <ul>
              <li>
                <NavLink to={`/hotel/search`}>Home</NavLink>
              </li>
              <li>
                <span>
                  {hotelData && hotelData[this.state.hotelId]
                    ? `${hotelData[this.state.hotelId].name} ,${hotelData[this.state.hotelId].city}, ${hotelData[this.state.hotelId].country_code}`
                    : ""}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  const { loading, error, hotelWidget, hotelDetailsData } = state.hotelReducer;

  return {
    loading,
    error,
    hotelWidget,
    hotelDetailsData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHotelWidgetAtSearch: filterObject =>
      dispatch(hotelAction.setHotelWidgetAtSearch(filterObject)),
    getHotelDetails: qsParams => dispatch(hotelAction.getHotelDetails(qsParams))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelDetailsWrapper);
