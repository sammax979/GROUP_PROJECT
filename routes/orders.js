const express = require("express");
const {
  getting,
  gettingAll,
  updating,
  deleting,
  creating,
  allItems,
} = require("../controllers/ordersController");

const router = express.Router();

router.route("/").get(gettingAll).post(creating);
router.route("/:id").get(getting).put(updating).delete(deleting);

router.get("/:id/allitems", allItems);

module.exports = router;
