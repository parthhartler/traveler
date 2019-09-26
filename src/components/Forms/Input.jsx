import React, { Fragment } from "react";

export const Input = props => {
  const { name, label, isRequired = false } = props;

  let formFields = "";

  formFields = <InputTag {...props} />;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="label">
          {label}
        </label>
      )}
      {!isRequired && <span className="optionalLabel"> (Optional)</span>}
      {formFields}
    </div>
  );
};

const InputTag = props => {
  const {
    type,
    name,
    errors,
    touched,
    value,
    onChange,
    onBlur,
    className,
    placeholder,
    disabled
  } = props;

  let fieldClass = className
    ? "form-control rounded-0 " + className
    : "form-control rounded-0 ";

  let isTouched =
    touched !== undefined && touched[name] !== undefined && touched[name];
  let errorMsg = "";
  if (isTouched && errors[name] !== undefined && errors[name]) {
    fieldClass = fieldClass + " is-invalid";
    errorMsg = errors[name];
  } else if (isTouched && !errors[name] && value) {
    fieldClass = fieldClass + " is-valid";
  }

  return (
    <Fragment>
      <input
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        value={value}
        name={name}
        className={fieldClass}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
      <div className="invalid-feedback">{errorMsg}</div>
    </Fragment>
  );
};
