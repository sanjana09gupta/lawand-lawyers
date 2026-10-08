import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box sx={{ background: "linear-gradient(120deg, #0d1c42, #17366f 52%, #4a97d6)", minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="sm" sx={{ textAlign: "center", py: 12 }}>
        <Typography sx={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 96, color: "#4a97d6", lineHeight: 1 }}>
          404
        </Typography>
        <Typography sx={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 28, color: "#fff", mt: 2 }}>
          Page not found
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.6)", mt: 1.5 }}>
          The page you're looking for doesn't exist or has moved.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ mt: 4, background: "linear-gradient(115deg,#1d3468,#22458a,#2f74bd,#4a97d6)" }}
        >
          Back to Home
        </Button>
      </Container>
    </Box>
  );
}
