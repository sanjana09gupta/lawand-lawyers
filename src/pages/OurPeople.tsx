import { ArrowOutward, CallOutlined, EmailOutlined } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { team } from "../data/content";
import { portraitImage } from "../lib/portraitImage";

type Person = { name: string; title: string; image?: string };

const conveyancingLeads: Person[] = [
  { name: "Francis Mathew", title: "Senior Director", image: "/images/francis-mathew.jpeg" },
  { name: "Bhavini Bhudia", title: "Director", image: "/images/team/Bhavini.jpg" },
  { name: "Sarath Nair", title: "Director", image: "/images/team/Sarath.jpg" },
  { name: "Juneeta John", title: "Director", image: "/images/team/juneeta-enhanced.png" },
  { name: "Shinto Poulose", title: "Solicitor" },
  { name: "Charles Vargehese", title: "Director", image: "/images/team/Charles Vargehese.png" },
  { name: "Abhinav Kiran Sekhon", title: "Solicitor" },
  { name: "Sujini Mundayam Kara", title: "Solicitor", image: "/images/team/Sujini Mundayam Kara.webp" },
];

type ConveyancingTeam = { label: string; phone?: string; members: Person[] };

const conveyancingTeams: ConveyancingTeam[] = [
  { label: "Conveyancing Team 1", phone: "020 4618 9110", members: [{ name: "Arathy Kurup", title: "Paralegal", image: "/images/team/Arathy.jpg" }, { name: "Abhirami Jackson", title: "Paralegal", image: "/images/team/Abhirami.jpg" }] },
  { label: "Conveyancing Team 2", phone: "0208 088 4584", members: [{ name: "Pravya Prasad", title: "Paralegal", image: "/images/team/Pravya.jpg" }, { name: "Arun Babu", title: "Paralegal", image: "/images/team/Arun babu.jpg" }] },
  { label: "Conveyancing Team 3", phone: "020 3345 4947", members: [{ name: "Michael Job", title: "Paralegal", image: "/images/team/Michael Job.webp" }, { name: "Melvin Bino", title: "Paralegal", image: "/images/team/Melvin Bino.jpg" }] },
  { label: "Conveyancing Team 4", phone: "020 4618 9127", members: [{ name: "Isshak Jaleel", title: "Paralegal", image: "/images/team/Isshak Jaleel.webp" }, { name: "Annet Mary", title: "Paralegal", image: "/images/team/Annet.jpg" }] },
  { label: "Conveyancing Team 5", phone: "0208 088 4583", members: [{ name: "Ajai Chalappuram", title: "Registered Foreign Lawyer", image: "/images/team/Ajay.jpg" }, { name: "Margaret James", title: "Paralegal", image: "/images/team/Margaret James.webp" }] },
  { label: "Conveyancing Team 6", phone: "020 3345 4952", members: [{ name: "Gurupriya Ramachandran", title: "Paralegal", image: "/images/team/Gurupriya.jpg" }, { name: "Stinnie John", title: "Paralegal", image: "/images/team/Stinnie.jpg" }] },
  { label: "Conveyancing Team 7", phone: "020 3345 4949", members: [{ name: "Ramakrishnan Kandasamy", title: "Registered Foreign Lawyer", image: "/images/team/Ramakrishnan.jpg" }, { name: "Alan Joy", title: "Paralegal", image: "/images/team/Alan Joy.jpg" }] },
  { label: "Conveyancing Team 8", phone: "0208 088 4581", members: [{ name: "Alex Martin", title: "Paralegal", image: "/images/team/Alex.jpg" }, { name: "Aleena Jayan", title: "Paralegal", image: "/images/team/Aleena.jpg" }] },
  { label: "Conveyancing Team 9", phone: "020 3345 4950", members: [{ name: "Sanjana Koshy", title: "Registered Foreign Lawyer", image: "/images/team/Sanjana.jpg" }, { name: "Ramya Logeswaran", title: "Paralegal", image: "/images/team/Ramya.jpg" }] },
  { label: "Leeds Branch Conveyancing Team", members: [{ name: "Shinto Poulose", title: "Solicitor" }, { name: "Sujini Mundayam Kara", title: "Solicitor", image: "/images/team/Sujini Mundayam Kara.webp" }, { name: "Kukku Joy", title: "Paralegal", image: "/images/team/Kukku Joy.webp" }, { name: "Agimol Sonya", title: "Paralegal", image: "/images/team/Agimol Sonya.webp" }] },
];

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
      <Box className="directors-grid">{team.map((person) => person.photo ? <Link className="director-card" to={`/team/${person.slug}`} key={person.slug}><Portrait person={{ name: person.name, title: person.role, image: person.photo }} /><Box className="director-link">View profile <ArrowOutward fontSize="small" /></Box></Link> : <Box component="article" className="director-card" key={person.slug}><Portrait person={{ name: person.name, title: person.role }} /></Box>)}</Box>
    </Container>

    <Box component="section" id="conveyancing" sx={{ bgcolor: "#eaf4f9", py: { xs: 6, md: 9 } }}><Container maxWidth="lg">
      <Box className="people-section-heading"><Typography className="people-eyebrow">Property law</Typography><Typography component="h2">Conveyancing</Typography><Typography>Our conveyancing solicitors and case teams are here to help with your property transaction.</Typography></Box>
      <Box className="lead-grid">{conveyancingLeads.map((person) => <Box className="lead-card" key={person.name}><Portrait person={person} compact /></Box>)}</Box>
      <Box className="team-grid">{conveyancingTeams.map(({ label, members, phone }) => <Box className="case-team" key={label}>
        <Box className="case-team-top"><Box><Typography component="h3" sx={{ color: "#18366f", fontWeight: 800 }}>{label}</Typography><Typography sx={{ color: "#61718a", fontSize: 12, mt: .25 }}>Your dedicated case team</Typography></Box></Box>
        <Box className="case-team-members">{members.map((person) => <Portrait key={person.name} person={person} compact />)}</Box>
        {phone && <Typography component="a" href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="case-team-phone"><CallOutlined fontSize="small" />{phone}</Typography>}
      </Box>)}</Box>
    </Container></Box>

    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}><Box className="departments-grid">
      <Box component="section" className="department-panel immigration-panel" aria-labelledby="immigration-heading">
        <Box className="department-heading"><Box><Typography className="people-eyebrow">Specialist team</Typography><Typography component="h2" id="immigration-heading">Immigration</Typography></Box><Link to="/services/immigration" className="department-service-link" aria-label="Explore immigration services"><ArrowOutward /></Link></Box>
        <Box className="specialist-profiles">
          {[{ name: "Majo Davis", title: "Director", image: "/images/team/Majo.jpg" }, { name: "SreeGovind", title: "Paralegal", image: "/images/team/Sree Govind.jpg" }].map((person) => <Box className="specialist-profile" key={person.name}><Box className="specialist-photo"><img {...portraitImage(person.image, "(max-width: 600px) 45vw, (max-width: 900px) 50vw, 30vw")} alt={person.name} loading="lazy" decoding="async" width="960" height="640" /></Box><Box className="specialist-caption"><Typography component="h3">{person.name}</Typography><Typography>{person.title}</Typography></Box></Box>)}
        </Box>
        <Box className="support-roster"><Typography component="h3" className="support-roster-label">Working alongside you</Typography><Box className="support-roster-grid"><Portrait person={{ name: "Chidiyaraj", title: "Paralegal", image: "/images/team/Chidiyaraj.jpg" }} compact /><Portrait person={{ name: "Kausicprabu S", title: "Paralegal", image: "/images/team/Kausicprabu S.jpg" }} compact /><Portrait person={{ name: "Andrews Renil", title: "Legal Assistant" }} compact /></Box></Box>
      </Box>
      <Box component="section" className="department-panel department-panel-blue" aria-labelledby="litigation-heading"><Typography className="people-eyebrow">Dispute support</Typography><Typography component="h2" id="litigation-heading">Litigation</Typography><Box className="department-list"><Portrait person={{ name: "Natarajan Ramachandran", title: "Solicitor", image: "/images/team/Natarajan Ramachandran.jpg" }} compact /><Portrait person={{ name: "Mary Magdalene Anthony", title: "Paralegal", image: "/images/team/Mary Magdalene Anthony.jpg" }} compact /></Box><Link to="/contact" className="department-contact-link">Contact our team <ArrowOutward fontSize="small" /></Link></Box>
    </Box></Container>

    <Box component="section" className="people-contact"><Container maxWidth="lg"><Box><Typography component="h2">Need to speak with us?</Typography><Typography>Contact us and we will direct you to the right legal team.</Typography></Box><Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}><Button component={Link} to="/contact" variant="contained" endIcon={<EmailOutlined />} className="people-contact-button">Contact us</Button><Button component="a" href="tel:+442085865657" variant="outlined" startIcon={<CallOutlined />} className="people-call-button">020 8586 5657</Button></Box></Container></Box>
  </Box>;
}
