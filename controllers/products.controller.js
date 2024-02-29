const pool = require("../db");

// Controlador para obtener todos los productos
const getAllProducts = async (req, res, next) => {
  try {
    const query = "SELECT * FROM productos";
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener un producto por su ID
const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const query =
      "SELECT p.*, c.nombre AS nombre_categoria FROM productos p JOIN productos_categorias pc ON p.id = pc.producto_id JOIN categorias c ON pc.categoria_id = c.id WHERE p.id = $1";
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener productos por categoría
const getProductsByCategory = async (req, res, next) => {
  const { categoria } = req.params;
  try {
    const query = "SELECT * FROM productos WHERE categoria = $1";
    const { rows } = await pool.query(query, [categoria]);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
};

