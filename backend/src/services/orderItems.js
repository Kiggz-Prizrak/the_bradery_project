const { models } = require("../models");

exports.createOrderItem = (data) => {
  return models.OrderItem.create(data);
}

