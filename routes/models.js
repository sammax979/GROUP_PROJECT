const express = require("express");
const {
  getting,
  gettingAll,
  // updating,
  deleting,
  creating,
} = require("../controllers/modelsController");

const router = express.Router();

router.route("/").get(gettingAll).post(creating);
router.route("/:id").get(getting).delete(deleting);
//router.route("/:id").get(getting).put(updating).delete(deleting);

module.exports = router;
