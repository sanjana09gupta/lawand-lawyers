import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { CheckCircle, LocationOn, Phone, Mail } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
import { offices } from "../data/content";

const enquiryOptions = [
  "Residential Conveyancing",
  "Immigration",
  "Wills and Probate",
  "Employment",
  "Family",
  "Landlord and Tenant",
  "Dispute Resolution",
  "Something else",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact our team."
        subtitle="We aim to respond to your query within 4 working hours. Monday to Friday, 9:30–17:30. Closed weekends & bank holidays."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 8, sm: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {offices.map((o) => (
                  <Box key={o.name} sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(16,21,31,0.08)" }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                      <LocationOn sx={{ color: "#2657a3", fontSize: 20, mt: 0.3 }} />
                      <Box>
                        <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: 18 }}>{o.name}</Typography>
                        <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.5 }}>
                          {o.address}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
                          <Phone sx={{ fontSize: 14, color: "text.secondary" }} />
                          <Typography sx={{ fontSize: 13.5 }}>{o.phone}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <Mail sx={{ fontSize: 14, color: "text.secondary" }} />
                          <Typography sx={{ fontSize: 13.5 }}>{o.email}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                sx={{ p: 4, borderRadius: 3, bgcolor: "#f3f6fa" }}
              >
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Full name" fullWidth required size="small" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Email" type="email" fullWidth required size="small" />
                  </Grid>
                  <Grid size={12}>
                    <TextField label="I'm enquiring about" select fullWidth defaultValue="" size="small">
                      {enquiryOptions.map((o) => (
                        <MenuItem key={o} value={o}>
                          {o}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={12}>
                    <TextField label="Message" fullWidth required multiline rows={4} size="small" />
                  </Grid>
                  <Grid size={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={sent}
                      startIcon={sent ? <CheckCircle /> : undefined}
                      sx={{
                        py: 1.5,
                        background: sent ? undefined : "linear-gradient(115deg,#1d3468,#22458a,#2f74bd,#4a97d6)",
                      }}
                    >
                      {sent ? "Enquiry sent" : "Send Enquiry"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
