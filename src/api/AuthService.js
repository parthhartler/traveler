import http from "./http";

function login(user) {
  return http.post("/api/v1/tenant/login", user);
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

function logout() {
  return http.post("/logout");
}

export default {
  login,
  logout,
  getCurrentUser,
  getUser
};
