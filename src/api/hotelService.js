import http from "./http";
const querystring = require("querystring");

export const hotelService = {
  getHotelListings
};

function getHotelListings(data) {
  const qs = querystring.stringify(data);
  return http.get("/api/searchHotels?" + qs);
}
