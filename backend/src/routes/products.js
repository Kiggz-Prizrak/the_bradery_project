const express = require("express");
const productsController = require("../controllers/products");

const router = express.Router();

router.post("/", productsController.createProduct);
router.get("/", productsController.getallProduct);
router.get("/:id", productsController.getOneProduct);
router.put("/:id", productsController.modifyProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
