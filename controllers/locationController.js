const axios = require("axios");
const db = require("../models");

module.exports = {
  locationLookUp: function(req, res) {
    axios.get("http://api.ipstack.com/check?access_key="+process.env.LOCATION_KEY)
    .then(res => 
        res.data
      ).then(location => res.json(location))
  }
}