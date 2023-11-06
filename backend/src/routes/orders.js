const express = require("express");
const ordersController = require("../controllers/orders");
const auth = require("../middleware/auth");


const router = express.Router();

router.post("/", auth, ordersController.createOrder);
router.get("/", auth, ordersController.getAllOrders);
router.get("/:id", auth, ordersController.getOneOrder);
router.delete("/:id", auth, ordersController.deleteOrder);

module.exports = router;
