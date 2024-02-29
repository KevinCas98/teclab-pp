import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import CartPage from "./components/Cart";
import PaymentProcessing from "./components/PaymentProcessing";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentProcessing />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
