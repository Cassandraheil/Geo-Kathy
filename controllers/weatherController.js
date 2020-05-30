const axios = require("axios");
require("dotenv").config();


module.exports = {
    getWeather: function(req, res) {
        console.log("-------------------------------")
        console.log("getWeather req: ", req.body)
        console.log("-------------------------------")
        axios.get("https://api.climacell.co/v3/weather/forecast/daily?lat=" + req.body.lat + "&lon=" + req.body.lon + "&unit_system=us&start_time=now&fields=temp&apikey="+process.env.WEATHER_KEY)
        .then(function(results) {
            var temperatures = {
                minTemp: "",
                maxTemp: ""
            };
            temperatures.minTemp = results.data[0].temp[0].min.value;
            temperatures.maxTemp = results.data[0].temp[1].max.value;
            console.log(temperatures);
            res.json(temperatures);
        })
        .catch(err => console.log(err))
    }
}
