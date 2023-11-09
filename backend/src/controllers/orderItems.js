const { models } = require("../models");

exports.createOrderItem = async (req, res) => {
  console.log(req.body);
  if (
    typeof req.body.name !== "string" ||
    typeof req.body.price !== "number" ||
    typeof req.body.quantity !== "number" ||
    typeof req.body.OrderId !== "number" ||
    typeof req.body.ProductId !== "number"
  ) {
    return res.status(400).json({ message: "Please provide valid data" });
  }

  const product = await models.Product.findOne({
    where: { id: req.body.ProductId },
  });
  if (product.inventory < req.body.quantity)
    return res.status(401).json({ message: "no stock" });

  const orderItem = models.OrderItem.create({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    OrderId: req.body.OrderId,
    ProductId: req.body.ProductId,
  });

  if (orderItem) {
    await models.Product.increment(
      { inventory: -req.body.quantity },
      { where: { id: req.body.ProductId } }
    );

    return res.status(201).json({ message: "orderItem created", orderItem });
  }
  return res.status(404).json({ message: "Error" });
};

exports.getAllOrderItems = async (req, res) => {
  const orderItems = await models.OrderItem.findAll({
    include: [
      {
        model: models.Order,
      },
      {
        model: models.Product,
      },
    ],
    order: [["createdAt", "DESC"]],
  }).catch((error) => res.status(404).json({ error }));
  return res.status(200).json(orderItems);
};

exports.getOneOrderItem = (req, res) => {};
