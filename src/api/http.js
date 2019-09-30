import axios from "axios";
import Config from "../config/config.json";

axios.defaults.baseURL = Config.base_url;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use(function(config) {
  if (config.data && config.data.use_users_base_url)
    config.baseURL = Config.base_auth_url;
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, null);

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    console.log("Unexpected error ", error);
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
