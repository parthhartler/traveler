import React, { Component } from "react";
import _ from "lodash";
import staticData from "../../../config/static.service";
import review from "../../../styles/assets/images/review.png";
import { NavLink } from "react-router-dom";

class HotelListing extends Component {
  render() {
    const { hotel, currency_symbol } = this.props;
    let style = {},
      address =
        hotel.address +
        (hotel.city ? ", " + hotel.city : "") +
        (hotel.country_code ? ", " + hotel.country_code : "");

    if (hotel.image_details.count)
      style = {
        backgroundImage: `url('${hotel.image_details.prefix}0${hotel.image_details.suffix}')`
      };

    return (
      <div className="card mb-4">
        <div className="row">
          <div className="col-xl-4 col-sm-3">
            <div className="thumb position-relative">
              <a onClick={e => e.preventDefault()} className="login"></a>
              <a onClick={e => e.preventDefault()}>
                <div className="hotel-list-img placeholder-img">
                  <div className="wp-post-image loaded" style={style}></div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-xl-5 col-sm-5 pl-0 position-relative item-content">
            <div className="item-content-w h-100">
              {_.range(1, hotel.rating + 1).map(id => {
                return <i key={id} className="fa fa-star fa-rating"></i>;
              })}
              <h3 className="service-title">
                <a onClick={e => e.preventDefault()} className="text-dark">
                  {hotel.name}
                </a>
              </h3>
              <p className="shortDesc">
                Set in a redbrick building surrounded by palm trees.
              </p>
              <ul className="facilities">
                {staticData.amenities().map(amenity => {
                  if (
                    amenity.key &&
                    hotel.amenities.hasOwnProperty(amenity.key)
                  ) {
                    if (hotel.amenities[amenity.key]) {
                      return <li key={amenity.key}>{amenity.label}</li>;
                    }
                  }
                  return null;
                })}
              </ul>
              <div className="d-flex align-items-start flex-xl-row  flex-column  flex-sm-column justify-content-between justify-content-sm-end  reviewWrapper align-items-sm-start align-items-xl-center justify-content-xl-between">
                <p className="service-location mb-0 pr-0">
                  <i className="fa fa-map-marker mr-1" aria-hidden="true"></i>
                  {address}
                </p>
                <img src={review} alt="review" />
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-4 position-relative pt-4">
            <div className="price-section">
              <div className="search-title">
                <h5 className="mb-0 ml-2">
                  {_.round(hotel.rates.packages[0].savings_percentage)}% Savings
                </h5>
              </div>
              <ul className="mt-0 mt-sm-2">
                <li>
                  <span className="label">Market Price</span>
                  <span className="value">
                    {currency_symbol + hotel.rates.packages[0].public_price}
                  </span>
                </li>
                <li>
                  <span className="label">Savings</span>
                  <span className="value">
                    {currency_symbol + hotel.rates.packages[0].savings_amount}
                  </span>
                </li>
                <li className="payment-amount">
                  <span className="label">Total With Tax</span>
                  <span className="value">
                    {currency_symbol + hotel.rates.packages[0].final_price}
                  </span>
                </li>
              </ul>
            </div>
            <div className="service-price">
              <NavLink
                to={`/hotel/details/${hotel.id}`}
                className="btn btn-outline-secondary"
              >
                Select Room
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelListing;
