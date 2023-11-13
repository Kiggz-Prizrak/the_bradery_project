const { models } = require("../models");

exports.createOrder = (data) => {
  return models.Order.create(data);
};

//user getter
exports.userOrdersGetter = (id) => {
  console.log(id)
   return models.Order.findAll({
     where: { UserId: id },
     include: [
       {
         model: models.OrderItem,
       },
     ],
     order: [["createdAt", "DESC"]],
   }).catch((error) => res.status(400).json({ message: "bad request",  }));
};

//admin getter
exports.allOrdersGetter = () => {
  return models.Order.findAll({
    include: [
      {
        model: models.OrderItem,
      },
    ],
    //  order: [["createdAt", "DESC"]],
  }).catch((error) => res.status(400).json({ message: "bad request", error }));
};

//admin getter
exports.orderGetterOne = (id, res) => {
  return models.Order.findOne({
    where: { id },
  }).catch((error) =>
    res.status(404).json({ message: "product not found", error })
  );
}
//user getter
exports.orderGetterOneByUser = (id, res) => {
  return models.Order.findOne({
    where: { id },
  }).catch((error) =>
    res.status(404).json({ message: "product not found", error })
  );
}

exports.deleteOrder = (id) => {
  return models.Order.destroy({ where: { id } }).catch((error) =>
    res.status(400).json({ error })
  );
}