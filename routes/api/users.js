const router = require("express").Router();
const userController = require("../../controllers/usersControllers");

router.route("/")
  .post(userController.create);

module.exports = router;