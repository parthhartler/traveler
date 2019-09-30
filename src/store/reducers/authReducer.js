import { authConstants } from "../constants";

const initialState = {
  list: [],
  data: {},
  loading: false,
  error: null,
  user: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    // Get user object
    case authConstants.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    // Logout user
    case authConstants.LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case authConstants.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        logout: action.data,
        data: {}
      };

    case authConstants.LOGOUT_USER_FAILURE:
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
