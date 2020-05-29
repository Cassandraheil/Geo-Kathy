const router = require("express").Router();
const weatherController = require("../../controllers/weatherController");

router.route("/")
    .post(weatherController.getWeather)

module.exports = router;