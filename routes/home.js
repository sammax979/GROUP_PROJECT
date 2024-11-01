const express = require("express");
const {
    homepage,
    getModelsByBrand,
  } = require("../controllers/homeController")
const router = express.Router();

router.route("/").get(homepage);
router.route("/:id").get(getModelsByBrand);

module.exports = router;