const { models } = require("../models");

exports.createProduct = async (req, res) => {
  if (!req.auth.isAdmin)
    return res.status(401).json({ message: "Unauthorized request" });

  if (
    typeof req.body.name !== "string" ||
    typeof req.body.price !== "number" ||
    typeof req.body.inventory !== "number"
  ) {
    return res.status(400).json({ message: "Please provide valid data" });
  }

  const product = models.Product.create({
    name: req.body.name,
    price: req.body.price,
    inventory: req.body.inventory,
  });
  if (product)
    return res.status(201).json({ message: "product created", product });
  return res.status(404).json({ message: "Error" });
};

exports.getAllProducts = async (req, res) => {
  const products = await models.Product.findAll({
    order: [["createdAt", "DESC"]],
  }).catch((error) => res.status(400).json({ message: "bad request", error }));
  return res.status(200).json(products);
};

exports.getOneProduct = async (req, res) => {
  const product = await models.Product.findOne({
    where: { id: req.params.id },
  }).catch((error) =>
    res.status(404).json({ message: "product not found", error })
  );
  return res.status(200).json(product);
};

exports.modifyProduct = async (req, res) => {
  if (!req.auth.isAdmin)
    return res.status(401).json({ message: "Unauthorized request" });

  const productModifier = await models.Product.findOne({
    where: { id: req.params.id },
  });
  if (productModifier === null) {
    return res.status(404).json({ message: "product not found" });
  }

  if (
    typeof req.body.name !== "string" ||
    typeof req.body.price !== "number" ||
    typeof req.body.inventory !== "number"
  ) {
    return res.status(400).json({ message: "Please provide valid data" });
  }

  await models.Product.update(
    { ...req.body, id: req.params.id },
    { where: { id: req.params.id } }
  ).catch((error) => res.status(400).json({ error }));

  const product = await models.Product.findOne({
    where: { id: req.params.id },
  });

  return res.status(200).json({ message: "Product edited", product });
};

exports.deleteProduct = async (req, res) => {

  if (!req.auth.isAdmin)
    return res.status(401).json({ message: "Unauthorized request" });
 
    const product = await models.Product.findOne({
    where: { id: req.params.id },
  });

  if (product === null) {
    return res.status(404).json({ message: "Product not found" });
  }

  await models.Product.destroy({ where: { id: req.params.id } }).catch((error) =>
    res.status(400).json({ error })
  );

  return res.status(200).json({ message: "Objet supprimé !" });
};
