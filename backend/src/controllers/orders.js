const { models } = require("../models");
const ordersServices = require("../services/orders");

exports.createOrder = async (req, res) => {
  if (typeof req.body.totalPrice !== "number")
    return res.status(400).json({ message: "Please provide valid data" });

  const order = await ordersServices.createOrder({
    totalPrice: req.body.totalPrice,
    UserId: req.auth.UserId,
  });
  if (order) return res.status(201).json({ message: "order created", order });
  return res.status(404).json({ message: "Error" });
};

exports.getAllOrders = async (req, res) => {
  if (req.auth.isAdmin) {
    const orders = await ordersServices.allOrdersGetter();
    // const orders = await models.Order.findAll({
    //   include: [
    //     {
    //       model: models.OrderItem,
    //     },
    //   ],
    //   //  order: [["createdAt", "DESC"]],
    // }).catch((error) =>
    //   res.status(400).json({ message: "bad request", error })
    // );
    return res.status(200).json(orders);
  } else {
    const orders = await ordersServices.userOrdersGetter(req.auth.userId);
    // const orders = await models.Order.findAll({
    //   where: { UserId: req.auth.UserId },
    //   include: [
    //     {
    //       model: models.OrderItem,
    //     },
    //   ],
    //   order: [["createdAt", "DESC"]],
    // }).catch((error) => res.status(400).json({ message: "bad request" }));
    return res.status(200).json(orders);
  }
};

exports.getOneOrder = async (req, res) => {
  if (req.auth.isAdmin) {
    const order = await ordersServices.orderGetterOne(req.auth.userId, res);
    // const order = await models.Order.findOne({
    //   where: { id: req.params.id },
    // }).catch((error) =>
    //   res.status(404).json({ message: "product not found", error })
    // );
    // if (!order) {
    //   return res.status(404).json({ message: "not found" });
    // }
    // return res.status(200).json(order);
    return res.status(200).json(order);
  } else {
    const order = await ordersServices.orderGetterOneByUser(
      req.params.id,
      req.auth.UserId,
      res
    );
    return res.status(200).json(order);
  }
};

exports.deleteOrder = async (req, res) => {
  if (!req.auth.isAdmin)
    return res.status(401).json({ message: "Unauthorized request" });

  const order = await ordersServices.orderGetterOne(req.params.id, res);

  if (order === null) {
    return res.status(404).json({ message: "Order not found" });
  }

  await ordersServices.deleteOrder(req.params.id);

  return res.status(200).json({ message: "Order deleted !" });
};
