const express = require("express");
const orderItemsController = require("../controllers/orderItems");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, orderItemsController.createOrderItem);


module.exports = router;


