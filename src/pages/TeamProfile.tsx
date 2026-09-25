import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { LinkedIn, Email } from "@mui/icons-material";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { team } from "../data/content";

export default function TeamProfile() {
  const { slug } = useParams();
  const member = team.find((person) => person.slug === slug && person.photo);

  if (!member) return <Navigate to="/" replace />;

  return (
    <>
      <PageHeader
        eyebrow="Meet our lawyers"
        title={member.name}
        subtitle={member.role}
        crumbs={[{ label: "Home", to: "/" }, { label: "Our Team", to: "/#team" }, { label: member.name }]}
      />
      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 6, sm: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ overflow: "hidden", borderRadius: 3, bgcolor: "#e3f1fa", aspectRatio: "4 / 5" }}>
                <img src={member.photo!} alt={member.name} width="800" height="1000" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h4" sx={{ color: "#0a1122" }}>Profile</Typography>
              <Typography sx={{ mt: 2, maxWidth: 650, color: "text.secondary", fontSize: 17, lineHeight: 1.8 }}>
                Biography and professional background for {member.name} will be added here shortly.
              </Typography>
              <Box sx={{ mt: 5, py: 3, borderTop: "1px solid rgba(29,52,104,0.14)", borderBottom: "1px solid rgba(29,52,104,0.14)" }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2657a3" }}>Professional profile</Typography>
                <Typography sx={{ mt: 1.25, color: "text.secondary", lineHeight: 1.7 }}>Practice areas, qualifications and LinkedIn details can be added to this profile when approved.</Typography>
              </Box>
              <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                <Button component={Link} to="/contact" variant="contained" startIcon={<Email />} sx={{ py: 1.3, background: "linear-gradient(115deg,#1d3468,#22458a,#2f74bd)" }}>Contact our team</Button>
                <Button disabled variant="outlined" startIcon={<LinkedIn />}>LinkedIn profile coming soon</Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
