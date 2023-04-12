const express = require("express");
const { productController } = require("../controllers");
const router = express.Router();

router.get("/product", productController.fetchAllProducts);
router.get("/product/:id", productController.fetchProduct);
router.get("/sort/:id", productController.sortProduct);
module.exports = router;
