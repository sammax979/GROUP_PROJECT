const express = require("express");
const {
    homepage,
    getModelsByBrand,
    getModelById
  } = require("../controllers/homeController")
const router = express.Router();

router.route("/").get(homepage);
router.route("/:id").get(getModelsByBrand);
router.route("/model/:id").get(getModelById);

module.exports = router;