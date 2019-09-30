import http from "./http";

// while adding a new auth service to use the users-url ensure the use_users_base_url key is passed and set as truthy.
// this is responsible for toggling proper urls for API calls.

function login(user) {
  return http.post("/api/v1/login", { ...user, use_users_base_url: true });
}

function logout() {
  return http.post("/api/v1/logout", { use_users_base_url: true });
}

// Used for routing purpose
function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwt;
  } catch {
    return null;
  }
}

// Get use object
function getUser() {
  return http.get("/user/detail");
}

export default {
  login,
  logout,
  getCurrentUser,
  getUser
};
