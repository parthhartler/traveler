import React, { Component, Fragment } from "react";
import { Formik } from "formik";
import Dropdown from "react-dropdown";
import { connect } from "react-redux";
import "react-dropdown/style.css";
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
import * as Yup from "yup";

const countArray = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" }
];

class HotelSearchWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initVal: { ...this.props.hotelWidget },
      acLoading: false,
      destinations: [],
      isWidgetDisabled: true,
      currentPage: 1
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

  render() {
    const { loading } = this.props;
    return (
      <Fragment>
        {loading && <Loader isLoading={loading} />}
        <Header whiteBackground={true} />
        {this.renderWidgetForm()}
        {this.renderHotelListings()}
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
    return qsParams;
  };

  async componentDidMount() {
    const { hotelWidget } = this.props,
      qsParams = this.buildQueryStringParams(
        hotelWidget,
        this.state.currentPage
      );

    await this.props.getHotelListings(qsParams);
  }

  renderWidgetForm = () => {
    const { initVal } = this.state;

    return (
      <Formik
        enableReinitialize
        initialValues={initVal}
        validationSchema={this.validationRules}
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
      <div className="search-widget-wrapper d-none d-sm-block">
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
                  defaultInputValue={
                    values.destination ? values.destination.label : ""
                  }
                />
              </div>
              <div className="col-xl-3 col-sm-6 mb-sm-3 mb-xl-0">
                {/* <label htmlFor="">Check In - Out</label>
                <input
                  type="text"
                  className="form-control dateRangepicker"
                  disabled=""
                /> */}
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
                <Dropdown
                  options={countArray}
                  onChange={selectedOption =>
                    this.handleChangeForAdultsAndChildren(
                      selectedOption,
                      "adults",
                      formikProps
                    )
                  }
                  value={countArray[values.adults]}
                  placeholder="Adults"
                  disabled={isWidgetDisabled}
                />
              </div>
              <div className="col-xl-2 col-sm-4">
                <label htmlFor="children">Children</label>
                <Dropdown
                  options={countArray}
                  onChange={selectedOption =>
                    this.handleChangeForAdultsAndChildren(
                      selectedOption,
                      "children",
                      formikProps
                    )
                  }
                  placeholder="Children"
                  disabled={isWidgetDisabled}
                  value={countArray[values.children]}
                />
              </div>
              {this.state.isWidgetDisabled ? (
                <div className="col-xl-2 col-sm-4 align-self-end">
                  <button
                    type="button"
                    className="btn btn-primary text-uppercase btn-block btn-edit"
                    onClick={this.handleEdit}
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
        <div className="col-xl-9 col-lg-9">
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
    }
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
    }
  };

  handleEdit = () => {
    const { isWidgetDisabled } = this.state;
    isWidgetDisabled && this.setState({ isWidgetDisabled: false });
  };

  handleSubmit = async values => {
    const { currentPage } = this.state;
    this.props.setHotelWidgetAtSearch(values);

    const qsParams = this.buildQueryStringParams(values, currentPage);
    await this.props.getHotelListings(qsParams);
  };

  handleChangeForAdultsAndChildren = (
    selectedOption,
    fieldName,
    formikProps
  ) => {
    formikProps.setFieldValue(fieldName, selectedOption.value);
  };

  handlePageChange = async page => {
    this.setState({ currentPage: page });
    const { hotelWidget } = this.props,
      qsParams = this.buildQueryStringParams(hotelWidget, page);

    await this.props.getHotelListings(qsParams);
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
