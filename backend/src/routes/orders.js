const express = require("express");
const ordersController = require("../controllers/");

const router = express.Router();

router.post("/", ordersController.createOrder);
router.get("/", ordersController.getAllOrders);
router.get("/:id", ordersController.getOneOrder);
router.delete("/:id", ordersController.deleteOneOrder);

module.exports = router;
