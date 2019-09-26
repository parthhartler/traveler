import React, { Component, Fragment } from "react";
import { DateInput } from "../../../../components/Forms/DateInput";
import { AutoComplete } from "../../../../components/Forms/AutoComplete";
import { Input } from "../../../../components/Forms/InputWithIncrementor";
import { Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";

class HotelFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initVal: {
        check_in: moment(),
        check_out: moment(),
        destination: "",
        rooms: 0,
        adults: 0,
        children: 0
      },
      acLoading: false,
      destinations: []
    };

    const digitAllowed = "Only digits are allowed.";
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
      rooms: Yup.number()
        .required("This field is required.")
        .typeError(digitAllowed)
        .min(1),
      adults: Yup.number()
        .required("This field is required.")
        .typeError(digitAllowed)
        .min(1),
      children: Yup.number()
        .required("This field is required.")
        .typeError(digitAllowed)
        .min(0)
    });
  }

  render() {
    const { initVal } = this.state;
    return (
      <Fragment>
        <Formik
          enableReinitialize
          initialValues={initVal}
          validationSchema={this.validationRules}
          displayName="hotelFilters"
          component={this.renderForm}
          onSubmit={this.handleSubmit}
        />
      </Fragment>
    );
  }

  handleSubmit = async (values, formikProps) => {
    debugger;
    const { error, handleClose } = this.props;
    if (error) {
      //setServerFieldErrors(error, formikProps);
    } else {
      //NewToastAlert("successAlert", "", "Package added successfully");
      //await this.tabChangeHandler();
      //await this.tabChangeHandler("packages");
      console.log(values);
      //handleClose("addGlCodeShow");
      //NewToastAlert("successAlert", "", "Added successfully");
    }
  };

  renderForm = formikProps => {
    const {
      values,
      errors,
      touched,
      handleSubmit,
      handleBlur,
      handleChange
    } = formikProps;
    const { destinations, acLoading } = this.state;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row gap-10 mb-15 align-items-end">
          <div className="col-12">
            <AutoComplete
              {...formikProps}
              label="Destination"
              name="destination"
              //className="search"
              onChange={selected => {
                this.acHandleChange(selected, formikProps);
              }}
              onBlur={handleBlur}
              onSearch={query => this.acHandleSearch(query)}
              options={destinations}
              isLoading={acLoading}
              //defaultInputValue={defaultAsset}
              isRequired={true}
              placeholder="Search"
            />
            <div className="col-inner">
              <div className="row gap-10 mb-15">
                <div className="col-md-6 col-sm-12">
                  <DateInput
                    {...formikProps}
                    label="Check-in"
                    name="check_in"
                    value={values.check_in}
                    onDateChange={date =>
                      this.handleDateChange(date, formikProps, "check_in")
                    }
                    focused={this.state.focusedCheckIn} // PropTypes.bool
                    onFocusChange={({ focused }) =>
                      this.handleFocusChange("focusedCheckIn", focused)
                    }
                    isRequired={true}
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <DateInput
                    {...formikProps}
                    label="Check-out"
                    name="check_out"
                    value={values.check_out}
                    onDateChange={date =>
                      this.handleDateChange(date, formikProps, "check_out")
                    }
                    focused={this.state.focusedCheckOut} // PropTypes.bool
                    onFocusChange={({ focused }) =>
                      this.handleFocusChange("focusedCheckOut", focused)
                    }
                    isRequired={true}
                  />
                </div>
              </div>
            </div>
            <div className="col-inner">
              <div className="row gap-10 mb-15">
                <div className="col-md-4 col-sm-12">
                  <Input
                    {...formikProps}
                    parentClass="form-group form-spin-group"
                    label="Rooms"
                    name="rooms"
                    isRequired
                    value={values.rooms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onIncrement={() =>
                      this.handleIncrement(values.rooms, formikProps, "rooms")
                    }
                    onDecrement={() =>
                      this.handleDecrement(values.rooms, formikProps, "rooms")
                    }
                  />
                </div>
                <div className="col-md-4 col-sm-12">
                  <Input
                    {...formikProps}
                    parentClass="form-group form-spin-group"
                    label="Adults"
                    name="adults"
                    isRequired
                    value={values.adults}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onIncrement={() =>
                      this.handleIncrement(values.adults, formikProps, "adults")
                    }
                    onDecrement={() =>
                      this.handleDecrement(values.adults, formikProps, "adults")
                    }
                  />
                </div>
                <div className="col-md-4 col-sm-12">
                  <Input
                    {...formikProps}
                    parentClass="form-group form-spin-group"
                    label="Children"
                    name="children"
                    isRequired
                    value={values.children}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onIncrement={() =>
                      this.handleIncrement(
                        values.children,
                        formikProps,
                        "children"
                      )
                    }
                    onDecrement={() =>
                      this.handleDecrement(
                        values.children,
                        formikProps,
                        "children"
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="txt-sm-center">
              <button type="submit" className="btn btn-primary submitBtn">
                Search now <i className="material-icons">arrow_right_alt</i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  handleIncrement = (value, formikProps, field) => {
    formikProps.setFieldValue(field, value + 1);
  };

  handleDecrement = (value, formikProps, field) => {
    formikProps.setFieldValue(field, value - 1);
  };

  handleDateChange = (value, formikProps, field) => {
    formikProps.setFieldValue(field, value);
  };

  handleFocusChange = (field, value) => {
    this.setState({ [field]: value });
  };

  acHandleSearch = async query => {
    this.setState({
      acLoading: true
    });

    // await commonService
    //   .assetsAutoComplete(query)
    //   .then(res => {
    //     if (res.data.data) {
    //       this.setState({
    //         acLoading: false,
    //         assetNumberOptions: res.data.data.map(ele => ({
    //           id: ele.asset_id,
    //           label: ele.asset_no
    //         }))
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     this.setState({
    //       acLoading: false
    //     });
    //   });
  };

  acHandleChange = async (selected, formikProps) => {
    if (selected.length) {
      this.setState({ assetNumberOptions: [] });
      formikProps.setFieldValue("destination", selected[0]);
    }
  };
}

export default HotelFilters;
