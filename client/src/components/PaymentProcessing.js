// import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import { useNavigate } from "react-router-dom";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import { CircularProgress } from "@mui/material";

// const PaymentProcessing = () => {
//   const navigate = useNavigate();
//   const [paymentDetails, setPaymentDetails] = useState({
//     nombre: "",
//     apellido: "",
//     dni: "",
//     domicilio: "",
//     email: "",
//     provincia: "",
//     numero_tarjeta: "",
//     fecha_expiracion: "",
//     cvv: "",
//   });
//   const [cartDetails, setCartDetails] = useState([]);
//   useEffect(() => {
//     // Llamar a la función para obtener los detalles del carrito desde el backend
//     fetchCartDetails();
//   }, []);
//   const fetchCartDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:4000/cart/1`);
//       const data = await response.json();
//       setCartDetails(data);
//     } catch (error) {
//       console.error("Error al obtener detalles del carrito:", error);
//     }
//   };

//   const [loading, setLoading] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setPaymentDetails({
//       ...paymentDetails,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Realizar la solicitud POST para procesar el pago
//       const response = await fetch("http://localhost:4000/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(paymentDetails)
//       });
//       if (response.ok) {
//         // Si la solicitud es exitosa, mostrar la alerta de éxito y redirigir después de 3 segundos
//         setAlertMessage(
//           "¡El pedido ha sido registrado! Llegará a su puerta en 3 días."
//         );
//         setShowAlert(true);
//         setTimeout(() => {
//           navigate("/");
//         }, 3000);
//       } else {
//         // Si la solicitud falla, mostrar un mensaje de error
//         setAlertMessage(
//           "Hubo un problema al procesar el pago. Por favor, inténtelo de nuevo más tarde."
//         );
//         setShowAlert(true);
//       }
//     } catch (error) {
//       console.log("Error al procesar el pago:", error);
//       // Si hay un error, mostrar un mensaje de error
//       setAlertMessage(
//         "Hubo un problema al procesar el pago. Por favor, inténtelo de nuevo más tarde."
//       );
//       setShowAlert(true);
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <h1>Procesamiento de Pago</h1>
//       <h2>Resumen del Carrito:</h2>
//       <ul>
//         {cartDetails.map((item) => (
//           <li key={item.id}>
//             {item.nombre} - Cantidad: {item.cantidad} - Precio: ${item.precio}
//           </li>
//         ))}
//       </ul>
//       <h2>Datos de Pago:</h2>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Nombre"
//               name="nombre"
//               value={paymentDetails.nombre}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Apellido"
//               name="apellido"
//               value={paymentDetails.apellido}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="DNI"
//               name="dni"
//               value={paymentDetails.dni}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Domicilio"
//               name="domicilio"
//               value={paymentDetails.domicilio}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               name="email"
//               value={paymentDetails.email}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Provincia"
//               name="provincia"
//               value={paymentDetails.provincia}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Número de Tarjeta"
//               name="numero_tarjeta"
//               value={paymentDetails.numero_tarjeta}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <TextField
//               label="Fecha de Expiración"
//               name="fecha_expiracion"
//               value={paymentDetails.fecha_expiracion}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <TextField
//               label="CVV"
//               name="cvv"
//               value={paymentDetails.cvv}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" type="submit">
//               {loading ? <CircularProgress /> : "Confirmar Pago"}
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       {/* Alerta de éxito */}
//       <Snackbar
//         open={showAlert}
//         autoHideDuration={6000}
//         onClose={() => setShowAlert(false)}
//       >
//         <MuiAlert
//           onClose={() => setShowAlert(false)}
//           severity="success"
//           sx={{ width: "100%" }}
//         >
//           {alertMessage}
//         </MuiAlert>
//       </Snackbar>
//     </div>
//   );
// };

// export default PaymentProcessing;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    domicilio: "",
    email: "",
    provincia: "",
    numero_tarjeta: "",
    fecha_expiracion: "",
    cvv: "",
  });
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const fetchCartDetails = async () => {
    try {
      const response = await fetch(`http://localhost:4000/cart/1`);
      const data = await response.json();
      setCartDetails(data);
    } catch (error) {
      console.error("Error al obtener detalles del carrito:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentDetails),
      });
      if (response.ok) {
        setAlertMessage(
          "¡El pedido ha sido registrado! Llegará a su puerta en 3 días."
        );
        setShowAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setAlertMessage(
          "Hubo un problema al procesar el pago. Por favor, inténtelo de nuevo más tarde."
        );
        setShowAlert(true);
      }
    } catch (error) {
      console.log("Error al procesar el pago:", error);
      setAlertMessage(
        "Hubo un problema al procesar el pago. Por favor, inténtelo de nuevo más tarde."
      );
      setShowAlert(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Procesamiento de Pago</h1>
      <h2>Resumen del Carrito:</h2>
      <ul>
        {cartDetails.map((item) => (
          <li key={item.id}>
            {item.nombre_producto} - Cantidad: {item.cantidad} - Precio: ${item.precio}
          </li>
        ))}
      </ul>
      <h2>Datos de Pago:</h2>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
           <Grid item xs={12}>
             <TextField
               label="Nombre"
               name="nombre"
               value={paymentDetails.nombre}
               onChange={handleChange}
               fullWidth
               margin="normal"
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               label="Apellido"
               name="apellido"
               value={paymentDetails.apellido}
               onChange={handleChange}
               fullWidth
               margin="normal"
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               label="DNI"
               name="dni"
               value={paymentDetails.dni}
               onChange={handleChange}
               fullWidth
               margin="normal"
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               label="Domicilio"
               name="domicilio"
               value={paymentDetails.domicilio}
               onChange={handleChange}
               fullWidth
               margin="normal"
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               label="Email"
               name="email"
               value={paymentDetails.email}
               onChange={handleChange}
               fullWidth
               margin="normal"
             />
           </Grid>
           <Grid item xs={12}>
             <TextField
               label="Provincia"
               name="provincia"
               value={paymentDetails.provincia}
               onChange={handleChange}
               fullWidth
               margin="normal"
             />
           </Grid>
           <Grid item xs={6}>
             <TextField
               label="Número de Tarjeta"
               name="numero_tarjeta"
               value={paymentDetails.numero_tarjeta}
               onChange={handleChange}
               fullWidth
               margin="normal"
             />
           </Grid>
           <Grid item xs={3}>
             <TextField
               label="Fecha de Expiración"
               name="fecha_expiracion"
               value={paymentDetails.fecha_expiracion}
               onChange={handleChange}
               fullWidth
               margin="normal"
             />
           </Grid>
           <Grid item xs={3}>
             <TextField
               label="CVV"
               name="cvv"
               value={paymentDetails.cvv}
               onChange={handleChange}
               fullWidth
               margin="normal"
             />
           </Grid>
           <Grid item xs={12}>
             <Button variant="contained" color="primary" type="submit">
               {loading ? <CircularProgress /> : "Confirmar Pago"}
             </Button>
           </Grid>
         </Grid>
      </form>
      {/* Alerta de éxito */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
      >
        <MuiAlert
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default PaymentProcessing;
