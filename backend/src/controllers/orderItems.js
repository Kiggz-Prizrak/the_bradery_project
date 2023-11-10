const { models } = require("../models");
const productServices = require("../services/products");
const ordersServices = require("../services/orderItems");

exports.createOrderItem = async (req, res) => {
  if (
    typeof req.body.name !== "string" ||
    typeof req.body.price !== "number" ||
    typeof req.body.quantity !== "number" ||
    typeof req.body.OrderId !== "number" ||
    typeof req.body.ProductId !== "number"
  ) {
    return res.status(400).json({ message: "Please provide valid data" });
  }

  const product = await productServices.productGetterOne(req.body.ProductId);
  if (!product) {
    return res.status(404).json({ message: "not found" });
  }

  if (product.inventory < req.body.quantity)
    return res.status(401).json({ message: "no stock" });

  const orderItem = await ordersServices.createOrderItem(req.body);

  if (orderItem) {
    await productServices.decrementInventory(
      req.body.quantity,
      req.body.ProductId
    );
    return res.status(201).json({ message: "orderItem created", orderItem });
  }
  return res.status(404).json({ message: "Error" });
};


