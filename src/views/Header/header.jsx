import React, { Component, Fragment } from "react";
import logo from "../../styles/assets/images/logo.png";
import logo_blue from "../../styles/assets/images/logo_blue.png";
import { headerLinks } from "../Common/constants";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { authAction } from "../../store/actions";

class Header extends Component {
  render() {
    const { whiteBackground } = this.props,
      headerClass = whiteBackground ? "bgWhite" : "";
    return (
      <Fragment>
        <header className={headerClass}>
          {/* <div className="navbar-responsive">
          <nav className="navbar navbar-expand-md navbar-dark">
            <a className="navbar-brand" href="#">
              <img src="../../assets/images/logo.png" alt="Travelers" />
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
                  <a className="nav-link text-uppercase" href="my-wallet.html">
                    my wallet
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-uppercase" href="gift-card.html">
                    traveler rewards
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-uppercase" href="my-bookings.html">
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
        </div> */}
          <div className="container position-relative nav-md">
            <div className="row">
              <div className="col-lg-3 col-md-3 logoWrapper">
                <a href="#">
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
                      >
                        <i className="material-icons">language</i>English -
                        United States $
                      </button>
                      <div className="bg-white state-popover px-3 py-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <label>Select Language</label>
                            <select className="custom-select">
                              <option>English (US)</option>
                              <option>English (US)</option>
                              <option>Czech (Czech Republic)</option>
                              <option>Chinese (Simplified)</option>
                              <option>Turkish (Turkey)</option>
                              <option>Thai (Thailand)</option>
                              <option>Swedish (Sweden)</option>
                              <option>Russian (Russia)</option>
                              <option>Portuguese (Portugal) </option>
                              <option>Portuguese (Brazil)</option>
                              <option>Polish (Poland)</option>
                              <option>Norwegian (Nynorsk)</option>
                              <option>Dutch (Netherlands)</option>
                              <option>Malay (Malaysia)</option>
                              <option>Korean (Korea)</option>
                              <option>Japanese (Japan)</option>
                              <option>Italian (Italy)</option>
                              <option>Indonesian (Indonesia)</option>
                              <option>French (France)</option>
                              <option>French (Canada)</option>
                              <option>Finnish (Finland)</option>
                              <option>Spanish (Mexico)</option>
                              <option>Spanish (Spain)</option>
                              <option>Greek (Greece)</option>
                              <option>German (Germany)</option>
                              <option>Danish (Denmark)</option>
                              <option>Arabic (Saudi Arabia)</option>
                              <option>Chinese (Traditional)</option>
                              <option>Vietnamese (Viet Nam)</option>
                            </select>
                          </div>
                          <div className="col-lg-6">
                            <label htmlFor="">Select Currency</label>
                            <select className="custom-select">
                              <option>Dolllar $ </option>
                              <option>US Dollar $</option>
                              <option>Pound Sterling Â£</option>
                              <option>Euro â‚¬</option>
                              <option>Australian Dollar AU$</option>
                              <option>Singapore Dollar S$</option>
                              <option>Yen Â¥</option>
                              <option>Afghani Ø‹</option>
                              <option>Lek Lek</option>
                              <option>Algerian Dinar Ø¯.Ø¬</option>
                              <option>Kwanza Kz</option>
                              <option>East Caribbean Dollar C$</option>
                              <option>Argentine Peso $</option>
                              <option>Armenian Dram </option>
                              <option>Aruban Florin Æ’</option>
                              <option>Azerbaijanian Manat Ð¼Ð°Ð½</option>
                              <option>Bahamian Dollar BS$</option>
                              <option>Bahraini Dinar BD</option>
                              <option>Taka à§³</option>
                              <option>Barbados Dollar BB$</option>
                              <option>Belarussian Ruble p.</option>
                              <option>Belize Dollar BZ$</option>
                              <option>CF Franc BCEAO CFA</option>
                              <option>Bermudian Dollar BM$</option>
                              <option>Ngultrum Nu</option>
                              <option>Indian Rupee â‚¹</option>
                              <option>Boliviano $b</option>
                              <option>Mvdol $b</option>
                              <option>Convertible Mark KM</option>
                              <option>Pula P</option>
                              <option>Norwegian Krone kr</option>
                              <option>Brazilian Real R$</option>
                              <option>Brunei Dollar BN$</option>
                              <option>Bulgarian Lev Ð»Ð²</option>
                              <option>Burundi Franc BIF</option>
                              <option>Riel áŸ›</option>
                              <option>CF Franc BEAC </option>
                              <option>Canadian Dollar CAD$</option>
                              <option>Cabo Verde Escudo $</option>
                              <option>Cayman Islands Dollar KYD$</option>
                              <option>Unidad de Fomento </option>
                              <option>Chilean Peso $</option>
                              <option>Yuan Renminbi Â¥</option>
                              <option>Colombian Peso $</option>
                              <option>Unidad de Valor Real </option>
                              <option>Comoro Franc </option>
                              <option>Congolese Franc </option>
                              <option>New Zealand Dollar NZD$</option>
                              <option>Cost Rican Colon â‚¡</option>
                              <option>Croatian Kuna kn</option>
                              <option>Peso Convertible </option>
                              <option>Cuban Peso â‚±</option>
                              <option>Netherlands Antillean Guilder Æ’</option>
                              <option>Czech Koruna KÄ</option>
                              <option>Danish Krone kr</option>
                              <option>Djibouti Franc </option>
                              <option>Dominican Peso RD$</option>
                              <option>Egyptian Pound Â£</option>
                              <option>El Salvador Colon $</option>
                              <option>Nakfa </option>
                              <option>Ethiopian Birr </option>
                              <option>Falkland Islands Pound Â£</option>
                              <option>Fiji Dollar FJD$</option>
                              <option>CFP Franc </option>
                              <option>Dalasi </option>
                              <option>Lari </option>
                              <option>Ghan Cedi </option>
                              <option>Gibraltar Pound Â£</option>
                              <option>Quetzal Q</option>
                              <option>Guine Franc </option>
                              <option>Guyan Dollar GYD$</option>
                              <option>Gourde </option>
                              <option>Lempira L</option>
                              <option>Hong Kong Dollar HKD$</option>
                              <option>Forint Ft</option>
                              <option>Iceland Krona kr</option>
                              <option>Rupiah Rp</option>
                              <option>SDR (Special Drawing Right) </option>
                              <option>Iranian Rial ï·¼&lt; </option>
                              <option>Iraqi Dinar </option>
                              <option>New Israeli Sheqel â‚ª</option>
                              <option>Jamaican Dollar JMD$</option>
                              <option>Jordanian Dinar </option>
                              <option>Tenge Ð»Ð²</option>
                              <option>Kenyan Shilling </option>
                              <option>North Korean Won â‚©</option>
                              <option>Won â‚©</option>
                              <option>Kuwaiti Dinar </option>
                              <option>Som Ð»Ð²</option>
                              <option>Kip â‚&shy;</option>
                              <option>Lebanese Pound Â£</option>
                              <option>Loti </option>
                              <option>Rand R</option>
                              <option>Liberian Dollar LRD$</option>
                              <option>Libyan Dinar </option>
                              <option>Swiss Franc CHF</option>
                              <option>Lithuanian Litas Lt</option>
                              <option>Pataca </option>
                              <option>Denar Ð´ÐµÐ½</option>
                              <option>Malagasy riary </option>
                              <option>Kwacha </option>
                              <option>Malaysian Ringgit RM</option>
                              <option>Rufiyaa </option>
                              <option>Ouguiya </option>
                              <option>Mauritius Rupee â‚¨</option>
                              <option>ADB Unit of ccount </option>
                              <option>Mexican Peso $</option>
                              <option>
                                Mexican Unidad de Inversion (UDI){" "}
                              </option>
                              <option>Moldovan Leu </option>
                              <option>Tugrik â‚®</option>
                              <option>Moroccan Dirham </option>
                              <option>Mozambique Metical MT</option>
                              <option>Kyat </option>
                              <option>Namibi Dollar NAD$</option>
                              <option>Nepalese Rupee â‚¨</option>
                              <option>Cordob Oro C$</option>
                              <option>Naira â‚¦</option>
                              <option>Rial Omani ï·¼&lt; </option>
                              <option>Pakistan Rupee â‚¨</option>
                              <option>Balboa B/.</option>
                              <option>Kina K</option>
                              <option>Guarani Gs</option>
                              <option>Nuevo Sol S/.</option>
                              <option>Philippine Peso â‚±</option>
                              <option>Zloty zÅ‚</option>
                              <option>Qatari Rial ï·¼</option>
                              <option>New Romanian Leu lei</option>
                              <option>Russian Ruble Ñ€ÑƒÐ±</option>
                              <option>Rwand Franc Râ‚£</option>
                              <option>Saint Helen Pound Â£</option>
                              <option>Tala $</option>
                              <option>Dobra </option>
                              <option>Saudi Riyal ï·¼</option>
                              <option>Serbian Dinar Ð”Ð¸Ð½.</option>
                              <option>Seychelles Rupee â‚¨</option>
                              <option>Leone Le</option>
                              <option>Sucre </option>
                              <option>Solomon Islands Dollar SBD$</option>
                              <option>Somali Shilling S</option>
                              <option>South Sudanese Pound </option>
                              <option>Sri Lank Rupee â‚¨</option>
                              <option>Sudanese Pound </option>
                              <option>Surinam Dollar SRD$</option>
                              <option>Lilangeni </option>
                              <option>Swedish Krona kr</option>
                              <option>WIR Euro </option>
                              <option>WIR Franc </option>
                              <option>Syrian Pound Â£</option>
                              <option>New Taiwan Dollar NT$</option>
                              <option>Somoni </option>
                              <option>Tanzanian Shilling </option>
                              <option>Baht à¸¿</option>
                              <option>Paâ€™anga </option>
                              <option>Trinidad nd Tobago Dollar TT$</option>
                              <option>Tunisian Dinar </option>
                              <option>Turkish Lira â‚º</option>
                              <option>Turkmenistan New Manat </option>
                              <option>Ugand Shilling </option>
                              <option>Hryvnia â‚´</option>
                              <option>UAE Dirham </option>
                              <option>US Dollar (Next day) USN</option>
                              <option>
                                Uruguay Peso en Unidades Indexadas (URUIURUI){" "}
                              </option>
                              <option>Peso Uruguayo $U</option>
                              <option>Uzbekistan Sum Ð»Ð²</option>
                              <option>Vatu </option>
                              <option>Bolivar Bs</option>
                              <option>Dong â‚«</option>
                              <option>Yemeni Rial ï·¼</option>
                              <option>Zambian Kwacha </option>
                              <option>Zimbabwe Dollar ZWL$</option>
                            </select>
                          </div>
                          <div className="col-xl-12 text-right mt-3">
                            <div className="row">
                              <div className="col-xl-6 ml-auto">
                                <button
                                  type="button"
                                  className="btn btn-primary text-uppercase btn-block"
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
                      >
                        <i className="material-icons">person</i>Hi, Micheal
                      </button>
                      <div className="bg-white logOut p-2">
                        <div className="d-flex mb-3">
                          <p className="mb-0 userBackground">
                            <span>M</span>
                          </p>
                          <div className="mb-0 ml-4 align-self-center">
                            <p className="userName">Micheal Culhane</p>
                            <a
                              href="profile.html"
                              className="text-primary p-0 text-capitalize"
                            >
                              View Profile
                            </a>
                          </div>
                        </div>
                        <div className="d-flex pt-3 pb-3 border-bottom  pl-2">
                          <a
                            href="my-bookings.html"
                            className="titleAnchor bgBlue"
                          >
                            My Bookings
                          </a>
                        </div>
                        <div className="d-flex pt-3 pb-3 border-bottom pl-2">
                          <a href="profile.html" className="titleAnchor bgBlue">
                            My Account &amp; Settings
                          </a>
                        </div>
                        <div className="d-flex pt-3 bgBlue pb-3 pl-2">
                          <a href="login.html" className="titleAnchor bgBlue">
                            Log Out
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button type="button" onClick={this.handleLogout}>
                      Logout
                    </button>
                  </li>
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

  handleLogout = async () => {
    await this.props.logout();
    const { error } = this.props;

    if (!error) {
      window.location = "/login";
    }
  };

  renderNavBarLink = li => {
    return (
      <li key={li.slug}>
        <NavLink to={li.link} title={li.label} activeClassName="active">
          {li.label}
        </NavLink>
      </li>
    );
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
