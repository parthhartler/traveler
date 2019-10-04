import { hotelConstants } from "../constants";
import { hotelService } from "../../api/hotelService";

export const hotelAction = {
  setHotelWidgetAtSearch,
  getHotelListings
};

function setHotelWidgetAtSearch(data) {
  return dispatch => {
    dispatch(request(hotelConstants.HOTEL_SET_WIDGET_VALUES, data));
  };
}

function getHotelListings(data) {
  return dispatch => {
    dispatch(request(hotelConstants.HOTEL_GET_LISTINGS));

    return hotelService
      .getHotelListings(data)
      .then(res => {
        dispatch(success(hotelConstants.HOTEL_GET_LISTINGS_SUCCESS, res));
      })
      .catch(error => {
        dispatch(failure(hotelConstants.HOTEL_GET_LISTINGS_FAILURE, error));
      });
  };
}

function request(action, data) {
  return { type: action, data };
}

function success(action, data) {
  return { type: action, data };
}

function failure(action, error) {
  return { type: action, error };
}
