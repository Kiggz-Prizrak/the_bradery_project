const express = require("express");
const ordersController = require("../controllers/orders");

const router = express.Router();

router.post("/", ordersController.createOrder);
router.get("/", ordersController.getAllOrders);
router.get("/:id", ordersController.getOneOrder);
router.delete("/:id", ordersController.deleteOrder);

module.exports = router;
