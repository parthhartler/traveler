import http from "./http";
const querystring = require("querystring");

export const hotelService = {
  getHotelListings
};

function getHotelListings(data) {
  let filters = "";
  if (data.hasOwnProperty("starArray")) {
    const starArray = [...data.starArray];
    for (let i = 0; i < 5; i++) {
      if (starArray[i]) {
        filters += "&filters[rating][]=" + (i + 1);
        data.hasOwnProperty("starArray") && delete data["starArray"];
      }
    }
  }
  const qs = querystring.stringify(data);
  return http.get("/api/searchHotels?" + qs + filters);
}
