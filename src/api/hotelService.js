import http from "./http";
const querystring = require("querystring");

export const hotelService = {
  getHotelListings,
  getHotelDetails
};

function getHotelListings(data) {
  let filters = hotelListingHelper(data);
  const qs = querystring.stringify(data);
  return http.get("/api/searchHotels?" + qs + filters);
}

function getHotelDetails(data) {
  const qs = querystring.stringify(data);
  return http.get("/api/hotelDetails?" + qs);
}

function hotelListingHelper(data) {
  let filters = "";
  // star rating filter
  if (data.hasOwnProperty("starArray")) {
    const starArray = [...data.starArray];
    for (let i = 0; i < 5; i++) {
      if (starArray[i]) {
        filters += "&filters[rating][]=" + (i + 1);
        data.hasOwnProperty("starArray") && delete data["starArray"];
      }
    }
  }

  // categories filter
  if (data.hasOwnProperty("categoriesArray")) {
    const categoriesArray = [...data.categoriesArray];
    for (let i = 0; i < categoriesArray.length; i++) {
      filters += "&filters[category_ids][]=" + categoriesArray[i];
      data.hasOwnProperty("categoriesArray") && delete data["categoriesArray"];
    }
  }

  // categories filter
  if (data.hasOwnProperty("amenitiesArray")) {
    const amenitiesArray = [...data.amenitiesArray];
    for (let i = 0; i < amenitiesArray.length; i++) {
      filters += "&filters[amenities][]=" + amenitiesArray[i];
      data.hasOwnProperty("amenitiesArray") && delete data["amenitiesArray"];
    }
  }
  return filters;
}
