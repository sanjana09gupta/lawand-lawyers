import { useParams, Navigate, Link } from "react-router-dom";
import { Box, Container, Typography, Button, Chip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
import { news } from "../data/content";

export default function NewsDetail() {
  const { slug } = useParams();
  const post = news.find((n) => n.slug === slug);

  if (!post) return <Navigate to="/news" replace />;

  return (
    <>
      <PageHeader
        eyebrow="News & Insights"
        title={post.title}
        crumbs={[{ label: "Home", to: "/" }, { label: "News & Insights", to: "/news" }, { label: post.title }]}
      />

      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 8, sm: 12 } }}>
        <Container maxWidth="md">
          <Chip label={post.date} size="small" sx={{ bgcolor: "#e3f1fa", color: "#22458a", fontWeight: 600, mb: 3 }} />

          {post.image && (
            <Box
              component="img"
              src={post.image}
              alt={post.title}
              sx={{ width: "100%", borderRadius: 3, mb: 4, maxHeight: 420, objectFit: "cover" }}
            />
          )}

          <Box sx={{ display: "grid", gap: 4 }}>
            {post.content.map((section, index) => (
              <Box key={section.heading ?? index}>
                {section.heading && <Typography component="h2" sx={{ fontFamily: "Fraunces, serif", fontSize: { xs: 24, sm: 30 }, lineHeight: 1.2, color: "#0d1424", mb: 1.5 }}>{section.heading}</Typography>}
                {section.paragraphs?.map((paragraph) => <Typography key={paragraph} sx={{ fontSize: 17, lineHeight: 1.8, color: "#263248", mb: 1.5 }}>{paragraph}</Typography>)}
                {section.points && <Box component="ul" sx={{ pl: 2.5, m: 0, color: "#263248", display: "grid", gap: 1 }}>{section.points.map((point) => <Typography component="li" key={point} sx={{ fontSize: 16, lineHeight: 1.65 }}>{point}</Typography>)}</Box>}
              </Box>
            ))}
          </Box>

          <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 4, p: 2, borderLeft: "3px solid #4a97d6", bgcolor: "#f3f6fa" }}>
            This article is published for general information only. It is not legal advice, and the law or guidance may have changed since publication.
          </Typography>

          <Button
            component={Link}
            to="/news"
            startIcon={<ArrowBack />}
            sx={{ mt: 5 }}
          >
            Back to News &amp; Insights
          </Button>
        </Container>
      </Box>
    </>
  );
}
