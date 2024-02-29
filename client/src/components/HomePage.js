import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import "../index.css";

const HomePage = () => {
  // Definimos el estado para almacenar los productos
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realizar solicitud GET al backend para obtener los productos
    fetch("http://localhost:4000/products")
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado con los productos recibidos
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  }, []);

  return (
    <div>
      <h1>Bienvenido/a</h1>
      <Grid container spacing={2}>
        {productos.map((producto) => (
          <Grid item key={producto.id} xs={12} sm={6} md={4} lg={3}>
            <Link
              to={`/product/${producto.id}`}
              style={{ textDecoration: "none" }}
            >
            <Card>
              <CardMedia
                component="img"
                height="200"
                className="card-img"
                image={`/imagenes-productos/${producto.imagen}`} // Ruta relativa a la carpeta public
                alt={producto.nombre}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {producto.nombre}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Precio: ${producto.precio}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
