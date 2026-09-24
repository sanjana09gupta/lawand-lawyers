import { Box, Container, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";

const schedulerUrl = "https://scheduler.zoom.us/mohit-prasad-ieoyt0/30-mins-with-mohit?embed=true";

export default function Booking() {
  return (
    <>
      <PageHeader
        eyebrow="Book a consultation"
        title="Choose a time that works for you."
        subtitle="Schedule a 30-minute consultation with our team through our secure Zoom booking page."
        crumbs={[{ label: "Home", to: "/" }, { label: "Book a consultation" }]}
      />
      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 6, sm: 10 } }}>
        <Container maxWidth="md">
          <Box sx={{ border: "1px solid rgba(29,52,104,0.14)", borderRadius: 3, overflow: "hidden", bgcolor: "#fff", boxShadow: "0 16px 42px rgba(10,17,34,0.08)" }}>
            <iframe
              title="Book a 30-minute consultation"
              src={schedulerUrl}
              loading="lazy"
              style={{ width: "100%", minHeight: "560px", border: 0 }}
              allow="clipboard-write"
            />
          </Box>
          <Typography sx={{ mt: 2, color: "text.secondary", fontSize: 13.5, textAlign: "center" }}>
            If the scheduler does not load, please call 07767 610001 or email Sales@lawandlawyers.co.uk.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
