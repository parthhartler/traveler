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

    // case authConstants.GET_USER_SUCCESS:
    //   localStorage.setItem("userInfo", JSON.stringify(action.data.data.data));
    //   return {
    //     ...state,
    //     loading: false,
    //     user: action.data.data.data
    //   };

    // case authConstants.GET_USER_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // Logout user
    case authConstants.LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case authConstants.LOGOUT_USER_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
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
