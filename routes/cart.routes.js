const { Router } = require("express");
const router = Router();

// Importar el controlador del carrito
const { getCartDetails, addToCart, removeFromCart } = require("../controllers/cart.controller");

// Definir las rutas para el carrito
router.get("/cart/:userId", getCartDetails); // Obtener detalles del carrito de un usuario
router.post("/cart/:userId/add", addToCart); // Agregar un producto al carrito de un usuario
router.post("/cart/:userId/remove", removeFromCart); // Quitar un producto del carrito de un usuario

module.exports = router;