import { Box, Container, Grid, Typography, Card, CardActionArea, CardContent, CardMedia, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { news } from "../data/content";

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="News & Insights"
        title="Guides and updates from our legal team."
        subtitle="Practical explainers on conveyancing, immigration, wills and probate, written by the solicitors who handle these matters every day."
        crumbs={[{ label: "Home", to: "/" }, { label: "News & Insights" }]}
      />

      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 8, sm: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {news.map((n) => (
              <Grid key={n.slug} size={{ xs: 12, sm: 6 }}>
                <Card
                  variant="outlined"
                  sx={{ height: "100%", borderRadius: 3, borderColor: "rgba(16,21,31,0.08)" }}
                >
                  <CardActionArea component={Link} to={`/news/${n.slug}`} sx={{ height: "100%", alignItems: "stretch" }}>
                    {n.image && <CardMedia component="img" image={n.image} alt={n.title} sx={{ height: 200 }} />}
                    <CardContent>
                      <Chip label={n.date} size="small" sx={{ bgcolor: "#e3f1fa", color: "#22458a", fontWeight: 600 }} />
                      <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: 20, mt: 1.5, lineHeight: 1.25 }}>
                        {n.title}
                      </Typography>
                      <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 1.5, lineHeight: 1.6 }}>
                        {n.excerpt.slice(0, 140)}…
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
