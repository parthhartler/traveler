import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
//import "./fields.css";

class DateRangeInput extends Component {
  render() {
    const {
      label,
      name,
      value,
      errors,
      touched,
      isRequired = false,
      onDatesChange,
      onFocusChange,
      focusedInput,
      startDate,
      startDateId,
      endDate,
      endDateId,
      disabled,
      startDatePlaceholderText,
      endDatePlaceholderText
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
        <div className={isValidClass}>
          <DateRangePicker
            startDate={startDate}
            startDateId={startDateId}
            endDate={endDate}
            endDateId={endDateId}
            onDatesChange={onDatesChange}
            focusedInput={focusedInput}
            onFocusChange={onFocusChange}
            disabled={disabled}
            startDatePlaceholderText={startDatePlaceholderText}
            endDatePlaceholderText={endDatePlaceholderText}
          />
          <div className="invalid-feedback">{errorMsg}</div>
        </div>
      </div>
    );
  }
}

export { DateRangeInput };
