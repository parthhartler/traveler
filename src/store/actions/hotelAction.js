import { hotelConstants } from "../constants";

export const hotelAction = {
  setHotelWidgetAtSearch
};

function setHotelWidgetAtSearch(data) {
  return dispatch => {
    dispatch(request(hotelConstants.HOTEL_SET_WIDGET_VALUES, data));
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
