import React, { Component, Fragment } from "react";
import { DateInput } from "../../../../components/Forms/DateInput";
import { Formik } from "formik";
import moment from "moment";

class HotelFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initVal: {
        check_in: moment(),
        check_out: moment()
      }
    };
  }

  render() {
    const { initVal } = this.state;
    return (
      <Fragment>
        <Formik
          enableReinitialize
          initialValues={initVal}
          //validationSchema={this.validation}
          displayName="hotelFilters"
          component={this.renderForm}
          onSubmit={this.handleSubmit}
        />
      </Fragment>
    );
  }

  renderForm = formikProps => {
    const { values, errors, touched, handleSubmit } = formikProps;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row gap-10 mb-15 align-items-end">
          <div className="col-12">
            <div className="col-inner row gap-10 mb-15">
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
              {/* <div className="col-md-6 col-sm-12">
                <DateInput
                  {...formikProps}
                  label="Check-out"
                  name="check_out"
                  value={Date.now()}
                  onChange={date =>
                    this.handleDateChange(date, formikProps, "check_out")
                  }
                  onBlur={e => this.handleDateOnBlur(formikProps, "check_out")}
                  isRequired={true}
                />
              </div> */}
            </div>
          </div>
        </div>
      </form>
    );
  };

  handleDateChange = (value, formikProps, field) => {
    formikProps.setFieldValue(field, value);
  };

  handleFocusChange = (field, value) => {
    this.setState({ [field]: value });
  };
}

export default HotelFilters;
