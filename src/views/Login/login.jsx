import React, { Component, Fragment } from "react";
import { Formik } from "formik";
import { Input } from "../../components/Forms/Input";
import logo from "../../assets/images/logo.png";
import * as Yup from "yup";
import { authAction } from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends Component {
  render() {
    const { loading, error } = this.props;
    return (
      <Fragment>
        {/* <Loader isLoading={loading} /> */}
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={this.validation()}
          displayName="loginForm"
          component={formikProps => this.loginForm(formikProps, error)}
          onSubmit={this.handleSubmit}
        />
      </Fragment>
    );
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     const { data, error } = this.props;
  //     debugger;
  //     if (data.hasOwnProperty("data")) {
  //       //this.props.history.push("/homepage");
  //     }
  //   }

  handleSubmit = async (values, formikProps) => {
    this.props.login(values);
  };

  validation = () => {
    return Yup.object().shape({
      email: Yup.string().required("This field is required."),
      password: Yup.string().required("This field is required.")
    });
  };

  loginForm = (formikProps, error) => {
    const { values, handleChange, handleBlur, handleSubmit } = formikProps;
    const { data } = this.props;
    let errorMessage = "Invalid Username / Password";

    if (error && error.response === undefined) {
      errorMessage = error.message;
    }

    return (
      <Fragment>
        {data.hasOwnProperty("data") && <Redirect to={`/homepage`} />}
        <div className="login-container h-100">
          <div className="login-wrapper h-100 position-relative">
            <div className="login-overlay"></div>
            <div className="container">
              <a href="index.html" className="logoWrapper d-inline-block pt-3">
                <img src={logo} alt="Travelers" />
              </a>
            </div>
            <div className="d-flex align-items-center justify-content-center login-form">
              <div className="login-card">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}
                  <Input
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    isRequired={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    isRequired={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    className="btn btn-primary submitBtn d-block w-100 btn-signin"
                    type="submit"
                  >
                    Sign In
                  </button>
                  <div className="d-flex align-items-center">
                    <label className="customCheckbox mb-0">
                      Remember me
                      <input type="checkbox" checked />
                      <span className="checkmark"></span>
                    </label>
                    <a href="login-help.html" className="text-white ml-auto">
                      Need help?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
}

const mapStateToProps = state => {
  const { data, loading, error } = state.authReducer;
  return {
    data,
    loading,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: values => dispatch(authAction.login(values))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
