import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProducto(data);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del producto:", error);
      });
  }, [id]);

  const handleIncrement = () => {
    setCantidad((prevCantidad) => prevCantidad + 1);
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad((prevCantidad) => prevCantidad - 1);
    }
  };

  const handleAddToCart = () => {
    fetch("http://localhost:4000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario_id: 1,
        producto_id: producto.id,
        cantidad: cantidad,
      }),
    })
      .then(() => {
        // Después de agregar el producto al carrito, redirigimos al usuario al componente Cart
        window.location.href = "/cart";
      })
      .catch((error) => {
        console.error("Error al agregar el producto al carrito:", error);
      });
  };

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Detalles del Producto</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img
            src={`/imagenes-productos/${producto.imagen}`}
            alt={producto.nombre}
            style={{ maxWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {producto.nombre}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Descripción: {producto.descripcion}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Precio: ${producto.precio}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Stock: {producto.stock}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Categoría: {producto.nombre_categoria}
          </Typography>
          <div style={{ marginTop: "16px" }}>
            <TextField
              label="Cantidad"
              variant="outlined"
              type="number"
              value={cantidad}
              InputProps={{ inputProps: { min: 1 } }}
            />
            <IconButton onClick={handleIncrement}>
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleDecrement}>
              <RemoveIcon fontSize="small" />
            </IconButton>
          </div>
          <div style={{ marginTop: "16px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              component={Link}
              to="/cart"
              style={{ marginRight: "10px" }}
            >
              Agregar al carrito
            </Button>
            <Button variant="outlined" component={Link} to="/">
              Volver a la Tienda
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetailsPage;
