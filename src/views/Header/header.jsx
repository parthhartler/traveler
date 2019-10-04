import React, { Component, Fragment } from "react";
import $ from "jquery";
import logo from "../../styles/assets/images/logo.png";
import logo_blue from "../../styles/assets/images/logo_blue.png";
import { headerLinks } from "../Common/constants";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { authAction } from "../../store/actions";
import staticData from "../../config/static.service";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      language: [],
      currency: []
    };
  }

  componentDidMount() {
    $("body").on("click", ".languageCurrency", function(e) {
      $(this)
        .parent()
        .is(".show") && e.stopPropagation();
    });

    // $("body").on("click", ".btnClose", function(e) {
    //   $(".languageCurrency")
    //     .parent()
    //     .is(".show")
    //     ? $(".languageCurrency").hide()
    //     : $(".languageCurrency").css("display", "block");
    // });

    const language = staticData.language(),
      currency = staticData.currency();

    this.setState({ language, currency });
  }

  render() {
    const { whiteBackground } = this.props,
      { language, currency } = this.state,
      headerClass = whiteBackground ? "bgWhite" : "";
    return (
      <Fragment>
        <header className={headerClass}>
          <div className="navbar-responsive">
            <nav className="navbar navbar-expand-md navbar-dark">
              <a className="navbar-brand" href="/homepage">
                <img src={logo} alt="Travelers" />
              </a>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link text-uppercase" href="#">
                      english - united states
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-uppercase" href="#">
                      resource center
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-uppercase"
                      href="my-wallet.html"
                    >
                      my wallet
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-uppercase"
                      href="gift-card.html"
                    >
                      traveler rewards
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-uppercase"
                      href="my-bookings.html"
                    >
                      My Bookings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-uppercase" href="#">
                      My Account &amp; Settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-uppercase" href="#">
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="container position-relative nav-md">
            <div className="row">
              <div className="col-lg-3 col-md-3 logoWrapper">
                <a href="/homepage">
                  <img
                    src={whiteBackground ? logo_blue : logo}
                    alt="Travelers"
                  />
                </a>
              </div>
              <div className="col-lg-9 col-md-9 flex-column">
                <ul className="topMenus  d-flex justify-content-end ">
                  <li>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle state-dropdown dropdownMenuButton"
                        type="button"
                        data-toggle="dropdown"
                      >
                        <i className="material-icons">language</i>English -
                        United States $
                      </button>
                      <div className="bg-white state-popover px-3 py-4 dropdown-menu languageCurrency">
                        <div className="row">
                          <div className="col-lg-6">
                            <label>Select Language</label>
                            <select className="custom-select">
                              {language.map(item => {
                                return (
                                  <option key={item.langCode}>
                                    {item.country}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-lg-6">
                            <label htmlFor="">Select Currency</label>
                            <select className="custom-select">
                              {currency.map(item => {
                                return (
                                  <option key={item.name}>
                                    {item.name + " " + item.symbol}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-xl-12 text-right mt-3">
                            <div className="row">
                              <div className="col-xl-6 ml-auto">
                                <button
                                  type="button"
                                  className="btn btn-primary text-uppercase btn-block btnClose"
                                  onClick={this.handleChange}
                                >
                                  change
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle mainMenu"
                        type="button"
                        id="dropdownMenuButton"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-toggle="dropdown"
                      >
                        <i className="material-icons">person</i>Hi, Micheal
                      </button>
                      <div className="bg-white logOut p-2 dropdown-menu viewProfile">
                        <div className="d-flex mb-3">
                          <p className="mb-0 userBackground">
                            <span>M</span>
                          </p>
                          <div className="mb-0 ml-4 align-self-center">
                            <p className="userName">Micheal Culhane</p>
                            <a
                              //href="profile.html"
                              className="text-primary p-0 text-capitalize"
                            >
                              View Profile
                            </a>
                          </div>
                        </div>
                        <div className="d-flex pt-3 pb-3 border-bottom  pl-2">
                          <a
                            //href="my-bookings.html"
                            className="titleAnchor bgBlue"
                          >
                            Bookings
                          </a>
                        </div>
                        <div className="d-flex pt-3 pb-3 border-bottom pl-2">
                          <a //href="profile.html"
                            className="titleAnchor bgBlue"
                          >
                            My Account &amp; Settings
                          </a>
                        </div>
                        <div className="d-flex pt-3 bgBlue pb-3 pl-2">
                          <a
                            onClick={this.handleLogout}
                            className="titleAnchor bgBlue"
                          >
                            Log Out
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <li>
                    <button type="button" onClick={this.handleLogout}>
                      Logout
                    </button>
                  </li> */}
                </ul>
                <ul className="bottomMenus  d-flex justify-content-end ">
                  {headerLinks.map(li => {
                    return this.renderNavBarLink(li);
                  })}
                </ul>
              </div>
            </div>
          </div>
        </header>
      </Fragment>
    );
  }

  handleChange = () => {};

  handleLogout = async () => {
    debugger;
    await this.props.logout();
    const { error } = this.props;

    if (!error) {
      window.location = "/login";
    }
  };

  renderNavBarLink = li => {
    return (
      <li key={li.slug}>
        <NavLink
          to={li.link}
          title={li.label}
          activeClassName="active"
          onClick={this.handleClick}
        >
          {li.label}
        </NavLink>
      </li>
    );
  };

  handleClick = e => {
    e.preventDefault();
  };
}

const mapStateToProps = state => {
  const { data, loading, error } = state.authReducer;
  return {
    loading,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authAction.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

//export default Header;
