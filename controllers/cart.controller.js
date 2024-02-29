const pool = require("../db");

// Obtener detalles del carrito de un usuario
const getCartDetails = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const query = `
      SELECT c.id, p.nombre AS nombre_producto, c.cantidad, p.precio 
      FROM carrito_compras c 
      INNER JOIN productos p ON c.producto_id = p.id 
      WHERE c.usuario_id = $1`;
    const { rows } = await pool.query(query, [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener detalles del carrito:", error);
    next(error);
  }
};

// Agregar un producto al carrito de un usuario
const addToCart = async (req, res, next) => {
  const { usuario_id, producto_id, cantidad } = req.body;
  try {
    const query = "INSERT INTO carrito_compras (usuario_id, producto_id, cantidad) VALUES ($1, $2, $3)";
    await pool.query(query, [usuario_id, producto_id, cantidad]);
    res.status(201).json({ message: "Producto agregado al carrito exitosamente" });
  } catch (error) {
    next(error);
  }
};

// Quitar un producto del carrito de un usuario
const removeFromCart = async (req, res, next) => {
  const { usuario_id, producto_id } = req.body;
  try {
    const query = "DELETE FROM carrito_compras WHERE usuario_id = $1 AND producto_id = $2";
    await pool.query(query, [usuario_id, producto_id]);
    res.status(200).json({ message: "Producto eliminado del carrito exitosamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCartDetails,
  addToCart,
  removeFromCart
};
