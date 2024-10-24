const express = require("express");
const {
    //allModelsByBrand,
    getting,
    gettingAll,
    updating,
    deleting,
    creating,
  } = require("../controllers/brandsController")
const router = express.Router();

router.route("/").get(gettingAll).post(creating);
router.route("/:id").get(getting).put(updating).delete(deleting);

// router.get("/:id/models", allModelsByBrand)

module.exports = router;
