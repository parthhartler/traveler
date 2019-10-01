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

const countArray = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" }
];

class HotelSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initVal: { ...this.props.hotelWidget },
      acLoading: false,
      destinations: [],
      isWidgetDisabled: true
    };
  }

  render() {
    return (
      <Fragment>
        <Header whiteBackground={true} />
        {this.renderForm()}
      </Fragment>
    );
  }

  renderForm = () => {
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
              <div className="col-xl-2 col-sm-4 align-self-end">
                <button
                  type="submit"
                  className="btn btn-primary text-uppercase btn-block btn-edit"
                  //onClick={handleSubmit}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
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

  handleSubmit = (values, formikProps) => {
    debugger;
    const { isWidgetDisabled } = this.state;
    isWidgetDisabled && this.setState({ isWidgetDisabled: false });
    if (!isWidgetDisabled) {
      debugger;
      this.props.setHotelWidgetAtSearch(values);
    }
  };

  handleChangeForAdultsAndChildren = (
    selectedOption,
    fieldName,
    formikProps
  ) => {
    formikProps.setFieldValue(fieldName, selectedOption.value);
  };
}

const mapStateToProps = state => {
  const { loading, error, hotelWidget } = state.hotelReducer;

  return {
    loading,
    error,
    hotelWidget
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHotelWidgetAtSearch: filterObject =>
      dispatch(hotelAction.setHotelWidgetAtSearch(filterObject))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelSearch);
