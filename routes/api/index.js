const router = require("express").Router();
const postRoutes = require("./posts");
const userRoutes = require("./users");
const locationRoutes = require("./location");
const restaurantRoutes = require("./restaurants");
const weatherRoutes = require("./weather");

router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/location", locationRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/weather", weatherRoutes);

module.exports = router;