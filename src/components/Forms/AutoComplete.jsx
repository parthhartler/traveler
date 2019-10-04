import React, { Component } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";

class AutoComplete extends Component {
  render() {
    const {
      label,
      name,
      placeholder = "Search name",
      onSearch,
      options,
      onChange,
      isLoading = false,
      disabled,
      isRequired = false,
      touched,
      errors,
      defaultSelected = [],
      value = "",
      onInputChange,
      defaultInputValue
    } = this.props;

    let fieldClass = "";
    let errorMsg = "";

    let isTouched =
      touched !== undefined && touched[name] !== undefined && touched[name];

    if (isTouched && errors[name] !== undefined && errors[name]) {
      fieldClass = "is-invalid";
      errorMsg = errors[name];
    } else if (isTouched && !errors[name] && value) {
      fieldClass = "is-valid";
    }

    return (
      <div className="form-group">
        <label htmlFor="" className="label">
          {label}
        </label>
        {!isRequired && <span className="optionalLabel"> (Optional)</span>}
        <div className="autocomplete-container">
          <span className="icon-font text-muted">
            <i className="bx bx-map"></i>
          </span>

          <AsyncTypeahead
            defaultInputValue={defaultInputValue}
            onInputChange={onInputChange}
            //selected={value}
            defaultSelected={defaultSelected}
            labelKey="label"
            isLoading={isLoading}
            minLength={3}
            onSearch={onSearch}
            options={options}
            placeholder={placeholder}
            cache={false}
            onChange={onChange}
            searchText="Searching..."
            name={name}
            id={name}
            disabled={disabled}
            className={fieldClass}
            renderMenuItemChildren={option => (
              <List key={option.id} user={option} />
            )}
          />
        </div>
        <div className="invalid-feedback">{errorMsg}</div>
      </div>
    );
  }
}

const List = ({ user }) => (
  <div>
    <span style={{ whiteSpace: "normal" }}>{user.label}</span>
  </div>
);

export { AutoComplete };
