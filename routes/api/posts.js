const router = require("express").Router();
const postsController = require("../../controllers/postsControllers");

router.route("/")
  .get(postsController.findAll)
  .post(postsController.create);

router.route("/:location")
  .get(postsController.findByLocation)

router.route("/:id/:user")
 .put(postsController.update)

module.exports = router;