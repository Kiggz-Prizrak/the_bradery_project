const express = require("express");
const orderItemsController = require("../controllers/orderItems");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, orderItemsController.createOrderItem);
router.get("/", auth, orderItemsController.getAllOrderItems);
router.get("/:id", auth, orderItemsController.getOneOrderItem);

module.exports = router;


