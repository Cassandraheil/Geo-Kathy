const axios = require("axios");
var hotelsInArea = [];

module.exports = {
  yelpCall: function(req, res) {
    console.log(req.body.location);
    axios.get("https://api.yelp.com/v3/businesses/search?location="+ req.body.location, {
      headers: {
        Authorization: 'Bearer '+ process.env.YELP_KEY,
      },
      params: {
        categories: "hotels"
      }})
    .then(function(res) {
        hotelsInArea = []
        for (var i=0; i< res.data.businesses.length; i++) {
            var data = res.data.businesses[i];
            hotelsInArea.push({
              name: data.name,
              address: {
                address1: data.location.address1,
                city: data.location.city,
                state: data.location.state,
                zip: data.location.zip_code
              },
              phone: data.display_phone,
              img: data.image_url,
              url: data.url,
              rating: data.rating,
              distance: data.distance * 0.000621371,
              isClosed: data.is_closed
            })
          } 
          function compare(a, b) {
            const bandA = a.distance;
            const bandB = b.distance;
            
            let comparison = 0;
            if (bandA > bandB) {
              comparison = 1;
            } else if (bandA < bandB) {
              comparison = -1;
            }
            return comparison;
          }
          hotelsInArea.sort(compare);
        })
        .then(results => res.json(hotelsInArea))
        .catch(err => console.log(err))
  }
}