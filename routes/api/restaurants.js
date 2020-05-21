const router = require("express").Router();
const restaurantController = require("../../controllers/restaurantController");

router.route("/")
    .post(restaurantController.yelpCall);

module.exports = router;