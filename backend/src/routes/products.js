const express = require("express");
const productsController = require("../controllers/products");
const auth = require("../middleware/auth");


const router = express.Router();

router.post("/", auth, productsController.createProduct);
router.get("/", productsController.getAllProducts);
router.get("/:id",  productsController.getOneProduct);
router.put("/:id", auth, productsController.modifyProduct);
router.delete("/:id", auth, productsController.deleteProduct);

module.exports = router;
