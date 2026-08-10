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

          <Typography sx={{ fontSize: 17, lineHeight: 1.8, color: "#0d1424" }}>{post.excerpt}</Typography>

          <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 4, fontStyle: "italic" }}>
            This is a summary. Read the full article on the Law and Lawyers website.
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
