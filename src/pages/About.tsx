import { ArrowForward, LocationOn } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { offices, team } from "../data/content";

const principles = [
  ["Our mission", "To provide clear, practical and high-quality legal advice with professionalism, respect and care. We explain options clearly and manage each matter efficiently and responsibly."],
  ["Our vision", "To be a trusted, progressive solicitors' practice, recognised for professional standards, specialist expertise and consistently client-focused service."],
];

const headingSx = { color: "#1e3d7a", fontWeight: 800, letterSpacing: "-0.045em" };

export default function About() {
  return (
    <Box sx={{ bgcolor: "#f4f9fd", color: "#0d1424", overflow: "hidden" }}>
      <Box component="section" sx={{ bgcolor: "#e3f1fa", pt: { xs: 7, md: 9 }, pb: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(320px, 0.85fr)" }, gap: { xs: 3, md: 6 }, alignItems: "end" }}>
            <Box>
              <Typography sx={{ color: "#2874c9", fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", mb: 2 }}>About Law & Lawyers</Typography>
              <Typography component="h1" sx={{ ...headingSx, fontSize: { xs: 42, sm: 56, lg: 66 }, lineHeight: 1, maxWidth: 650 }}>Care, expertise and clear legal guidance.</Typography>
            </Box>
            <Box sx={{ bgcolor: "#8bc9e4", borderRadius: "14px", px: { xs: 3, sm: 4 }, py: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2.25 }}>
                <Box sx={{ display: "flex", "& .MuiAvatar-root:not(:first-of-type)": { ml: -1.2 } }}>{team.slice(0, 3).map((member) => <Avatar key={member.slug} src={member.photo ?? undefined} alt={member.name} sx={{ width: 43, height: 43, border: "2px solid #fff", bgcolor: "#22458a" }} />)}</Box>
                <Box><Typography sx={{ color: "#1e3d7a", fontSize: 31, fontWeight: 800, lineHeight: 1 }}>10+</Typography><Typography sx={{ color: "#31516f", fontSize: 12, mt: 0.25 }}>professional lawyers</Typography></Box>
              </Box>
              <Typography sx={{ color: "#31516f", fontSize: 13, lineHeight: 1.55, mt: 2.5 }}>Established in 2007, Law & Lawyers has earned recognition for dependable legal service across London and Manchester.</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" }, gap: 2 }}>
            <Box sx={{ display: "grid", gap: 2 }}>
              <Box component="img" src="/images/about-firm-textile.png" alt="Abstract legal symbol printed on linen" sx={{ width: "100%", aspectRatio: "1.35 / 1", objectFit: "cover", borderRadius: "18px", display: "block" }} />
              <Box sx={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 2 }}>
                <Box sx={{ minHeight: 145, borderRadius: "18px", bgcolor: "#292b73", color: "#fff", p: { xs: 2.5, sm: 3.25 }, position: "relative", overflow: "hidden", "&::after": { content: '""', position: "absolute", width: 170, height: 170, border: "24px solid rgba(197, 205, 255, 0.19)", borderRadius: "50%", right: -85, top: -90 } }}><Typography sx={{ fontSize: { xs: 33, sm: 40 }, fontWeight: 800, lineHeight: 1 }}>19+</Typography><Typography sx={{ fontSize: { xs: 16, sm: 18 }, fontWeight: 800, mt: 0.8 }}>Years of excellence</Typography></Box>
                <Box sx={{ minHeight: 145, borderRadius: "18px", bgcolor: "#e9edf3", p: { xs: 2.5, sm: 3.25 }, display: "flex", flexDirection: "column", justifyContent: "center" }}><Typography sx={{ color: "#292b73", fontSize: { xs: 31, sm: 37 }, fontWeight: 800, lineHeight: 1 }}>30,000+</Typography><Typography sx={{ color: "#52637e", fontSize: 14, mt: 1 }}>clients served</Typography></Box>
              </Box>
            </Box>
            <Box sx={{ position: "relative", minHeight: { xs: 360, md: "100%" }, borderRadius: "18px", overflow: "hidden" }}>
              <Box component="img" src="/images/legal-advice-consultation.png" alt="Legal advisers in discussion" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13, 20, 36, 0.04) 28%, rgba(13, 20, 36, 0.78) 100%)" }} />
              <Box sx={{ position: "absolute", left: { xs: 18, sm: 28 }, right: { xs: 18, sm: 28 }, bottom: { xs: 18, sm: 28 }, bgcolor: "rgba(14, 24, 44, 0.84)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "14px", color: "#fff", p: { xs: 2.25, sm: 3 } }}><Typography sx={{ fontSize: { xs: 15, sm: 16 }, lineHeight: 1.6 }}>Law and Lawyers Limited is authorised and regulated by the Solicitors Regulation Authority. Our solicitors combine specialist knowledge with a practical, client-focused approach.</Typography><Button component={Link} to="/services/residential-conveyancing/new-purchase-quote" endIcon={<ArrowForward />} sx={{ color: "#fff", bgcolor: "#2874c9", borderRadius: "8px", mt: 2, px: 2, py: 0.9, fontWeight: 800, textTransform: "none", "&:hover": { bgcolor: "#1e62aa" } }}>Get a conveyancing quote</Button></Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 9 } }}><Container maxWidth="lg"><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" }, gap: { xs: 3, md: 6 } }}><Box><Typography sx={{ color: "#52637e", fontSize: { xs: 17, md: 19 }, lineHeight: 1.7, maxWidth: 430 }}>Law & Lawyers is a full-service practice built around the people we serve. We make complex legal matters clear, without losing the detail that protects your interests.</Typography><Button component={Link} to="/contact" endIcon={<ArrowForward />} sx={{ color: "#22458a", fontWeight: 800, textTransform: "none", px: 0, mt: 2 }}>Speak with our team</Button></Box><Box sx={{ display: "grid", gap: 2 }}>{principles.map(([title, copy]) => <Box key={title} sx={{ bgcolor: "#fff", border: "1px solid rgba(34, 69, 138, 0.1)", borderRadius: "16px", p: { xs: 3, sm: 4 } }}><Typography component="h2" sx={{ ...headingSx, fontSize: { xs: 28, sm: 34 } }}>{title}</Typography><Typography sx={{ color: "#52637e", fontSize: 15, lineHeight: 1.65, mt: 1.5, maxWidth: 530 }}>{copy}</Typography></Box>)}</Box></Box></Container></Box>

      <Box component="section" sx={{ bgcolor: "#fff", py: { xs: 6, md: 8 } }}><Container maxWidth="lg"><Typography component="h2" sx={{ ...headingSx, fontSize: { xs: 31, sm: 40 } }}>Our offices</Typography><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2, mt: 3 }}>{offices.map((office) => <Box key={office.name} sx={{ p: 3, borderRadius: "14px", bgcolor: "#f4f9fd", border: "1px solid rgba(34,69,138,0.1)" }}><LocationOn sx={{ color: "#2874c9", fontSize: 22 }} /><Typography sx={{ color: "#1e3d7a", fontWeight: 800, fontSize: 19, mt: 1 }}>{office.name}</Typography><Typography sx={{ color: "#52637e", fontSize: 14, lineHeight: 1.55, mt: 1 }}>{office.address}</Typography><Typography component="a" href={`tel:${office.phone.replace(/[^+\d]/g, "")}`} sx={{ display: "block", color: "#2874c9", fontSize: 14, fontWeight: 700, textDecoration: "none", mt: 1.5 }}>{office.phone}</Typography></Box>)}</Box></Container></Box>
    </Box>
  );
}
