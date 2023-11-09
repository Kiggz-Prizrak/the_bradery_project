const { models } = require("../models");

exports.createOrder = async (req, res) => {
  if (typeof req.body.totalPrice !== "number")
    return res.status(400).json({ message: "Please provide valid data" });

  const order = await models.Order.create({
    totalPrice: req.body.totalPrice,
    UserId: req.auth.UserId,
  });
  if (order) return res.status(201).json({ message: "order created", order });
  return res.status(404).json({ message: "Error" });
};

exports.getAllOrders = async (req, res) => {
  if (req.auth.isAdmin) {
    const orders = await models.Order.findAll({
      include: [
        {
          model: models.OrderItem,
        },
      ],
    //  order: [["createdAt", "DESC"]],
    }).catch((error) =>
      res.status(400).json({ message: "bad request", error })
    );
    return res.status(200).json(orders);
  } else {
    const orders = await models.Order.findAll({
      where: { UserId: req.auth.UserId },
      include: [
        {
          model: models.OrderItem,
        },
      ],
      order: [["createdAt", "DESC"]],
    }).catch((error) => res.status(400).json({ message: "bad request" }));
    return res.status(200).json(orders);
  }
};

exports.getOneOrder = async (req, res) => {
  if (req.auth.isAdmin) {
    const order = await models.Order.findOne({
      where: { id: req.params.id },
    }).catch((error) =>
      res.status(404).json({ message: "product not found", error })
    );
    return res.status(200).json(order);
  } else {
    order = await models.Order.findOne({
      where: { id: req.params.id, UserId: req.auth.UserId },
    }).catch((error) =>
      res.status(404).json({ message: "product not found", error })
    );
    return res.status(200).json(order);
  }
};

exports.deleteOrder = async (req, res) => {
  if (!req.auth.isAdmin)
    return res.status(401).json({ message: "Unauthorized request" });

  const order = await models.Order.findOne({
    where: { id: req.params.id },
  });

  if (order === null) {
    return res.status(404).json({ message: "Order not found" });
  }

  await models.Order.destroy({ where: { id: req.params.id } }).catch((error) =>
    res.status(400).json({ error })
  );

  return res.status(200).json({ message: "Order deleted !" });
};
