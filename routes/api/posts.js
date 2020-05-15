const router = require("express").Router();
const postsController = require("../../controllers/postsControllers");

// Matches with "/api/posts"
router.route("/")
  .get(postsController.findAll)
  .post(postsController.create);

// Matches with "/api/posts/:id"
router
  .route("/:id")
  .get(postsController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
