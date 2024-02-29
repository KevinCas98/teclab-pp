import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const CartPage = () => {
  // Definir estado para almacenar los productos en el carrito
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [totalPrecio, setTotalPrecio] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/cart/1")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Verifica la respuesta de la solicitud
        setProductosEnCarrito(data);
        // Calcular el total de los precios de los productos en el carrito
        let total = 0;
        data.forEach((producto) => {
          total += producto.cantidad * producto.precio;
        });
        setTotalPrecio(total);
      })
      .catch((error) => {
        console.error("Error al obtener los productos del carrito:", error);
      });
  }, []);

  // Función para eliminar un producto del carrito
  const eliminarProducto = (id) => {
    fetch(`http://localhost:4000/cart/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Filtrar los productos en el carrito para eliminar el producto con el ID especificado
        const productosActualizados = productosEnCarrito.filter(
          (producto) => producto.id !== id
        );
        // Actualizar el estado con los productos restantes
        setProductosEnCarrito(productosActualizados);
        // Recalcular el total de los precios de los productos en el carrito después de eliminar un producto
        let total = 0;
        productosActualizados.forEach((producto) => {
          total += producto.cantidad * producto.precio;
        });
        setTotalPrecio(total);
      })
      .catch((error) => {
        console.error("Error al eliminar el producto del carrito:", error);
      });
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const actualizarCantidad = (id, nuevaCantidad) => {
    const productosActualizados = productosEnCarrito.map((producto) => {
      if (producto.id === id) {
        return { ...producto, cantidad: nuevaCantidad };
      }
      return producto;
    });
    setProductosEnCarrito(productosActualizados);
    // Recalcular el total de los precios de los productos en el carrito después de actualizar la cantidad
    let total = 0;
    productosActualizados.forEach((producto) => {
      total += producto.cantidad * producto.precio;
    });
    setTotalPrecio(total);
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosEnCarrito.map((producto) => (
            <tr key={producto.id}>
              <td style={{ width: "40%" }}>{producto.nombre_producto}</td>
              <td>
                <input
                  type="number"
                  value={producto.cantidad}
                  onChange={(e) =>
                    actualizarCantidad(producto.id, parseInt(e.target.value))
                  }
                />
              </td>
              <td>${(producto.cantidad * producto.precio).toFixed(2)}</td>
              <td>
                <Button
                  variant="outlined"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td></td>
            <td>${totalPrecio.toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Link to="/payment">
          <Button variant="contained" color="primary">
            Proceder al Pago
          </Button>
        </Link>
        <Link to="/" style={{ textDecoration: "none", marginLeft: "10px" }}>
          <Button variant="outlined">Seguir Comprando</Button>
        </Link>
      </Box>
    </div>
  );
};

export default CartPage;
