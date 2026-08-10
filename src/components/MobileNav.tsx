import { Drawer, Box, IconButton, List, ListItemButton, ListItemText, Button, Divider } from "@mui/material";
import { Close, ChevronRight } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Our Team", href: "/#team" },
  { label: "Insights", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: 380,
            bgcolor: "#0a1122",
            color: "#fff",
            backgroundImage: "none",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, py: 2.5 }}>
        <Box component="img" src="/images/logo.svg" alt="Law and Lawyers" sx={{ height: 32 }} />
        <IconButton onClick={onClose} sx={{ color: "#fff" }} aria-label="Close menu">
          <Close />
        </IconButton>
      </Box>

      <List sx={{ px: 2 }}>
        {links.map((l) => (
          <ListItemButton
            key={l.label}
            component={RouterLink}
            to={l.href}
            onClick={onClose}
            sx={{
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              py: 2,
            }}
          >
            <ListItemText
              primary={l.label}
              slotProps={{ primary: { sx: { fontFamily: "Fraunces, serif", fontSize: 22 } } }}
            />
            <ChevronRight sx={{ color: "rgba(255,255,255,0.4)" }} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mx: 3 }} />

      <Box sx={{ px: 3, py: 3 }}>
        <Button
          component="a"
          href="https://lawandlawyers.perfectportal.co.uk/"
          target="_blank"
          rel="noreferrer"
          fullWidth
          sx={{ color: "rgba(255,255,255,0.75)", justifyContent: "flex-start", mb: 1.5 }}
        >
          Client Login
        </Button>
        <Button
          component="a"
          href="tel:+442085865657"
          fullWidth
          sx={{ color: "rgba(255,255,255,0.75)", justifyContent: "flex-start", mb: 2.5 }}
        >
          0208 586 5657
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            onClose();
            navigate("/contact");
          }}
          sx={{ py: 1.5, background: "linear-gradient(115deg,#1d3468,#22458a,#2f74bd,#4a97d6)" }}
        >
          Get a Quote
        </Button>
      </Box>
    </Drawer>
  );
}
