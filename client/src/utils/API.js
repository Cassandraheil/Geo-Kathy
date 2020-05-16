import axios from "axios";

export default {
  // Gets all books
  getPosts: function () {
    return axios.get("/api/posts");
  },
  // Gets the book with the given id
  getPost: function (id) {
    return axios.get("/api/posts/" + id);
  },
  //   // Deletes the book with the given id
  //   deleteBook: function(id) {
  //     return axios.delete("/api/books/" + id);
  //   },

  locationLookUp: function () {
    return axios.get("http://api.ipstack.com/check?access_key=" + process.env.REACT_APP_IPSTACK_KEY + "&format=1")
  },
  // Saves a book to the database
  savePost: function (bookData) {
    console.log("this is the data", bookData)
    return axios.post("/api/posts", bookData);
  },
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  searchUser: function(userName){
    return axios.get("api/users/"+userName)
  },
  yelpCall: function (location, term) {
    console.log("location:", location, "term:", term)
    return axios.get(
      'https://cors-anywhere.herokuapp.com/'+
      "https://api.yelp.com/v3/businesses/search?location="+ location, {
      headers: {
        Authorization: 'Bearer '+ process.env.REACT_APP_API_KEY
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
