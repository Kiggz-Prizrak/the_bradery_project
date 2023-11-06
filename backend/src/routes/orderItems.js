const express = require("express");
const orderItemsController = require("../controllers/orderItems");

const router = express.Router();

router.post("/", orderItemsController.createOrderItem);
router.get("/", orderItemsController.getAllOrderItems);
router.get("/:id", orderItemsController.getOneOrderItem);

module.exports = router;


