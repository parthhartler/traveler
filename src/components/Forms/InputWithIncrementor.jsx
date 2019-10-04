import React, { Fragment } from "react";

export const Input = props => {
  const {
    name,
    label,
    parentClass,
    isRequired = false,
    mutedLabelText
  } = props;

  let formFields = <InputTag {...props} />;

  return (
    <div className={parentClass}>
      {label && (
        <label htmlFor={name} className="label">
          {label}{" "}
          {mutedLabelText && (
            <small className=" text-muted font10 line-1">
              {mutedLabelText}
            </small>
          )}
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
    disabled,
    onIncrement,
    onDecrement,
    iconClassName
  } = props;

  let fieldClass = className ? "form-control " + className : "form-control";

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
      <div className="form-icon-left">
        <span className="icon-font text-muted">
          <i className={iconClassName}></i>
        </span>
        <div className="input-group  bootstrap-touchspin bootstrap-touchspin-injected">
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
          <span className="input-group-btn-vertical">
            <button
              className="btn btn-primary bootstrap-touchspin-up glyphicon glyphicon-plus"
              type="button"
              onClick={onIncrement}
            >
              +
            </button>
            <button
              className="btn btn-primary bootstrap-touchspin-down glyphicon glyphicon-minus"
              type="button"
              onClick={onDecrement}
            >
              -
            </button>
          </span>
        </div>
      </div>
      <div className="invalid-feedback">{errorMsg}</div>
    </Fragment>
  );
};
