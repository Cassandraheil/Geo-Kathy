const axios = require("axios");
const db = require("../models");

module.exports = {
  locationLookUp: function(req, res) {
    axios.get("http://api.ipstack.com/check?access_key=e8dc22e36bb38cce9e75705776e3ca42&format=1")
    .then(res => 
        res.data
      ).then(location => res.json(location))
  }
}