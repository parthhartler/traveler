import React, { Component, Fragment } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoutes from "../../components/protectedRoutes";
import HotelSearchWrapper from "./SearchListing/hotelSearchWrapper";
import HotelDetailsWrapper from "./HotelDetails/hotelDetailsWrapper";
import Loader from "../../components/Loader/Loader";

class HotelIndex extends Component {
  render() {
    const { loading } = this.props;
    return (
      <Fragment>
        {loading && <Loader isLoading={loading} />}
        <Switch>
          <ProtectedRoutes
            path="/hotel/search"
            component={HotelSearchWrapper}
          />
          <ProtectedRoutes
            path="/hotel/details/:id"
            component={HotelDetailsWrapper}
          />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { loading, error } = state.hotelReducer;

  return {
    loading,
    error
  };
};

export default connect(
  mapStateToProps,
  null
)(HotelIndex);
