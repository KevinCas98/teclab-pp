const pool = require("../db");

// Procesar el pago y guardar los detalles de facturación en la base de datos
const processPayment = async (req, res, next) => {
  const {
    nombre,
    apellido,
    dni,
    domicilio,
    email,
    provincia,
    numero_tarjeta,
    fecha_expiracion,
    cvv,
  } = req.body;
  try {
    // Guardar los detalles de facturación en la tabla detalles_facturacion
    const billingDetailsQuery = await pool.query(
      "INSERT INTO detalles_facturacion (nombre, apellido, dni, domicilio, email, provincia, numero_tarjeta, fecha_expiracion, cvv) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [
      nombre,
      apellido,
      dni,
      domicilio,
      email,
      provincia,
      numero_tarjeta,
      fecha_expiracion,
      cvv,
    ]);
    res.json(billingDetailsQuery);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  processPayment,
};
