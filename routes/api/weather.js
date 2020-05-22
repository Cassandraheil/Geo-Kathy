const router = require("express").Router();
const weatherController = require("../../controllers/weatherController");

// Matches with "/api/weather"
router.route("/")
    .post(weatherController.getWeather)


module.exports = router;