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
   return axios.get("http://api.ipstack.com/check?access_key=e8dc22e36bb38cce9e75705776e3ca42&format=1")
    .then(res => {
      console.log("res.data", res.data)
      return res.data
    }
       
      )
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
  },

  //updateLocation: function(userID, location) {
    // return axios.put("api/NewRoute", { userLocation: location, userID })
  //}
};
