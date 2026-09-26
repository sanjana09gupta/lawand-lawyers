import { Box, Container, Grid, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { news } from "../data/content";

function ArticleLink({ post, featured = false }: { post: (typeof news)[number]; featured?: boolean }) {
  return (
    <Box component={Link} to={`/news/${post.slug}`} sx={{ display: "block", color: "inherit", textDecoration: "none", "&:hover h2, &:hover h3": { color: "#4a97d6" } }}>
      {featured && post.image && <Box component="img" src={post.image} alt={post.title} sx={{ display: "block", width: "100%", height: { xs: 210, sm: 290 }, objectFit: "cover" }} />}
      <Box sx={featured ? { bgcolor: "#fcfdfe", color: "#0d1424", p: { xs: 2.25, sm: 3 }, mx: { sm: 2.5 }, mt: { sm: -6 }, position: "relative" } : { py: 1.75 }}>
        <Typography sx={{ color: featured ? "#58708f" : "#9ecde9", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>{post.date}</Typography>
        <Typography component={featured ? "h2" : "h3"} sx={{ mt: .75, fontFamily: "Arial, sans-serif", fontSize: featured ? { xs: 23, sm: 29 } : { xs: 18, sm: 21 }, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.04em", transition: "color .2s" }}>{post.title}</Typography>
        <Typography sx={{ mt: 1, color: featured ? "#596579" : "#c8d4e4", fontSize: 13, lineHeight: 1.5 }}>{post.excerpt.slice(0, featured ? 130 : 105)}…</Typography>
        <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: .75, mt: 1.5, color: featured ? "#22458a" : "#b8dcf0", fontSize: 12, fontWeight: 800 }}>Read article <ArrowForward sx={{ fontSize: 15 }} /></Box>
      </Box>
    </Box>
  );
}

export default function NewsPage() {
  const [featured, ...remaining] = news;
  const recent = remaining.slice(0, 3);
  const archive = remaining.slice(3);

  return <>
    <PageHeader eyebrow="News & Insights" title="Guides and updates from our legal team." subtitle="Practical explainers on conveyancing, immigration, wills and probate, written by the solicitors who handle these matters every day." crumbs={[{ label: "Home", to: "/" }, { label: "News & Insights" }]} />
    <Box sx={{ bgcolor: "#0a1122", color: "#fcfdfe", py: { xs: 4, sm: 5.5 } }}>
      <Container maxWidth="lg">
        <Typography component="h2" sx={{ fontFamily: "Arial, sans-serif", fontSize: { xs: 28, sm: 34 }, fontWeight: 800, letterSpacing: "-.05em" }}>Latest news</Typography>
        <Typography sx={{ mt: .5, color: "#b8dcf0", fontSize: 14 }}>Clear guidance for the legal decisions ahead.</Typography>
        <Grid container spacing={{ xs: 3, md: 5 }} sx={{ mt: { xs: 2, sm: 2.5 } }}>
          <Grid size={{ xs: 12, md: 6 }}><ArticleLink post={featured} featured /></Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ alignSelf: "center" }}>
            {recent.map((post, index) => <Box key={post.slug} sx={{ borderTop: index === 0 ? "1px solid rgba(184,220,240,.38)" : 0, borderBottom: "1px solid rgba(184,220,240,.38)" }}><ArticleLink post={post} /></Box>)}
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 5, sm: 8 } }}>
      <Container maxWidth="lg">
        <Typography component="h2" sx={{ color: "#1d3468", fontFamily: "Arial, sans-serif", fontSize: { xs: 28, sm: 36 }, fontWeight: 800, letterSpacing: "-.045em" }}>More from our archive</Typography>
        <Grid container columnSpacing={{ xs: 0, md: 7 }} rowSpacing={0} sx={{ mt: 2 }}>
          {archive.map((post) => <Grid key={post.slug} size={{ xs: 12, md: 6 }}><Box sx={{ borderBottom: "1px solid rgba(29,52,104,.16)" }}><Box component={Link} to={`/news/${post.slug}`} sx={{ display: "block", py: 3, color: "#0d1424", textDecoration: "none", "&:hover h3": { color: "#2657a3" } }}><Typography sx={{ color: "#58708f", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>{post.date}</Typography><Typography component="h3" sx={{ mt: 1, fontFamily: "Arial, sans-serif", fontSize: { xs: 20, sm: 23 }, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.035em", transition: "color .2s" }}>{post.title}</Typography><Typography sx={{ mt: 1, color: "#596579", fontSize: 14, lineHeight: 1.55 }}>{post.excerpt.slice(0, 145)}…</Typography><Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: .75, mt: 1.5, color: "#22458a", fontSize: 13, fontWeight: 800 }}>Read article <ArrowForward sx={{ fontSize: 16 }} /></Box></Box></Box></Grid>)}
        </Grid>
      </Container>
    </Box>
  </>;
}
