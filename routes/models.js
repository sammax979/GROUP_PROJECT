const express = require("express");
const {
  getting,
  gettingAll,
  // updating,
  getModelsbyBrandId,
  deleting,
  creating,
} = require("../controllers/modelsController");

const router = express.Router();

router.route("/").get(gettingAll).post(creating);
router.route("/:id").get(getting).delete(deleting);
router.route("/brand/:id").get(getModelsbyBrandId);
//router.route("/:id").get(getting).put(updating).delete(deleting);

module.exports = router;
