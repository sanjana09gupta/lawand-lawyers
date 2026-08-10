import { Box, Container, Grid, Typography, Chip, Avatar } from "@mui/material";
import { VerifiedUser, Groups, Handshake, Balance } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
import { team, offices } from "../data/content";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

const values = [
  { icon: VerifiedUser, title: "Regulated", text: "Authorised and regulated by the Solicitors Regulation Authority (SRA ID: 613159)." },
  { icon: Groups, title: "Client-first", text: "You work with a named director throughout, not a rotating cast of case handlers." },
  { icon: Handshake, title: "Transparent", text: "Fixed fees where possible, and honest advice about the road ahead." },
  { icon: Balance, title: "Full-service", text: "One firm across conveyancing, immigration, family, employment and disputes." },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="A full-service practice built on care and efficiency."
        subtitle="Law and Lawyers Solicitors has grown from a single East London office into a three-office practice across London and Manchester, without losing the personal, director-led service clients started with."
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 8, sm: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {values.map((v) => (
              <Grid key={v.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ p: 3.5, borderRadius: 3, border: "1px solid rgba(16,21,31,0.08)", height: "100%" }}>
                  <v.icon sx={{ color: "#2657a3", fontSize: 28 }} />
                  <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: 20, mt: 2 }}>{v.title}</Typography>
                  <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 1, lineHeight: 1.6 }}>
                    {v.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "#f3f6fa", py: { xs: 8, sm: 12 } }}>
        <Container maxWidth="lg">
          <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: { xs: 28, sm: 36 }, color: "#0d1424" }}>
            Our offices
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {offices.map((o) => (
              <Grid key={o.name} size={{ xs: 12, sm: 4 }}>
                <Box sx={{ p: 3, borderRadius: 3, bgcolor: "#fff", border: "1px solid rgba(16,21,31,0.08)" }}>
                  <Chip label={o.tag} size="small" sx={{ bgcolor: "#e3f1fa", color: "#22458a", fontWeight: 600 }} />
                  <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: 20, mt: 1.5 }}>{o.name}</Typography>
                  <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.5 }}>{o.address}</Typography>
                  <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 1 }}>{o.phone}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 8, sm: 12 } }}>
        <Container maxWidth="lg">
          <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: { xs: 28, sm: 36 }, color: "#0d1424" }}>
            Our directors
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {team.map((m) => (
              <Grid key={m.name} size={{ xs: 6, sm: 4, md: 2 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    src={m.photo ?? undefined}
                    sx={{ width: 88, height: 88, mx: "auto", bgcolor: "#22458a", fontFamily: "Fraunces, serif" }}
                  >
                    {!m.photo && initials(m.name)}
                  </Avatar>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, mt: 1.5 }}>{m.name}</Typography>
                  <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>{m.role}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
