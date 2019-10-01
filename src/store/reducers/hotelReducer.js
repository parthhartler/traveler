import { hotelConstants } from "../constants";

const initialState = {
  loading: false,
  error: null,
  hotelWidget: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case hotelConstants.HOTEL_SET_WIDGET_VALUES:
      return {
        ...state,
        loading: true,
        hotelWidget: { ...action.data }
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
