import { ArrowOutward, CallOutlined, EmailOutlined } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { team } from "../data/content";
import { portraitImage } from "../lib/portraitImage";

type Person = { name: string; title: string; image?: string };

const conveyancingLeads: Person[] = [
  { name: "Francis Mathew", title: "Solicitor", image: "/images/francis.webp" },
  { name: "Bhavini Bhudia", title: "Solicitor", image: "/images/team/Bhavini.jpg" },
  { name: "Sarath Nair", title: "Solicitor", image: "/images/team/Sarath.jpg" },
  { name: "Juneeta John", title: "Solicitor" },
  { name: "Shinto Poulose", title: "Solicitor" },
  { name: "Charles Vargehese", title: "Solicitor" },
  { name: "Abhinav Kiran Sekhon", title: "Solicitor" },
  { name: "Sujini Mundayam Kara", title: "Solicitor" },
];

const conveyancingTeams = [
  ["Conveyancing Team 1", "Arathy Kurup", "Alan Joy", "020 4618 9110", "/images/team/Arathy.jpg", undefined],
  ["Conveyancing Team 2", "Pravya Prasad", "Arun Babu", "0208 088 4584", "/images/team/Pravya.jpg", "/images/team/Arun babu.jpg"],
  ["Conveyancing Team 3", "Michael Job", "Melvin Bino", "020 3345 4947", undefined, "/images/team/Melvin Bino.jpg"],
  ["Conveyancing Team 4", "Isshak Jaleel", "Annet Mary", "020 4618 9127", undefined, "/images/team/Annet.jpg"],
  ["Conveyancing Team 5", "Ajai Chalappuram", "Margaret James", "0208 088 4583", "/images/team/Ajay.jpg", undefined],
  ["Conveyancing Team 6", "Gurupriya Ramachandran", "Stinnie John", "020 3345 4952", "/images/team/Gurupriya.jpg", "/images/team/Stinnie.jpg"],
  ["Conveyancing Team 7", "Ramakrishnan Kandasamy", "Roji Sera Varghese", "020 3345 4949", "/images/team/Ramakrishnan.jpg", undefined],
  ["Conveyancing Team 8", "Alex Martin", "Aleena Jayan", "0208 088 4581", "/images/team/Alex.jpg", "/images/team/Aleena.jpg"],
  ["Conveyancing Team 9", "Sanjana Koshy", "Ramya Logeswaran", "020 3345 4950", "/images/team/Sanjana.jpg", "/images/team/Ramya.jpg"],
  ["Conveyancing Team 10", "Sujini Mundayam Kara", "Kukku Joy and Agimol Sonya", "", undefined, undefined],
] as const;

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

function Portrait({ person, compact = false }: { person: Person; compact?: boolean }) {
  return <Box sx={{ display: "grid", gridTemplateColumns: compact ? "64px 1fr" : "1fr", gap: compact ? 1.5 : 0, alignItems: "center" }}>
    <Box sx={{ aspectRatio: "1 / 1", overflow: "hidden", bgcolor: "#d7e9f4", display: "grid", placeItems: "center", borderRadius: compact ? "50%" : "14px" }}>
      {person.image ? <Box component="img" {...portraitImage(person.image, compact ? "64px" : "(max-width: 600px) 45vw, 30vw")} loading="lazy" decoding="async" alt={person.name} sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} /> : <Typography aria-hidden="true" sx={{ color: "#22458a", fontWeight: 800, fontSize: compact ? 18 : 30 }}>{initials(person.name)}</Typography>}
    </Box>
    <Box><Typography sx={{ color: "#18366f", fontWeight: 800, fontSize: compact ? 15 : 19, lineHeight: 1.15 }}>{person.name}</Typography><Typography sx={{ color: "#61718a", mt: .5, fontSize: compact ? 12 : 13 }}>{person.title}</Typography></Box>
  </Box>;
}

export default function OurPeople() {
  return <Box className="people-page">
    <Box component="section" className="people-hero">
      <Container maxWidth="lg"><Box className="people-hero-grid">
        <Box><Typography className="people-eyebrow">Law and Lawyers</Typography><Typography component="h1">Our people</Typography><Typography className="people-lead">Specialist legal support, delivered by a team that knows your matter and stays close throughout.</Typography></Box>
        <Box className="people-hero-note"><Typography sx={{ fontSize: 16, fontWeight: 750, color: "#18366f" }}>Find the right team</Typography><Typography sx={{ mt: 1, color: "#53647e", fontSize: 14, lineHeight: 1.6 }}>Our solicitors, paralegals and legal assistants work together to provide clear, responsive support.</Typography><Button component="a" href="#conveyancing" endIcon={<ArrowOutward />} sx={{ mt: 2, p: 0, color: "#22458a", fontWeight: 800, textTransform: "none" }}>Explore our teams</Button></Box>
      </Box></Container>
    </Box>

    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
      <Box className="people-section-heading"><Typography className="people-eyebrow">Leadership</Typography><Typography component="h2">Directors</Typography><Typography>Meet the directors leading Law and Lawyers.</Typography></Box>
      <Box className="directors-grid">{team.map((person) => <Link className="director-card" to={`/team/${person.slug}`} key={person.slug}><Portrait person={{ name: person.name, title: person.role, image: person.photo ?? undefined }} /><Box className="director-link">View profile <ArrowOutward fontSize="small" /></Box></Link>)}</Box>
    </Container>

    <Box component="section" id="conveyancing" sx={{ bgcolor: "#eaf4f9", py: { xs: 6, md: 9 } }}><Container maxWidth="lg">
      <Box className="people-section-heading"><Typography className="people-eyebrow">Property law</Typography><Typography component="h2">Conveyancing</Typography><Typography>Our conveyancing solicitors and case teams are ready to help with your property transaction.</Typography></Box>
      <Box className="lead-grid">{conveyancingLeads.map((person) => <Box className="lead-card" key={person.name}><Portrait person={person} compact /></Box>)}</Box>
      <Box className="team-grid">{conveyancingTeams.map(([label, lead, paralegal, phone, leadImage, paralegalImage]) => <Box className="case-team" key={label}><Box className="case-team-top"><Box sx={{ display: "flex", "& > * + *": { ml: -1.25 } }}>{[{ name: lead, image: leadImage }, { name: paralegal, image: paralegalImage }].map((member) => member.image ? <Box key={member.name} component="img" {...portraitImage(member.image, "54px")} loading="lazy" decoding="async" alt={member.name} sx={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", objectPosition: "center top", border: "2px solid #fff" }} /> : <Box key={member.name} aria-label={`${member.name} profile photo unavailable`} sx={{ width: 54, height: 54, borderRadius: "50%", bgcolor: "#c8dfec", display: "grid", placeItems: "center", color: "#22458a", fontWeight: 800, border: "2px solid #fff" }}>{initials(member.name)}</Box>)}</Box><Box><Typography sx={{ color: "#18366f", fontWeight: 800 }}>{label}</Typography><Typography sx={{ color: "#61718a", fontSize: 12, mt: .25 }}>Your dedicated case team</Typography></Box></Box><Box sx={{ mt: 2, display: "grid", gap: 1 }}><Typography sx={{ color: "#263854", fontSize: 14 }}><strong>Paralegal</strong> {lead}</Typography><Typography sx={{ color: "#263854", fontSize: 14 }}><strong>Paralegal</strong> {paralegal}</Typography>{phone && <Typography component="a" href={`tel:${phone.replace(/[^+\\d]/g, "")}`} className="case-team-phone"><CallOutlined fontSize="small" />{phone}</Typography>}</Box></Box>)}</Box>
    </Container></Box>

    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}><Box className="departments-grid">
      <Box component="section" className="department-panel immigration-panel" aria-labelledby="immigration-heading">
        <Box className="department-heading"><Box><Typography className="people-eyebrow">Specialist team</Typography><Typography component="h2" id="immigration-heading">Immigration</Typography></Box><Link to="/services/immigration" className="department-service-link" aria-label="Explore immigration services"><ArrowOutward /></Link></Box>
        <Box className="specialist-profiles">
          {[{ name: "Majo Davis", title: "Solicitor", image: "/images/team/Majo.jpg" }, { name: "SreeGovind", title: "Paralegal", image: "/images/team/Sree Govind.jpg" }].map((person) => <Box className="specialist-profile" key={person.name}><Box className="specialist-photo"><img {...portraitImage(person.image, "(max-width: 600px) 45vw, (max-width: 900px) 50vw, 30vw")} alt={person.name} loading="lazy" decoding="async" width="960" height="640" /></Box><Box className="specialist-caption"><Typography component="h3">{person.name}</Typography><Typography>{person.title}</Typography></Box></Box>)}
        </Box>
        <Box className="support-roster"><Typography component="h3" className="support-roster-label">Working alongside you</Typography><Box className="support-roster-grid"><Portrait person={{ name: "Chidiyaraj", title: "Paralegal" }} compact /><Portrait person={{ name: "Kausicprabu S", title: "Paralegal" }} compact /><Portrait person={{ name: "Andrews Renil", title: "Legal Assistant" }} compact /></Box></Box>
      </Box>
      <Box component="section" className="department-panel department-panel-blue" aria-labelledby="litigation-heading"><Typography className="people-eyebrow">Dispute support</Typography><Typography component="h2" id="litigation-heading">Litigation</Typography><Box className="department-list"><Portrait person={{ name: "Natarajan Ramachandran", title: "" }} compact /><Portrait person={{ name: "Mary Magdalene Anthony", title: "" }} compact /></Box><Link to="/contact" className="department-contact-link">Contact our team <ArrowOutward fontSize="small" /></Link></Box>
    </Box></Container>

    <Box component="section" className="people-contact"><Container maxWidth="lg"><Box><Typography component="h2">Need to speak with us?</Typography><Typography>Contact us and we will direct you to the right legal team.</Typography></Box><Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}><Button component={Link} to="/contact" variant="contained" endIcon={<EmailOutlined />} className="people-contact-button">Contact us</Button><Button component="a" href="tel:+442085865657" variant="outlined" startIcon={<CallOutlined />} className="people-call-button">020 8586 5657</Button></Box></Container></Box>
  </Box>;
}
