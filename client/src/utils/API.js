import axios from "axios";

export default {
  getWeather: function (coordinates) {
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
  barCall: function(location) {
    return axios.post("/api/bars", {location})
  },
  hotelCall: function(location) {
    return axios.post("/api/hotels", {location })
  },
  savePost: function (postData) {
    return axios.post("/api/posts", postData);
  },
  updatePost: function(postID, user){
    return axios.put("api/posts/"+postID+"/"+user)
  },
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  searchUser: function(userName) {
    return axios.get("api/users/"+userName)
  },
  getUser: function(userID) {
    return axios.post("api/users/info/" + userID)
  }
};
