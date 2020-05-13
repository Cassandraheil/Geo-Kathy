const router = require("express").Router();
const postsController = require("../../controllers/postsControllers");

// Matches with "/api/books"
router.route("/")
  .get(postsController.findAll)
  .post(postsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(postsController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
