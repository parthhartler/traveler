import React, { Component, Fragment } from "react";
import { Formik } from "formik";
import Dropdown from "react-dropdown";
import { connect } from "react-redux";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { AutoComplete } from "../../components/Forms/AutoComplete";
import { DateRangeInput } from "../../components/Forms/DateRangeInput";
import commonService from "../../api/commonService";
import Header from "../Header/header";
import { hotelAction } from "../../store/actions";
import HotelListing from "./hotelListing";
import auth from "../../api/authService";
import config from "../../config/config.json";
import Pagination from "../../components/pagination";
import Loader from "../../components/Loader/Loader";
import { NewToastAlert } from "../Common/utils";
import $ from "jquery";
import * as Yup from "yup";
import moment from "moment";
import _ from "lodash";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "react-dropdown/style.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";

const countArray = [0, 1, 2, 3, 4];

class HotelSearchWrapper extends Component {
  constructor(props) {
    super(props);
    let filterObject = JSON.parse(localStorage.getItem("hotelWidget")),
      check_in = moment(filterObject && filterObject.check_in),
      check_out = moment(filterObject && filterObject.check_out);
    this.state = {
      initVal: {
        ...filterObject,
        check_in,
        check_out
      },
      acLoading: false,
      destinations: [],
      asyncLoading: false,
      hotelNames: [],
      isWidgetDisabled: true,
      currentPage: 1,
      starFilter: [false, false, false, false, false],
      sortIcon: "down",
      category_map: new Map(),
      amenity_map: new Map(),
      sliderArray: []
    };

    this.validationRules = Yup.object().shape({
      destination: Yup.object()
        .nullable()
        .required("This field is required."),
      check_in: Yup.object()
        .nullable()
        .required("This field is required."),
      check_out: Yup.object()
        .nullable()
        .required("This field is required."),
      adults: Yup.number()
        .required("This field is required.")
        .typeError("Only digits are allowed.")
        .min(1),
      children: Yup.number()
        .required("This field is required.")
        .typeError("Only digits are allowed.")
        .min(0)
    });
  }

  componentWillUnmount() {
    localStorage.removeItem("hotelWidget");
  }

  render() {
    const { loading } = this.props;
    return (
      <Fragment>
        {loading && <Loader isLoading={loading} />}
        <Header whiteBackground={true} />
        {this.renderWidgetForm()}

        <div className="st-content-wrapper seacrh-hotel-section">
          <div className="container py-4">
            <div className="row">
              {this.renderFilterSection()}
              {this.renderHotelListings()}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  buildQueryStringParams = (hotelWidget, page) => {
    const qsParams = {
      adult_count: hotelWidget.adults,
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
      locale: "en-US",
      native_currency_symbol: "$",
      onlyLocale: "en-US",
      optional: "amenities",
      region_id: hotelWidget.destination ? hotelWidget.destination.id : "",
      room_count: hotelWidget.rooms,
      search_type: "hotel",
      source_market: "US",
      token: auth.getCurrentUser(),
      type: "city",
      use_wallets: 0,
      "paging[page_number]": page,
      "paging[per_page]": config.hotel.page_size
    };

    const {
      hotel_name,
      sliderArray,
      category_map,
      amenity_map,
      starFilter
    } = this.state;

    //filter section
    debugger;
    if (hotel_name && hotel_name.id) {
      qsParams.filtersApplied = true;
      qsParams["filters[id]"] = hotel_name.id;
    }

    if (sliderArray.length) {
      qsParams["filters[max_price]"] = sliderArray[1];
      qsParams["filters[min_price]"] = sliderArray[0];
    }

    const arrPost = [];
    for (let obj of category_map.keys()) {
      arrPost.push(obj);
    }
    if (arrPost.length) {
      qsParams.categoriesArray = arrPost;
      qsParams.filters = true;
    }

    const amenityPost = [];
    for (let obj of amenity_map.keys()) {
      amenityPost.push(obj);
    }
    if (amenityPost.length) {
      qsParams.amenitiesArray = amenityPost;
      qsParams.filters = true;
    }

    qsParams.starArray = [...starFilter];
    for (let i = 0; i < 5; i++) {
      if (starFilter[i]) {
        qsParams.filtersApplied = true;
        break;
      }
    }

    if (!qsParams.filtersApplied) delete qsParams.starArray;
    return qsParams;
  };

  async componentDidMount() {
    // $("body").on("click", ".btnCancel", function(e) {
    //   $("#hotelName")
    //     .find("input:text")
    //     .val("");
    // });
    (function() {
      const hamburger = document.querySelector(".hamburger");
      const nav = document.querySelector(".modify-search-xs");
      const closeNav = document.querySelector(".close-filter");
      const handleClick = () => {
        nav.classList.toggle("modify-search-xs--active");
      };
      const closeSidebar = () => {
        nav.classList.toggle("modify-search-xs--active");
      };
      hamburger.addEventListener("click", handleClick);
      closeNav.addEventListener("click", closeSidebar);
    })();

    (function() {
      const showFilter = document.querySelector(".show-filter-xs");
      const filterXs = document.querySelector(".filter-xs");
      const closeFilter = document.querySelector(".close-filter-xs");
      const filterShow = () => {
        filterXs.classList.toggle("filter-xs--active");
      };
      const filterClose = () => {
        filterXs.classList.toggle("filter-xs--active");
      };
      showFilter.addEventListener("click", filterShow);
      closeFilter.addEventListener("click", filterClose);
    })();

    let hotelWidget = JSON.parse(localStorage.getItem("hotelWidget"));
    if (hotelWidget && hotelWidget.hasOwnProperty("rooms")) {
      let check_in = moment(hotelWidget.check_in),
        check_out = moment(hotelWidget.check_out),
        filterObject = {
          ...hotelWidget,
          check_in,
          check_out
        };
      this.props.setHotelWidgetAtSearch(filterObject);

      const qsParams = this.buildQueryStringParams(
        filterObject,
        this.state.currentPage
      );

      await this.props.getHotelListings(qsParams);
    } else {
      window.location = "/homepage";
    }
  }

  renderWidgetForm = () => {
    const { initVal } = this.state;

    return (
      <Formik
        enableReinitialize
        initialValues={initVal}
        //validationSchema={this.validationRules}
        displayName="HotelWidgetBar"
        component={this.renderSearchWidgetBar}
        onSubmit={this.handleSubmit}
      />
    );
  };

  renderSearchWidgetBar = formikProps => {
    const { values, handleSubmit, handleBlur } = formikProps;
    const { destinations, acLoading, isWidgetDisabled } = this.state,
      buttonText = isWidgetDisabled ? "Edit" : "Search";
    return (
      <Fragment>
        <div className="search-widget-wrapper d-none d-sm-none d-md-block">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row custom-row">
                <div className="col-xl-3 col-sm-6 mb-sm-3 mb-xl-0">
                  <AutoComplete
                    {...formikProps}
                    label="Destination"
                    name="destination"
                    disabled={isWidgetDisabled}
                    onChange={selected => {
                      this.acHandleChange(selected, formikProps);
                    }}
                    onBlur={handleBlur}
                    onSearch={query => this.acHandleSearch(query)}
                    options={destinations}
                    isLoading={acLoading}
                    isRequired={true}
                    placeholder="Search"
                    defaultSelected={
                      values.destination
                        ? [
                            {
                              ...values.destination
                            }
                          ]
                        : []
                    }
                  />
                </div>
                <div className="col-xl-3 col-sm-6 mb-sm-3 mb-xl-0">
                  <DateRangeInput
                    startDate={values.check_in}
                    endDate={values.check_out}
                    startDateId="check_in"
                    endDateId="check_out"
                    disabled={isWidgetDisabled}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput =>
                      this.setState({ focusedInput })
                    }
                    label="Check In - Out"
                    isRequired
                    startDatePlaceholderText="Check In"
                    endDatePlaceholderText="Check Out"
                    onDatesChange={({ startDate, endDate }) => {
                      this.handleDateChange(startDate, formikProps, "check_in");
                      this.handleDateChange(endDate, formikProps, "check_out");
                    }}
                  />
                </div>
                <div className="col-xl-2 col-sm-4">
                  <label htmlFor="adults">Adults</label>
                  <select
                    className="custom-select"
                    disabled={isWidgetDisabled}
                    name="adults"
                    value={values.adults}
                    onChange={e =>
                      this.handleChangeForAdultsAndChildren(
                        e,
                        "adults",
                        formikProps
                      )
                    }
                  >
                    {countArray.map(item => {
                      return <option key={item}>{item}</option>;
                    })}
                  </select>
                </div>
                <div className="col-xl-2 col-sm-4">
                  <label htmlFor="children">Children</label>
                  <select
                    className="custom-select"
                    disabled={isWidgetDisabled}
                    name="children"
                    value={values.children}
                    onChange={e =>
                      this.handleChangeForAdultsAndChildren(
                        e,
                        "children",
                        formikProps
                      )
                    }
                  >
                    {countArray.map(item => {
                      return <option key={item}>{item}</option>;
                    })}
                  </select>
                </div>
                {this.state.isWidgetDisabled ? (
                  <div className="col-xl-2 col-sm-4 align-self-end">
                    <button
                      type="button"
                      className="btn btn-primary text-uppercase btn-block btn-edit"
                      onClick={e => this.handleEdit(e)}
                    >
                      {buttonText}
                    </button>
                  </div>
                ) : (
                  <div className="col-xl-2 col-sm-4 align-self-end">
                    <button
                      type="submit"
                      className="btn btn-primary text-uppercase btn-block btn-edit"
                      //onClick={handleSubmit}
                    >
                      {buttonText}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="search-widget-xs d-sm-block d-md-none px-3 py-2">
          <p className="widget-search-results">
            268 hotels found in Virginia, USA
          </p>
          <p className="widget-search-date">
            09/23/2019 - 09/24/2019
            <a
              //href="javascript:void(0)"
              className="hamburger"
            >
              <i className="material-icons ml-1">edit</i>
            </a>
          </p>
        </div>
        <div className="modify-search-xs">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="sort-title mr-3 mb-0 text-dark">Modify Search</h3>
            <a
              //href="javascript:void(0)"
              className="close-filter text-dark"
            >
              <i className="material-icons">close</i>
            </a>
          </div>
          <form action="">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>Destination</label>
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
                          onChange={() => {}}
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
      </Fragment>
    );
  };

  renderHotelListings = () => {
    const { hotelListingsData } = this.props;
    let itemCount = 0;
    if (
      hotelListingsData &&
      hotelListingsData.data &&
      hotelListingsData.data.hotels
    ) {
      itemCount = hotelListingsData.data.paging.total_records;
      return (
        <div className="col-xl-9 col-lg-9 col-md-9">
          {this.renderSortbar()}
          {hotelListingsData.data.hotels.map(hotel => (
            <HotelListing
              hotel={hotel}
              key={hotel.id}
              currency_symbol={hotelListingsData.data.currency.symbol_native}
            />
          ))}
          <div className="d-flex justify-content-center align-items-center mt-5">
            <Pagination
              currentPage={this.state.currentPage}
              pageSize={config.hotel.page_size}
              onPageChange={this.handlePageChange}
              itemsCount={itemCount}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-xl-9 col-lg-9">
          <h3>No Data Found.</h3>
        </div>
      );
    }
  };

  renderFilterSection = () => {
    const { hotelListingsData } = this.props;
    return (
      <div className="col-md-3 col-xl-3 col-lg-3 mb-3 mb-sm-3 mb-md-0 filter-wrapper">
        <button
          type="button"
          className="btn btn-primary text-uppercase btn-block show-filter-xs d-block d-sm-block d-md-none rounded-0"
        >
          <i className="material-icons">filter_list</i>
          search by Filter
        </button>
        <div className="filter-xs">
          <div className="d-flex align-items-center justify-content-between mb-3 d-md-none">
            <a className="sort-title mr-3 mb-0 text-dark close-filter-xs">
              <i className="material-icons">keyboard_backspace </i>
              Filter
            </a>
            <a //href="javascript:void(0)"
              className="ml-auto"
            >
              RESET
            </a>
          </div>
          <div className="mb-4 mb-sm-2 mb-md-2">
            <a
              //href="javascript:void(0)"
              data-toggle="modal"
              data-target="#mapModal"
              className="map-view d-block"
            >
              <i className="fa fa-map-marker" aria-hidden="true"></i> MAPS VIEW
            </a>
          </div>
          <div className="search-title my-4 my-sm-3 my-md-3 d-none d-sm-block">
            <h5 className="mb-0 ml-2">Filter By</h5>
          </div>
          <div className="border bg-white my-3">
            <div className="py-3 px-4 px-sm-3 px-md-3">
              <a
                data-toggle="collapse"
                href="#hotelName"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="collapse-title d-block text-decoration-none"
              >
                Hotel Name
                <i
                  className="fa fa-angle-up arrow float-right"
                  aria-hidden="true"
                ></i>
              </a>
              <div className="collapse show mt-4" id="hotelName">
                <form>
                  <div>
                    <AsyncTypeahead
                      ref="hotelInput"
                      labelKey="label"
                      isLoading={this.state.asyncLoading}
                      minLength={3}
                      onSearch={query => this.asyncHandleSearch(query)}
                      options={this.state.hotelNames}
                      placeholder={"Hotel Name"}
                      cache={false}
                      onChange={selected => {
                        this.asyncHandleChange(selected);
                      }}
                      searchText="Searching..."
                      name="hotel_name"
                      id="hotel_name"
                      renderMenuItemChildren={option => (
                        <List key={option.id} user={option} />
                      )}
                    />
                    <div className="hoteSearch">
                      <button
                        type="button"
                        className="btn btn-apply"
                        onClick={this.handleHotelSearch}
                        disabled={!this.state.hotel_name}
                      >
                        Search
                      </button>
                      <button
                        type="button"
                        className="btn btn-apply text-decoration-none btnCancel"
                        onClick={this.handleHotelSearchCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="border bg-white my-3">
            <div className="py-3 px-4 px-sm-3 px-md-3">
              <a
                data-toggle="collapse"
                href="#priceSlider"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="collapse-title d-block text-decoration-none"
              >
                Price
                <i
                  className="fa fa-angle-up arrow float-right"
                  aria-hidden="true"
                ></i>
              </a>
              <div className="collapse show mt-4" id="priceSlider">
                {this.renderSlider()}
                {/* <span className="irs" id="lower-value">
                  10
                </span>
                <span className="float-right irs" id="upper-value">
                  315
                </span> */}
                {/* <div
                  className="mt-2 mb-3 noUi-target noUi-ltr noUi-horizontal"
                  id="nonlinear"
                >
                  <div className="noUi-base">
                    <div className="noUi-connects">
                      <div
                        className="noUi-connect"
                        //style="transform: translate(0%, 0px) scale(1, 1);"
                      ></div>
                    </div>
                    <div
                      className="noUi-origin"
                      //style="transform: translate(-1000%, 0px); z-index: 5;"
                    >
                      <div
                        className="noUi-handle noUi-handle-lower"
                        data-handle="0"
                        tabIndex="0"
                        role="slider"
                        aria-orientation="horizontal"
                        aria-valuemin="10.0"
                        aria-valuemax="315.0"
                        aria-valuenow="10.0"
                        aria-valuetext="10.00"
                      >
                        <div className="noUi-touch-area"></div>
                      </div>
                    </div>
                    <div
                      className="noUi-origin"
                      //style="transform: translate(0%, 0px); z-index: 4;"
                    >
                      <div
                        className="noUi-handle noUi-handle-upper"
                        data-handle="1"
                        tabIndex="0"
                        role="slider"
                        aria-orientation="horizontal"
                        aria-valuemin="10.0"
                        aria-valuemax="315.0"
                        aria-valuenow="315.0"
                        aria-valuetext="315.00"
                      >
                        <div className="noUi-touch-area"></div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <button
                  type="button"
                  className="btn btn-apply text-decoration-none"
                  onClick={this.handleSliderApply}
                >
                  APPLY
                </button>
              </div>
            </div>
          </div>
          <div className="border bg-white my-3">
            <div className="py-3 px-4 px-sm-3 px-md-3">
              <a
                data-toggle="collapse"
                href="#hotelStar"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="collapse-title d-block text-decoration-none"
              >
                Star Ratings
                <i
                  className="fa fa-angle-up arrow float-right"
                  aria-hidden="true"
                ></i>
              </a>
              <div className="collapse show st-icheck-item" id="hotelStar">
                <div className="mt-3">
                  {this.filterRenderingHelper("rating")
                    .reverse()
                    .map(rating => {
                      return (
                        <label key={rating.value} className="customCheckbox">
                          {_.range(1, rating.value + 1).map(star => (
                            <i key={star} className="fa fa-star"></i>
                          ))}
                          <input
                            type="checkbox"
                            onClick={e => this.handleStarCheck(e, rating.value)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="border bg-white my-3">
            <div className="py-3 px-4 px-sm-3 px-md-3">
              <a
                data-toggle="collapse"
                href="#hotelCategories"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="collapse-title d-block text-decoration-none"
              >
                Categories
                <i
                  className="fa fa-angle-up arrow float-right"
                  aria-hidden="true"
                ></i>
              </a>
              <div
                className="collapse show st-icheck-item"
                id="hotelCategories"
              >
                <div className="mt-3">
                  {this.filterRenderingHelper("category_ids").map(category => {
                    return (
                      <label className="customCheckbox" key={category.label}>
                        {`${category.label} (${category.count})`}
                        <input
                          type="checkbox"
                          onClick={() =>
                            this.handleCategoryCheck(category.value)
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="border bg-white my-3">
            <div className="py-3 px-4 px-sm-3 px-md-3">
              <a
                data-toggle="collapse"
                href="#Facilities"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="collapse-title d-block text-decoration-none "
              >
                Amenities
                <i
                  className="fa fa-angle-up arrow float-right"
                  aria-hidden="true"
                ></i>
              </a>
              <div className="collapse show" id="Facilities">
                <div className="mt-3">
                  {this.filterRenderingHelper("amenities").map(amenity => {
                    return (
                      <label className="customCheckbox" key={amenity.label}>
                        {amenity.label}
                        <input
                          type="checkbox"
                          onClick={() => this.handleAmenityCheck(amenity.value)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  handleSliderApply = async () => {
    const { sliderArray } = this.state;
    if (sliderArray.length) {
      const qsParams = this.buildQueryStringParams(this.props.hotelWidget, 1);

      await this.props.getHotelListings(qsParams);
    }
  };

  renderSlider = () => {
    const min_arr = this.filterRenderingHelper("price").filter(
      item => item.name === "min_price"
    );
    const max_arr = this.filterRenderingHelper("price").filter(
      item => item.name === "max_price"
    );
    if (min_arr.length && max_arr.length) {
      return (
        <Nouislider
          range={{ min: min_arr[0].value, max: max_arr[0].value }}
          start={[min_arr[0].value, max_arr[0].value]}
          connect
          tooltips
          onSlide={this.handleSlide}
        />
      );
    }
    return null;
  };

  handleSlide = value => {
    this.setState({ sliderArray: [...value] });
  };

  handleAmenityCheck = async key => {
    const { amenity_map } = this.state;
    amenity_map.get(key) ? amenity_map.delete(key) : amenity_map.set(key, true);

    this.setState({ amenity_map });
    const qsParams = this.buildQueryStringParams(this.props.hotelWidget, 1);

    await this.props.getHotelListings(qsParams);
  };

  handleCategoryCheck = async key => {
    const { category_map } = this.state;

    category_map.get(key)
      ? category_map.delete(key)
      : category_map.set(key, true);

    this.setState({ category_map });
    const qsParams = this.buildQueryStringParams(this.props.hotelWidget, 1);

    await this.props.getHotelListings(qsParams);
  };

  filterRenderingHelper = key => {
    const { hotelListingsData } = this.props;
    let filterArray = [];
    if (
      hotelListingsData &&
      hotelListingsData.data &&
      hotelListingsData.data.filters_available
    ) {
      filterArray = hotelListingsData.data.filters_available.filter(
        item => item.name === key
      );
      if (filterArray && filterArray.length) {
        return [...filterArray[0].options];
      }
    }
    return [];
  };

  handleStarCheck = async (e, key) => {
    const starArray = this.state.starFilter;
    starArray[key - 1] = e.target.checked;
    debugger;
    this.setState({ starFilter: starArray });
    const qsParams = this.buildQueryStringParams(this.props.hotelWidget, 1);

    await this.props.getHotelListings(qsParams);
  };

  toggleSortClass = () => {
    let sortIcon = "";
    if (this.refs.sortDropdown.classList.contains("d-block")) {
      this.refs.sortDropdown.classList.remove("d-block");
      sortIcon = "down";
    } else {
      this.refs.sortDropdown.classList.add("d-block");
      sortIcon = "up";
    }
    this.setState({
      sortIcon
    });
  };

  renderSortbar = () => {
    const { hotelListingsData, hotelWidget } = this.props,
      paging =
        hotelListingsData &&
        hotelListingsData.data &&
        hotelListingsData.data.paging;
    return (
      paging && (
        <div className="d-flex align-items-center mb-3">
          <h3 className="hotelResults mr-3 mb-0" id="modern-result-string">
            {paging.total_records} hotels found in{" "}
            {hotelWidget.destination.label}
          </h3>
          <div className="dropdown ml-auto">
            <a
              ////href="javascript:void(0)"
              id="dropdownMenu2"
              className="text-dark text-decoration-none sort-title"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={this.toggleSortClass}
            >
              Sort
              <i className={`fa fa-angle-${this.state.sortIcon}`}></i>
            </a>
            <div
              className="dropdown-menu sortMenu dropdown-menu-right px-3"
              aria-labelledby="dropdownMenu2"
              x-placement="top-end"
              ref="sortDropdown"
              //style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-116px, -211px, 0px);"
            >
              <h3 className="sort-title">SORT BY</h3>
              <h3 className="price-title">Price</h3>
              <label className="container-radio">
                Low to High
                <input
                  type="radio"
                  name="custom-radio"
                  onClick={() => this.handleSort("price", "asc")}
                />
                <span className="radiomark"></span>
              </label>
              <label className="container-radio">
                High to Low
                <input
                  type="radio"
                  name="custom-radio"
                  onClick={() => this.handleSort("price", "desc")}
                />
                <span className="radiomark"></span>
              </label>
              <h3 className="price-title">Saving</h3>
              <label className="container-radio">
                Largest Saving
                <input
                  type="radio"
                  name="custom-radio"
                  onClick={() => this.handleSort("savings_amount", "desc")}
                />
                <span className="radiomark"></span>
              </label>
              <h3 className="price-title">Name</h3>
              <label className="container-radio">
                a - z
                <input type="radio" name="custom-radio" />
                <span className="radiomark"></span>
              </label>
              <label className="container-radio">
                z - a
                <input type="radio" name="custom-radio" />
                <span className="radiomark"></span>
              </label>
            </div>
          </div>
        </div>
      )
    );
  };

  handleSort = async (key, sort_val) => {
    const qsParams = this.buildQueryStringParams(this.props.hotelWidget, 1);
    qsParams["sort[field]"] = key;
    qsParams["sort[order]"] = sort_val;

    await this.props.getHotelListings(qsParams);
    this.refs.sortDropdown.classList.remove("d-block");
  };

  handleDateChange = (value, formikProps, field) => {
    formikProps.setFieldValue(field, value);
  };

  acHandleSearch = async query => {
    this.setState({
      acLoading: true
    });

    await commonService
      .destinationAutoComplete(query)
      .then(res => {
        if (res.data.results) {
          this.setState({
            acLoading: false,
            destinations: res.data.results.city_en_us.map(ele => ({
              id: ele.id,
              label: ele.term
            }))
          });
        }
      })
      .catch(error => {
        this.setState({
          acLoading: false
        });
      });
  };

  acHandleChange = async (selected, formikProps) => {
    if (selected.length) {
      this.setState({ destinations: [] });
      formikProps.setFieldValue("destination", selected[0]);
    } else {
      formikProps.setFieldValue("destination", null);
    }
  };

  handleEdit = e => {
    const { isWidgetDisabled } = this.state;
    isWidgetDisabled && this.setState({ isWidgetDisabled: false });

    e.preventDefault();
  };

  handleSubmit = async values => {
    let toastMessage = "";
    if (!values.destination) {
      toastMessage = "Please enter valid destination";
    } else if (values.adults < 1) {
      toastMessage = "Please add at least 1 adult.";
    } else if (!values.check_in || !values.check_out) {
      toastMessage = "Please enter valid dates.";
    } else {
      const { currentPage } = this.state;
      this.props.setHotelWidgetAtSearch(values);

      const qsParams = this.buildQueryStringParams(values, currentPage);
      await this.props.getHotelListings(qsParams);
    }
    toastMessage &&
      NewToastAlert("successAlert", "", toastMessage, null, null, true);
  };

  handleChangeForAdultsAndChildren = (e, fieldName, formikProps) => {
    formikProps.setFieldValue(fieldName, e.target.value);
  };

  handlePageChange = async page => {
    this.setState({ currentPage: page });
    const { hotelWidget } = this.props,
      qsParams = this.buildQueryStringParams(hotelWidget, page);

    await this.props.getHotelListings(qsParams);
  };

  asyncHandleChange = async selected => {
    if (selected.length) {
      this.setState({ hotelNames: [], hotel_name: selected[0] });
    } else {
      this.setState({ hotel_name: null });
    }
  };

  asyncHandleSearch = query => {
    this.setState({
      asyncLoading: true
    });

    const searchArray = this.filterRenderingHelper("id");

    if (searchArray && searchArray.length) {
      const filterArray = searchArray.filter(
        hotel => hotel.label.toLowerCase().indexOf(query.toLowerCase()) > -1
      );

      this.setState({
        asyncLoading: false,
        hotelNames: filterArray.map(ele => ({
          id: ele.value,
          label: ele.label
        }))
      });
    } else {
      this.setState({
        asyncLoading: false
      });
    }
  };

  handleHotelSearch = async () => {
    const qsParams = this.buildQueryStringParams(this.props.hotelWidget, 1);
    await this.props.getHotelListings(qsParams);
  };

  handleHotelSearchCancel = async () => {
    this.setState({ hotelNames: [], hotel_name: null, currentPage: 1 });
    const qsParams = this.buildQueryStringParams(this.props.hotelWidget, 1);
    delete qsParams["filters[id]"];

    await this.props.getHotelListings(qsParams);
    this.refs.hotelInput._instance.clear();
  };
}

const mapStateToProps = state => {
  const { loading, error, hotelWidget, hotelListingsData } = state.hotelReducer;

  return {
    loading,
    error,
    hotelWidget,
    hotelListingsData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHotelWidgetAtSearch: filterObject =>
      dispatch(hotelAction.setHotelWidgetAtSearch(filterObject)),
    getHotelListings: qsParams =>
      dispatch(hotelAction.getHotelListings(qsParams))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelSearchWrapper);

const List = ({ user }) => (
  <div>
    <span style={{ whiteSpace: "normal" }}>{user.label}</span>
  </div>
);
