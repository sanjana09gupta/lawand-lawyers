import { useParams, Navigate, Link } from "react-router-dom";
import { Box, Container, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, Button, Chip } from "@mui/material";
import { CheckCircle, ArrowForward } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
import { services } from "../data/content";
import { conveyancingFeesUrl } from "../data/links";

const individualImmigrationServices = [
  "Investor, Global Talent, Innovator and Start-up routes",
  "Skilled Worker and overseas business representative visas",
  "Temporary work, youth mobility and ancestry routes",
  "Family, domestic worker and dependant applications",
  "Indefinite Leave to Remain, citizenship and EU Settlement Scheme",
  "Appeals, administrative reviews and immigration-status problems",
];

const businessImmigrationServices = [
  "Sponsor licence applications and renewals",
  "Certificates of Sponsorship and visa sponsorship management",
  "Right-to-work compliance and immigration audits",
  "Overseas recruitment and ongoing sponsor support",
  "Home Office civil-penalty notices, suspensions and revocations",
];

const legacyServiceContent: Record<string, { heading: string; paragraphs: string[]; secondaryHeading?: string; secondaryParagraph?: string }> = {
  "wills-and-probate": {
    heading: "Practical wills and probate advice for individuals and families.",
    paragraphs: ["Our wills and probate solicitors provide tailored advice on estate planning, wills and the legal work required after a death. We take a practical, considerate approach and explain the available options clearly.", "We can help when you need to make or update a will, plan for the future, deal with a relative's estate, or understand a contested will or inheritance decision."],
    secondaryHeading: "Administration of estates",
    secondaryParagraph: "Where there is a will, it sets out how the estate should be dealt with. Where there is no will, the Rules of Intestacy apply. We can assist with grants of probate or letters of administration, property transfers, policies, assets, beneficiaries and HMRC matters.",
  },
  employment: {
    heading: "Clear and focused advice for each employment matter.",
    paragraphs: ["Our employment solicitors advise employees who need prompt, practical support when a difficult situation arises at work. We understand that employment disputes can be stressful and time-sensitive.", "We advise on bullying and harassment, redundancy, disciplinary proceedings, performance issues, sickness, discrimination, settlement agreements, gross misconduct, constructive dismissal, unfair dismissal, resignation and contractual disputes."],
    secondaryHeading: "Prompt representation when it matters",
    secondaryParagraph: "Our employment team can provide practical and authoritative advice and representation across the UK, with support tailored to the facts of your case.",
  },
  family: {
    heading: "Sensitive family-law advice when circumstances change.",
    paragraphs: ["Our family-law solicitors advise on divorce and separation with a focus on confidentiality, clear communication and practical next steps.", "We can help resolve matters involving financial arrangements, maintenance, children, civil partnerships and cohabitation. We aim to combine practical advice with decisive action during a difficult time."],
    secondaryHeading: "Divorce and separation",
    secondaryParagraph: "Whether you are starting a divorce, responding to proceedings or considering a formal separation, we can explain the process and the implications for your family and finances.",
  },
  "landlord-and-tenant": {
    heading: "Experienced advice on landlord and tenant issues.",
    paragraphs: ["We advise landlords and tenants on residential repossessions and evictions, notices, tenancy agreements and commercial property disputes.", "We offer competitive rates, including fixed fees for possession proceedings where appropriate. Contact us to discuss the best way forward for your matter."],
    secondaryHeading: "A clear route through possession and tenancy disputes",
    secondaryParagraph: "We assess the documents, notice requirements and the practical steps needed to resolve the issue as efficiently as possible.",
  },
  "dispute-resolution": {
    heading: "Practical representation for disputes that need resolution.",
    paragraphs: ["Our dispute-resolution service supports individuals and businesses when negotiation, mediation or formal proceedings are needed. We will explain the risks, likely costs and available options before you commit to a course of action.", "We work to resolve matters proportionately, while preparing thoroughly if court or tribunal representation becomes necessary."],
    secondaryHeading: "Clear strategy from the outset",
    secondaryParagraph: "Every dispute is different. We focus on the facts, documents and commercial or personal outcome that matters to you.",
  },
  "commercial-conveyancing": {
    heading: "Commercial property advice for transactions and leases.",
    paragraphs: ["Our commercial conveyancing team advises on buying, selling, leasing and refinancing commercial property across England and Wales.", "We help businesses and investors understand title, lease, finance and transaction risks, keeping the legal work aligned with the timetable for your deal."],
    secondaryHeading: "Commercial transactions handled with care",
    secondaryParagraph: "We support property acquisitions, disposals, lease negotiations and landlord and tenant matters with clear advice at each stage.",
  },
  "corporate-immigration-services": {
    heading: "Corporate immigration support for employers and sponsors.",
    paragraphs: ["We support businesses with sponsor licence applications, Certificates of Sponsorship, workforce immigration compliance and recruitment from overseas.", "Our team can assist with sponsor licence renewals, audits, Home Office notices, suspensions and ongoing sponsorship management."],
    secondaryHeading: "Support for your sponsored workforce",
    secondaryParagraph: "We give employers practical guidance on compliance duties and the immigration routes available to prospective and existing staff.",
  },
};

function ImmigrationDetail() {
  return <>
    <PageHeader
      eyebrow="Immigration"
      title="Immigration advice for the next step."
      subtitle="Experienced immigration solicitors supporting individuals and businesses with applications, compliance and representation."
      crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/#services" }, { label: "Immigration" }]}
    />
    <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 6, sm: 9 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 7 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ height: "100%", minHeight: { md: 430 }, display: "flex", flexDirection: "column", justifyContent: "center", p: { xs: 3.5, sm: 5 }, bgcolor: "#17366f", color: "#fff" }}>
              <Typography component="h2" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: { xs: 27, sm: 33 }, lineHeight: 1.12, letterSpacing: "-.035em" }}>
                Experienced immigration lawyers. Professional, practical advice.
              </Typography>
              <Button component={Link} to="/contact" variant="outlined" endIcon={<ArrowForward />} sx={{ alignSelf: "flex-start", mt: 3, color: "#fff", borderColor: "rgba(255,255,255,.75)", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,.1)" } }}>
                Request fee information
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography component="h2" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: { xs: 28, sm: 38 }, letterSpacing: "-.04em", color: "#1d3468" }}>
              Professional immigration advice, clearly explained.
            </Typography>
            <Typography sx={{ mt: 2, color: "#4a5468", fontSize: 17, lineHeight: 1.75 }}>
              Our immigration team advises on immigration and nationality matters, from preparing visa applications to complex appeals and tribunal representation. We explain the relevant route, evidence and likely process before work begins.
            </Typography>
            <Box component="img" src="/images/immigration-consultation.png" alt="Immigration advisers meeting clients in a London office" sx={{ display: "block", width: "100%", height: { xs: 220, sm: 300 }, mt: 3, objectFit: "cover" }} />
            <Box sx={{ mt: 4, pt: 4, borderTop: "1px solid rgba(29,52,104,.16)" }}>
              <Typography component="h2" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: { xs: 23, sm: 28 }, letterSpacing: "-.03em", color: "#0d1424" }}>
                Result-driven immigration solicitors in London.
              </Typography>
              <Typography sx={{ mt: 1.5, color: "#4a5468", fontSize: 16, lineHeight: 1.7 }}>
                Each matter is different. We provide practical advice for individuals, employers and sponsors, with a focus on a complete, well-prepared application and clear communication at every stage.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: { xs: 5, sm: 8 } }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ height: "100%", p: { xs: 3, sm: 4 }, border: "1px solid rgba(29,52,104,.16)", borderRadius: 3 }}>
              <Typography component="h2" sx={{ color: "#1d3468", fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: 25 }}>For individuals</Typography>
              <List sx={{ mt: 1 }}>{individualImmigrationServices.map((item) => <ListItem key={item} disableGutters><ListItemIcon sx={{ minWidth: 30 }}><CheckCircle sx={{ color: "#2f74bd", fontSize: 18 }} /></ListItemIcon><ListItemText primary={item} /></ListItem>)}</List>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ height: "100%", p: { xs: 3, sm: 4 }, bgcolor: "#0a1122", color: "#fff", borderRadius: 3 }}>
              <Typography component="h2" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: 25 }}>For businesses</Typography>
              <List sx={{ mt: 1 }}>{businessImmigrationServices.map((item) => <ListItem key={item} disableGutters><ListItemIcon sx={{ minWidth: 30 }}><CheckCircle sx={{ color: "#7fbde5", fontSize: 18 }} /></ListItemIcon><ListItemText primary={item} sx={{ "& .MuiListItemText-primary": { color: "#fff" } }} /></ListItem>)}</List>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 5, sm: 8 }, pt: { xs: 4, sm: 6 }, borderTop: "1px solid rgba(29,52,104,.16)" }}>
          <Typography component="h2" sx={{ color: "#1d3468", fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: { xs: 27, sm: 34 } }}>Our immigration experts</Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {[{ name: "Raju Radhakrishnan", role: "Director", slug: "raju-radhakrishnan", image: "/images/raju.jpg" }, { name: "Majo Jose", role: "Director", slug: "majo-jose", image: null }].map((expert) => <Grid key={expert.slug} size={{ xs: 12, sm: 6 }}><Box component={Link} to={`/team/${expert.slug}`} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, textDecoration: "none", color: "#0d1424", border: "1px solid rgba(29,52,104,.16)", borderRadius: 2, "&:hover": { borderColor: "#2f74bd", bgcolor: "#f3f6fa" } }}>{expert.image ? <Box component="img" src={expert.image} alt="" sx={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", objectPosition: "center top" }} /> : <Box sx={{ display: "grid", placeItems: "center", width: 60, height: 60, borderRadius: "50%", bgcolor: "#e3f1fa", color: "#22458a", fontWeight: 800 }}>M</Box>}<Box><Typography sx={{ fontWeight: 800 }}>{expert.name}</Typography><Typography sx={{ color: "#4a5468", fontSize: 14 }}>{expert.role}</Typography></Box></Box></Grid>)}
          </Grid>
        </Box>
      </Container>
    </Box>
  </>;
}

function ConveyancingDetail() {
  const experts = [
    { name: "Francis Mathew", role: "Senior Director", slug: "francis-mathew", image: "/images/francis.webp" },
    { name: "Bhavini Bhudia", role: "Director", slug: "bhavini-bhudia", image: "/images/bhavini.webp" },
  ];

  return <>
    <PageHeader
      eyebrow="Residential conveyancing"
      title="Conveyancing solicitors"
      subtitle="Clear, specialist legal support for property buyers and sellers from instruction through to completion."
      crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/#services" }, { label: "Residential Conveyancing" }]}
    />
    <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 6, sm: 9 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 7 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ height: "100%", minHeight: { md: 540 }, display: "flex", flexDirection: "column", justifyContent: "center", p: { xs: 3.5, sm: 5 }, bgcolor: "#17366f", color: "#fff" }}>
              <Typography component="h2" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: { xs: 27, sm: 32 }, lineHeight: 1.12, letterSpacing: "-.035em" }}>Specialist conveyancing solicitors for buyers and sellers.</Typography>
              <Typography sx={{ mt: 2, fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,.86)" }}>Supporting property transactions with a focused team, clear communication and careful legal advice.</Typography>
              <Box component="ul" sx={{ pl: 2.25, mt: 2.5, mb: 0, color: "rgba(255,255,255,.92)", fontSize: 14, lineHeight: 1.75 }}>
                <li>Trusted by over 5,000 clients</li>
                <li>Professional conveyancing experience</li>
                <li>Panel access with major mortgage lenders</li>
                <li>Personal attention at every stage</li>
              </Box>
              <Button component={Link} to={conveyancingFeesUrl} variant="outlined" endIcon={<ArrowForward />} sx={{ alignSelf: "flex-start", mt: 3, color: "#fff", borderColor: "rgba(255,255,255,.75)", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,.1)" } }}>View fee information</Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography component="h2" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: { xs: 28, sm: 38 }, letterSpacing: "-.04em", color: "#1d3468" }}>Exceptional conveyancing service for property buyers and sellers.</Typography>
            <Typography sx={{ mt: 2, color: "#4a5468", fontSize: 16.5, lineHeight: 1.75 }}>Law and Lawyers Solicitors provides residential conveyancing support for buyers and sellers across England and Wales. We advise on buying, selling, remortgaging and transfers of equity, with a clear view of the legal work and expected costs from the outset.</Typography>
            <Typography sx={{ mt: 2, color: "#4a5468", fontSize: 16.5, lineHeight: 1.75 }}>A property transaction often involves lenders, estate agents, surveyors and other solicitors. Our role is to protect your interests, explain the documents and keep the matter moving from instruction to completion.</Typography>
            <Box sx={{ mt: 4, p: { xs: 3, sm: 4 }, bgcolor: "#e3f1fa" }}>
              <Typography component="h2" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: { xs: 23, sm: 28 }, letterSpacing: "-.03em", color: "#1d3468" }}>A practical service from first instruction to completion.</Typography>
              <Typography sx={{ mt: 1.5, color: "#4a5468", fontSize: 16, lineHeight: 1.7 }}>We deal with the legal stages of your transaction, including contract review, searches, enquiries, mortgage requirements, exchange, completion and registration. We will explain the work required for your property and give you a transparent estimate before you instruct us.</Typography>
              <Button component={Link} to="/book-a-consultation" variant="contained" endIcon={<ArrowForward />} sx={{ mt: 2.5, bgcolor: "#22458a", "&:hover": { bgcolor: "#1d3468" } }}>Book a consultation</Button>
            </Box>
            <Box sx={{ mt: 4, pt: 4, borderTop: "1px solid rgba(29,52,104,.16)" }}>
              <Typography component="h2" sx={{ color: "#1d3468", fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: { xs: 25, sm: 31 } }}>Our conveyancing experts</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {experts.map((expert) => <Grid key={expert.slug} size={{ xs: 12, sm: 6 }}><Box component={Link} to={`/team/${expert.slug}`} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, textDecoration: "none", color: "#0d1424", border: "1px solid rgba(29,52,104,.16)", "&:hover": { borderColor: "#2f74bd", bgcolor: "#f3f6fa" } }}><Box component="img" src={expert.image} alt="" sx={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", objectPosition: "center top" }} /><Box><Typography sx={{ fontWeight: 800 }}>{expert.name}</Typography><Typography sx={{ color: "#4a5468", fontSize: 14 }}>{expert.role}</Typography></Box></Box></Grid>)}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>;
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/" replace />;

  if (service.slug === "immigration") return <ImmigrationDetail />;
  if (service.slug === "residential-conveyancing") return <ConveyancingDetail />;

  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  const legacy = legacyServiceContent[service.slug];

  return (
    <>
      <PageHeader
        eyebrow={service.category === "individual" ? "For Individuals" : "For Businesses"}
        title={service.title}
        subtitle={service.summary}
        crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/#services" }, { label: service.title }]}
      />

      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 8, sm: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography component="h2" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: { xs: 27, sm: 36 }, lineHeight: 1.08, letterSpacing: "-.04em", color: "#1d3468" }}>{legacy?.heading ?? "How we can help"}</Typography>
              {legacy?.paragraphs.map((paragraph) => <Typography key={paragraph} sx={{ mt: 2, color: "#4a5468", fontSize: 16, lineHeight: 1.75 }}>{paragraph}</Typography>)}
              {legacy?.secondaryHeading && <Box sx={{ mt: 4, p: { xs: 2.5, sm: 3 }, bgcolor: "#e3f1fa" }}><Typography component="h3" sx={{ fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: { xs: 21, sm: 25 }, color: "#1d3468" }}>{legacy.secondaryHeading}</Typography><Typography sx={{ mt: 1, color: "#4a5468", lineHeight: 1.7 }}>{legacy.secondaryParagraph}</Typography></Box>}
              <Typography component="h3" sx={{ mt: 4, fontFamily: "Arial, sans-serif", fontWeight: 800, fontSize: 22, color: "#0d1424" }}>How we can help</Typography>
              <List sx={{ mt: 1 }}>
                {service.points.map((p) => (
                  <ListItem key={p} disableGutters>
                    <ListItemIcon sx={{ minWidth: 34 }}>
                      <CheckCircle sx={{ color: "#2657a3", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={p} />
                  </ListItem>
                ))}
              </List>

              <Button
                component={Link}
                to={service.slug === "residential-conveyancing" ? "/book-a-consultation" : "/contact"}
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{ mt: 3, background: "linear-gradient(115deg,#1d3468,#22458a,#2f74bd,#4a97d6)" }}
              >
                {service.slug === "residential-conveyancing" ? "Book a Consultation" : "Contact our team"}
              </Button>
              {service.slug === "residential-conveyancing" && (
                <>
                  <Button component={Link} to="/services/residential-conveyancing/new-purchase-quote" variant="text" sx={{ mt: 1.5, display: "block", px: 0 }}>
                    New purchase quote form
                  </Button>
                  <Button component={Link} to={conveyancingFeesUrl} variant="text" sx={{ mt: 0.5, display: "block", px: 0 }}>
                    Fees information
                  </Button>
                </>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ p: 4, borderRadius: 3, bgcolor: "#0a1122", color: "#fff" }}>
                <Typography sx={{ fontFamily: "Fraunces, serif", fontSize: 20 }}>
                  Related services
                </Typography>
                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {related.map((r) => (
                    <Chip
                      key={r.slug}
                      component={Link}
                      to={`/services/${r.slug}`}
                      clickable
                      label={r.title}
                      sx={{
                        justifyContent: "flex-start",
                        bgcolor: "rgba(255,255,255,0.06)",
                        color: "#fff",
                        py: 2.4,
                        "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
