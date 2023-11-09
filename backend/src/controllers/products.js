const { models } = require("../models");
const productServices = require("../services/products");

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

  const product = productServices.createProduct(req.body);
  if (product) return res.status(201).json({ message: "product created" });
  return res.status(404).json({ message: "Error" });
};

exports.getAllProducts = async (req, res) => {
  const products = await productServices.productsGetter();
  return res.status(200).json(products);
};

exports.getOneProduct = async (req, res) => {
  const product = await productServices.productGetterOne(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "not found" });
  }
  return res.status(200).json(product);
};

exports.modifyProduct = async (req, res) => {
  if (!req.auth.isAdmin)
    return res.status(401).json({ message: "Unauthorized request" });

  const productModifier = await productServices.productGetterOne(req.params.id);
  if (!productModifier) {
    return res.status(404).json({ message: "not found" });
  }

  if (
    typeof req.body.name !== "string" ||
    typeof req.body.price !== "number" ||
    typeof req.body.inventory !== "number"
  ) {
    return res.status(400).json({ message: "Please provide valid data" });
  }

  await productServices.updateProduct(req.body, req.params.id);

  const product = await productServices.productGetterOne(req.params.id);
  if (!productModifier) {
    return res.status(404).json({ message: "not found" });
  }
  return res.status(200).json({ message: "Product edited", product });
};

exports.deleteProduct = async (req, res) => {
  if (!req.auth.isAdmin)
    return res.status(401).json({ message: "Unauthorized request" });

  const product = await productServices.productGetterOne(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "not found" });
  }

  await productServices.deleteProduct(req.params.id);

  return res.status(200).json({ message: "Objet supprimé !" });
};
