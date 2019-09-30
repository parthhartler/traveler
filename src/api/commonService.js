import http from "./http";

function destinationAutoComplete(query) {
  return http.get("/api/autosuggest?term=" + query);
}

export default {
  destinationAutoComplete
};
