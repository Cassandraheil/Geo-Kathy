import axios from "axios";

export default {
  getWeather: function (lat, lon) {
    console.log('weather, lat and lon', lat, lon);
    return axios.get(`https://api.climacell.co/v3/weather/forecast/daily?lat=${lat}&lon=${lon}&unit_system=us&start_time=now&fields=temp&apikey=Us2CFeiIzNLHOM3yuTYilaSFcgDsoYpe`)
  },
  // Gets all posts
  // getPosts: function () {
  //   return axios.get("/api/posts");
  // },

 // gets posts based on location
  // getPosts: function(city, state) {
  //   return axios.get("/api/posts/" + city + "/" + state);
  // },

  getPosts: function(location) {
    return axios.get("/api/posts/" + location);
  },
  
  // Gets the post with the given id
  // getPost: function (id) {
  //   return axios.get("/api/posts/" + id);
  // },

  // gets the user's location based on IP
  // locationLookUp: function () {
  //   return axios.get(
  //     // "https://cors-anywhere.herokuapp.com/"+
  //   "http://api.ipstack.com/check?access_key=" + process.env.REACT_APP_IPSTACK_KEY + "&format=1")
  // },

  locationLookUp: function() {
    return axios.get("/api/location");
  },
  yelpCall: function(location) {
    // return axios.get("/api/restaurants", { headers: { location }});
    return axios.post("/api/restaurants", { location })
  },

  // Saves a post to the database
  savePost: function (postData) {
    return axios.post("/api/posts", postData);
  },
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  searchUser: function(userName) {
    return axios.get("api/users/"+userName)
  },
  // yelpCall: function (location, term) {
  //   return axios.get(
  //   'https://cors-anywhere.herokuapp.com/'+
  //   "https://api.yelp.com/v3/businesses/search?location="+ location, {
  //     headers: {
  //       Authorization: 'Bearer '+ process.env.REACT_APP_API_KEY,
  //     },
  //     params: {
  //       categories: term //restaurant to begin
  //     }
  //       // .then((res) => {
  //       //   console.log(res)
  //       // })
  //       // .catch((err) => {
  //       //   console.log('error')
  //       // })
  //   })
  // }
};
