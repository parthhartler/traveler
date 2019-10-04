import React, { Component } from "react";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
//import "./fields.css";

class DateInput extends Component {
  render() {
    const {
      label,
      name,
      value,
      errors,
      touched,
      isRequired = false,
      onDateChange,
      onFocusChange,
      focused,
      isDayBlocked
    } = this.props;

    let isValidClass = "";
    let fieldClass = "form-control rounded-0 ";
    let isTouched =
      touched !== undefined && touched[name] !== undefined && touched[name];

    let errorMsg = "";
    if (isTouched && errors[name] !== undefined && errors[name]) {
      fieldClass = fieldClass + " is-invalid";
      isValidClass = "datePickerInvalid";
      errorMsg = errors[name];
    } else if (isTouched && !errors[name] && value) {
      fieldClass = fieldClass + " is-valid";
      isValidClass = "datePickerValid";
    }

    return (
      <div className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        {!isRequired && <span className="optionalLabel"> (Optional)</span>}
        <div className={isValidClass + " datepicker-container"}>
          <span className="icon-font text-muted">
            <i className="bx bx-calendar"></i>
          </span>
          <SingleDatePicker
            date={value}
            onDateChange={onDateChange}
            focused={focused}
            onFocusChange={onFocusChange}
            id={name}
            isDayBlocked={isDayBlocked}
          />
          <div className="invalid-feedback">{errorMsg}</div>
        </div>
      </div>
    );
  }
}

export { DateInput };
