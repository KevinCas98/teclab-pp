const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const productRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const paymentRoutes = require("./routes/payment.routes")

const app = express();

app.use(express.static("dist"));
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

app.use(productRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(4000);
console.log("Server on Port 4000");