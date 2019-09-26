import auth from "../../api/AuthService";
import { authConstants } from "../constants";

export const authAction = {
  login
};

function login(user) {
  return dispatch => {
    dispatch(request(authConstants.LOGIN_REQUEST));

    return auth
      .login(user)
      .then(res => {
        localStorage.setItem("token", res.data.access_token);
        dispatch(success(authConstants.LOGIN_SUCCESS, res));
      })
      .catch(error => {
        dispatch(failure(authConstants.LOGIN_FAILURE, error));
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
