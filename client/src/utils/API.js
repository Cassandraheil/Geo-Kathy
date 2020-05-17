import axios from "axios";

export default {
  // Gets all posts
  // getPosts: function () {
  //   return axios.get("/api/posts");
  // },

  // gets posts based on location
  getPosts: function(city, state) {
    return axios.get("/api/posts/" + city + "/" + state);
  },

  // Gets the post with the given id
  // getPost: function (id) {
  //   return axios.get("/api/posts/" + id);
  // },

  // gets the user's location based on IP
  locationLookUp: function () {
    return axios.get("http://api.ipstack.com/check?access_key=" + process.env.REACT_APP_IPSTACK_KEY + "&format=1")
  },

  // Saves a post to the database
  savePost: function (bookData) {
    return axios.post("/api/posts", bookData);
  },
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  searchUser: function(userName) {
    return axios.get("api/users/"+userName)
  },
  yelpCall: function (location, term) {
    return axios.get(
    'https://cors-anywhere.herokuapp.com/'+
    "https://api.yelp.com/v3/businesses/search?location="+ location.city + location.state, {
      headers: {
        Authorization: 'Bearer '+ process.env.REACT_APP_API_KEY,
      },
      params: {
        categories: term //restaurant to begin
      }
        // .then((res) => {
        //   console.log(res)
        // })
        // .catch((err) => {
        //   console.log('error')
        // })
    })
  }
};
