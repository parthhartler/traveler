import { hotelConstants } from "../constants";

const initialState = {
  loading: false,
  error: null,
  hotelWidget: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case hotelConstants.HOTEL_SET_WIDGET_VALUES:
      localStorage.setItem("hotelWidget", JSON.stringify({ ...action.data }));
      return {
        ...state,
        loading: true,
        hotelWidget: { ...action.data }
      };
    case hotelConstants.HOTEL_GET_LISTINGS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case hotelConstants.HOTEL_GET_LISTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        hotelListingsData: { ...action.data }
      };
    case hotelConstants.HOTEL_GET_LISTINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
