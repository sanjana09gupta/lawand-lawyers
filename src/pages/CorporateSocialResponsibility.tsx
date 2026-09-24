import { Box, Container, Grid, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";

const commitments = [
  ["Education and opportunity", "Supporting people and organisations that help students and families facing financial hardship."],
  ["Poverty and homelessness", "Contributing to causes that provide shelter, food, clothing and other essential support."],
  ["Community welfare", "Working through trusted organisations and established networks to direct help where it is needed."],
  ["Faith and service", "Supporting charitable work rooted in humility, compassion and practical care for others."],
];

export default function CorporateSocialResponsibility() {
  return (
    <>
      <PageHeader
        eyebrow="Corporate social responsibility"
        title="Our commitment to giving back."
        subtitle="Professional success carries a responsibility to create meaningful benefit for people, families and communities."
        crumbs={[{ label: "Home", to: "/" }, { label: "Corporate Social Responsibility" }]}
      />
      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 7, sm: 11 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 5, md: 8 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h4" sx={{ color: "#0a1122" }}>Service beyond legal practice</Typography>
              <Typography sx={{ mt: 2, color: "text.secondary", lineHeight: 1.8 }}>
                At Law and Lawyers Ltd, our work is guided by more than professional service. We believe a law firm has a wider responsibility to support the community, assist people in genuine need and use its resources to make a practical difference.
              </Typography>
              <Typography sx={{ mt: 2, color: "text.secondary", lineHeight: 1.8 }}>
                Under the leadership of Francis Mathew, Solicitor and Director, charitable giving and social responsibility are an important part of the firm&apos;s identity. Our approach is rooted in compassion, faith, community service and the belief that success should help uplift others.
              </Typography>
              <Box sx={{ mt: 5, borderLeft: "3px solid #4a97d6", pl: { xs: 2.5, sm: 3.5 } }}>
                <Typography sx={{ color: "#0a1122", fontFamily: "Fraunces, serif", fontSize: { xs: 23, sm: 28 }, lineHeight: 1.25 }}>
                  More than £400,000 contributed to charitable causes over the past three years.
                </Typography>
              </Box>
              <Typography sx={{ mt: 5, color: "text.secondary", lineHeight: 1.8 }}>
                Francis Mathew was admitted to the Roll of Solicitors in England and Wales in 2004 and founded Law and Lawyers Solicitors in 2007. His personal commitment to service includes donating a kidney in 2015, an act that continues to inform the values behind the firm&apos;s charitable work.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ bgcolor: "#e3f1fa", p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
                <Typography variant="h5" sx={{ color: "#0a1122" }}>Tithe Charitable Trust</Typography>
                <Typography sx={{ mt: 2, color: "#34435c", lineHeight: 1.75 }}>
                  Established by Francis Mathew, the Trust supports people facing challenges with education, homelessness, poverty and other forms of hardship. It is an important part of our long-term commitment to responsible giving.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: { xs: 5, sm: 8 } }}>
            {commitments.map(([title, text]) => (
              <Grid key={title} size={{ xs: 12, sm: 6 }}>
                <Box sx={{ height: "100%", p: 3, border: "1px solid rgba(29,52,104,0.14)", borderRadius: 3 }}>
                  <Typography variant="h6" sx={{ color: "#1d3468" }}>{title}</Typography>
                  <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.7 }}>{text}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: { xs: 5, sm: 8 }, maxWidth: 760 }}>
            <Typography variant="h4" sx={{ color: "#0a1122" }}>A continuing mission</Typography>
            <Typography sx={{ mt: 2, color: "text.secondary", lineHeight: 1.8 }}>
              We will continue supporting causes that align with our values, particularly education, poverty relief, homelessness, faith-based charitable work and community welfare. Our aim is to serve with integrity, give with humility and use our resources to support those who need help most.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
