const router = require("express").Router();
const restaurantController = require("../../controllers/restaurantController");

router.route("/")
    // .get(restaurantController.yelpCall);
    .post(restaurantController.yelpCall);

module.exports = router;