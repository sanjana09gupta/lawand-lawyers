import { useParams, Navigate, Link } from "react-router-dom";
import { Box, Container, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, Button, Chip } from "@mui/material";
import { CheckCircle, ArrowForward } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
import { services } from "../data/content";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/" replace />;

  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={service.category === "individual" ? "For Individuals" : "For Businesses"}
        title={service.title}
        subtitle={service.summary}
        crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/#services" }, { label: service.title }]}
      />

      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 8, sm: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: 24, color: "#0d1424" }}>
                How we can help
              </Typography>
              <List sx={{ mt: 1 }}>
                {service.points.map((p) => (
                  <ListItem key={p} disableGutters>
                    <ListItemIcon sx={{ minWidth: 34 }}>
                      <CheckCircle sx={{ color: "#2657a3", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={p} />
                  </ListItem>
                ))}
              </List>

              <Button
                component={Link}
                to="/contact"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{ mt: 3, background: "linear-gradient(115deg,#1d3468,#22458a,#2f74bd,#4a97d6)" }}
              >
                Get a Quote
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ p: 4, borderRadius: 3, bgcolor: "#0a1122", color: "#fff" }}>
                <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: 20 }}>
                  Related services
                </Typography>
                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {related.map((r) => (
                    <Chip
                      key={r.slug}
                      component={Link}
                      to={`/services/${r.slug}`}
                      clickable
                      label={r.title}
                      sx={{
                        justifyContent: "flex-start",
                        bgcolor: "rgba(255,255,255,0.06)",
                        color: "#fff",
                        py: 2.4,
                        "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
