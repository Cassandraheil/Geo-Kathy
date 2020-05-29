const router = require("express").Router();
const barController = require("../../controllers/barController");

router.route("/")
    .post(barController.yelpCall);

module.exports = router;