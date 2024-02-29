const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
  getProductsByCategory
} = require("../controllers/products.controller");

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.get("/products/category/:categoria", getProductsByCategory);

module.exports = router;