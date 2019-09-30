import auth from "../../api/authService";
import { authConstants } from "../constants";

export const authAction = {
  login,
  logout
};

function login(user) {
  return dispatch => {
    dispatch(request(authConstants.LOGIN_REQUEST));

    return auth
      .login(user)
      .then(res => {
        auth.setLoginToken(res.data.access_token);
        dispatch(success(authConstants.LOGIN_SUCCESS, res));
      })
      .catch(error => {
        dispatch(failure(authConstants.LOGIN_FAILURE, error));
      });
  };
}

function logout() {
  return dispatch => {
    dispatch(request(authConstants.LOGOUT_USER_REQUEST));

    return auth
      .logout()
      .then(res => {
        auth.resetTokenLogout();
        dispatch(success(authConstants.LOGOUT_USER_SUCCESS, res));
      })
      .catch(error => {
        dispatch(failure(authConstants.LOGOUT_USER_FAILURE, error));
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
