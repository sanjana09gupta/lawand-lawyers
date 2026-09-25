import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { ArrowForward, CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const included = [
  "A dedicated conveyancing team from instruction to completion",
  "Clear updates at every key stage of your transaction",
  "A tailored quote before you decide to proceed",
  "Support for freehold, leasehold, remortgage and transfer matters",
];

export default function ConveyancingFees() {
  return (
    <>
      <PageHeader
        eyebrow="Residential conveyancing"
        title="Clear fees. Clear next steps."
        subtitle="Every property transaction is different. We provide a tailored quote that explains the legal fees and likely disbursements before work begins."
        crumbs={[{ label: "Home", to: "/" }, { label: "Residential Conveyancing", to: "/services/residential-conveyancing" }, { label: "Fees" }]}
      />
      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 7, sm: 11 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 7 }} sx={{ alignItems: "stretch" }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h4" sx={{ color: "#0a1122", mb: 2 }}>What your quote will cover</Typography>
              <Typography sx={{ color: "text.secondary", maxWidth: 620, lineHeight: 1.75 }}>
                We will explain our legal fee, the anticipated third-party costs and the work involved in your matter. If your transaction becomes more complex, we will discuss this with you before any additional work is carried out.
              </Typography>
              <Box sx={{ mt: 4, display: "grid", gap: 2 }}>
                {included.map((item) => (
                  <Box key={item} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                    <CheckCircle sx={{ color: "#2657a3", fontSize: 21, mt: 0.2 }} />
                    <Typography sx={{ lineHeight: 1.6 }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ height: "100%", p: { xs: 3, sm: 4 }, borderRadius: 3, bgcolor: "#0a1122", color: "#fff" }}>
                <Typography variant="h5">Request your conveyancing quote</Typography>
                <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.66)", lineHeight: 1.7 }}>
                  Tell us a little about the property and your timeline. We will guide you to the right next step.
                </Typography>
                <Button component={Link} to="/services/residential-conveyancing/new-purchase-quote" variant="contained" endIcon={<ArrowForward />} sx={{ mt: 4, bgcolor: "#4a97d6", "&:hover": { bgcolor: "#7fbde5", color: "#0a1122" } }}>
                  Start a quote request
                </Button>
                <Button component={Link} to="/book-a-consultation" variant="text" sx={{ mt: 2, display: "block", px: 0, color: "#b8dcf0", "&:hover": { color: "#fff" } }}>
                  Or book a consultation
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
