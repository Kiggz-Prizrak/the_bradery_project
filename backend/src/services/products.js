const { models } = require("../models");

exports.createProduct = (data) => {
  return models.Product.create(data);
};

exports.productsGetter = () => {
  return models.Product.findAll({
    order: [["createdAt", "DESC"]],
  }).catch((error) => res.status(400).json({ message: "bad request", error }));
};

exports.productGetterOne = (id) => {
  return models.Product.findOne({
    where: { id },
  }).catch((error) =>
    res.status(404).json({ message: "product not found", error })
  );
}

exports.updateProduct = (data, id) => {
  return models.Product.update( data,
    { where: { id } }
  ).catch((error) => res.status(400).json({ error }));
}

exports.deleteProduct = (id) => {
  models.Product.destroy({ where: { id } }).catch((error) =>
    res.status(400).json({ error })
  );
}

exports.decrementInventory = (quantity, id) => {
  return models.Product.increment(
    { inventory: -quantity },
    { where: { id } }
  );
}

