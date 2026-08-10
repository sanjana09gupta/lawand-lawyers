import { Box, Container, Typography, Button, Stack, Chip } from "@mui/material";
import { LocationOn, WorkOutlined, ArrowForward } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
import { careers } from "../data/content";

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build your career with Law and Lawyers."
        subtitle="We're always looking for talented, client-focused people across conveyancing, immigration and family law — in East London, Canary Wharf and Manchester."
        crumbs={[{ label: "Home", to: "/" }, { label: "Careers" }]}
      />

      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 8, sm: 12 } }}>
        <Container maxWidth="md">
          <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: { xs: 26, sm: 32 }, color: "#0d1424", mb: 4 }}>
            Current openings
          </Typography>

          <Stack spacing={2}>
            {careers.map((job) => (
              <Box
                key={job.title}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { sm: "center" },
                  justifyContent: "space-between",
                  gap: 2,
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid rgba(16,21,31,0.08)",
                  transition: "border-color 0.2s",
                  "&:hover": { borderColor: "#7fbde5" },
                }}
              >
                <Box>
                  <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: 19 }}>{job.title}</Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <LocationOn sx={{ fontSize: 15, color: "text.secondary" }} />
                      <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{job.location}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <WorkOutlined sx={{ fontSize: 15, color: "text.secondary" }} />
                      <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{job.type}</Typography>
                    </Stack>
                  </Stack>
                </Box>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForward />}
                  href="mailto:info@lawandlawyers.co.uk?subject=Application"
                  sx={{ flexShrink: 0 }}
                >
                  Apply
                </Button>
              </Box>
            ))}
          </Stack>

          <Box sx={{ mt: 6, p: 4, borderRadius: 3, bgcolor: "#f3f6fa", textAlign: "center" }}>
            <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: 20 }}>
              Don't see the right role?
            </Typography>
            <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 1 }}>
              We're always happy to hear from good people. Send us your CV anytime.
            </Typography>
            <Chip
              component="a"
              href="mailto:info@lawandlawyers.co.uk"
              label="info@lawandlawyers.co.uk"
              clickable
              sx={{ mt: 2, bgcolor: "#e3f1fa", color: "#22458a", fontWeight: 600 }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
