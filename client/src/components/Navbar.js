import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HiveIcon from "@mui/icons-material/Hive";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Container
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  BeeCommerce
                </Link>
                <HiveIcon />
              </Typography>
              <Button
                size="medium"
                variant="text"
                color="primary"
                onClick={() => navigate("/cart")}
                style={{ margin: "0.5rem 1rem" }}
              >
                Carrito
              </Button>
            </Container>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
