import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Crumb = { label: string; to?: string };

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
}) {
  return (
    <Box sx={{ bgcolor: "#0a1122", pt: { xs: 16, sm: 20 }, pb: { xs: 8, sm: 10 } }}>
      <Container maxWidth="lg">
        <Breadcrumbs
          separator="/"
          sx={{ mb: 3, "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,0.3)" } }}
        >
          {crumbs.map((c) =>
            c.to ? (
              <MuiLink
                key={c.label}
                component={Link}
                to={c.to}
                underline="hover"
                sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}
              >
                {c.label}
              </MuiLink>
            ) : (
              <Typography key={c.label} sx={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
                {c.label}
              </Typography>
            )
          )}
        </Breadcrumbs>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography
            sx={{
              color: "#7fbde5",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            {eyebrow}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontSize: { xs: "2.25rem", sm: "3.2rem" },
              lineHeight: 1.05,
              maxWidth: 720,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 16, mt: 2.5, maxWidth: 560 }}>
              {subtitle}
            </Typography>
          )}
        </motion.div>
      </Container>
    </Box>
  );
}
