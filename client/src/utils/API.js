import axios from "axios";

export default {
  getWeather: function (coordinates) {
    console.log("API page lat, lon: ", coordinates)
    return axios.post("/api/weather", coordinates)
  },
  getPosts: function(location) {
    return axios.get("/api/posts/" + location);
  },
  locationLookUp: function() {
    return axios.get("/api/location");
  },
  yelpCall: function(location) {
    return axios.post("/api/restaurants", { location })
  },
  savePost: function (postData) {
    return axios.post("/api/posts", postData);
  },
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  searchUser: function(userName) {
    return axios.get("api/users/"+userName)
  }
};
