const axios = require("axios");


module.exports = {
    // locationLookUp: function () {
    //     return axios.get(
    //       // "https://cors-anywhere.herokuapp.com/"+
    //     "http://api.ipstack.com/check?access_key=" + process.env.REACT_APP_IPSTACK_KEY + "&format=1")
    //   }
  locationLookUp: function(req, res) {
    axios.get("http://api.ipstack.com/check?access_key=e8dc22e36bb38cce9e75705776e3ca42&format=1")
    .then(res => 
        res.data.city + ", " + res.data.region_code
      ).then(location => res.json(location));
      // console.log(res.data.city),
      // res.data.city && res.data.region_code && res.data.zip
  }

}