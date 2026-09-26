import { useMemo, useRef, useState } from "react";
import { ArrowForward, CheckCircle, LocationOn, Search, WorkOutlined } from "@mui/icons-material";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { careers, team } from "../data/content";

const benefits = [
  ["Grow with responsibility", "Take ownership of meaningful work with experienced colleagues close by."],
  ["Build a lasting practice", "Develop your legal career in a firm that values sound judgement and client care."],
  ["Work with real people", "Join a friendly, diverse team focused on making important decisions feel manageable."],
];

const titleSx = { color: "#1e3d7a", fontWeight: 800, letterSpacing: "-0.045em" };

type ApplicationData = { fullName: string; email: string; telephone: string; role: string; profileUrl: string; coverLetter: string };
const blankApplication = (): ApplicationData => ({ fullName: "", email: "", telephone: "", role: "", profileUrl: "", coverLetter: "" });

export default function CareersPage() {
  const [query, setQuery] = useState("");
  const [application, setApplication] = useState<ApplicationData>(blankApplication);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const applicationRef = useRef<HTMLElement | null>(null);
  const matchingCareers = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? careers.filter((job) => `${job.title} ${job.location} ${job.type}`.toLowerCase().includes(term)) : careers;
  }, [query]);

  const selectRole = (role = "") => {
    setApplication((current) => ({ ...current, role }));
    setSubmitted(false);
    setSubmitError(null);
    window.setTimeout(() => applicationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const setApplicationField = (field: keyof ApplicationData, value: string) => setApplication((current) => ({ ...current, [field]: value }));

  const submitApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...application, submittedAt: new Date().toISOString(), formType: "Career application", privacyConsent, formStartedAt: startedAt, website }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) throw new Error(result?.error || "Unable to save application.");
      setSubmitted(true);
    } catch {
      setSubmitError("We could not save your application. Nothing has been submitted. Please try again shortly or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#fcfdfe", color: "#0d1424" }}>
      <Box component="section" sx={{ bgcolor: "#e3f1fa", borderBottom: "1px solid rgba(34, 69, 138, 0.14)", py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 760 }}>
            <Typography sx={{ color: "#2874c9", fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", mb: 2 }}>Careers at Law & Lawyers</Typography>
            <Typography component="h1" sx={{ ...titleSx, fontSize: { xs: 42, sm: 56, lg: 70 }, lineHeight: 0.98, maxWidth: 720 }}>Build a legal career with purpose.</Typography>
            <Typography sx={{ color: "#425878", fontSize: { xs: 17, md: 19 }, lineHeight: 1.6, maxWidth: 610, mt: 3 }}>Join a client-focused team where your expertise helps people move forward with confidence.</Typography>
            <TextField aria-label="Search careers" fullWidth value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by role or location" slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search sx={{ color: "#22458a" }} /></InputAdornment> } }} sx={{ mt: 4, maxWidth: 530, "& .MuiOutlinedInput-root": { bgcolor: "#fff", borderRadius: "10px", "& fieldset": { borderColor: "rgba(34, 69, 138, 0.28)" }, "&:hover fieldset": { borderColor: "#2874c9" }, "&.Mui-focused fieldset": { borderColor: "#22458a", borderWidth: 2 } } }} />
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 0.9fr)" }, gap: { xs: 4, md: 7 }, alignItems: "center" }}>
            <Box component="img" src="/images/careers-team-illustration.png" alt="Law firm colleagues working together around a case file" sx={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "18px" }} />
            <Box>
              <Typography component="h2" sx={{ ...titleSx, fontSize: { xs: 31, sm: 40 }, lineHeight: 1.04, maxWidth: 430 }}>Join a team that makes the difference.</Typography>
              <Typography sx={{ color: "#52637e", fontSize: 17, lineHeight: 1.65, mt: 2.5, maxWidth: 460 }}>Our work combines legal expertise with genuine care. We support each other, share knowledge and put clients at the centre of every matter.</Typography>
              <Button onClick={() => selectRole()} variant="contained" endIcon={<ArrowForward />} sx={{ mt: 3.5, bgcolor: "#22458a", borderRadius: "8px", px: 2.5, py: 1.25, fontWeight: 800, textTransform: "none", "&:hover": { bgcolor: "#17366f", transform: "translateY(-1px)" }, "&:active": { transform: "translateY(0)" } }}>Apply to join us</Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ bgcolor: "#f3f7fb", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography component="h2" sx={{ ...titleSx, fontSize: { xs: 29, sm: 36 } }}>A place to do your best work.</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr 1fr" }, mt: 4, borderTop: "1px solid rgba(34, 69, 138, 0.18)", "& > div": { py: { xs: 3, md: 0 }, pr: { md: 4 }, borderBottom: { xs: "1px solid rgba(34, 69, 138, 0.18)", md: "none" }, borderRight: { md: "1px solid rgba(34, 69, 138, 0.18)" } }, "& > div:last-child": { pr: 0, borderRight: "none", borderBottom: "none" }, "& > div:not(:first-of-type)": { pl: { md: 4 } } }}>
            {benefits.map(([title, copy]) => <Box key={title}><Typography sx={{ color: "#22458a", fontSize: { xs: 20, md: 22 }, fontWeight: 800, lineHeight: 1.2 }}>{title}</Typography><Typography sx={{ color: "#52637e", fontSize: 15, lineHeight: 1.6, mt: 1.25, maxWidth: 270 }}>{copy}</Typography></Box>)}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography component="h2" sx={{ ...titleSx, fontSize: { xs: 32, sm: 42 } }}>Current opportunities</Typography>
          <Typography sx={{ color: "#52637e", fontSize: 16, mt: 1.25 }}>{matchingCareers.length} {matchingCareers.length === 1 ? "role" : "roles"} currently match your search.</Typography>
          <Box sx={{ display: "grid", gap: 1.5, mt: 4 }}>
            {matchingCareers.map((job) => <Box key={job.title} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" }, gap: 2, alignItems: "center", border: "1px solid rgba(34, 69, 138, 0.16)", borderRadius: "12px", px: { xs: 2.5, sm: 3 }, py: 2.5, transition: "border-color 180ms ease, background-color 180ms ease, transform 180ms ease", "&:hover": { borderColor: "#2874c9", bgcolor: "#f7fbfe", transform: "translateY(-1px)" } }}>
              <Box><Typography sx={{ color: "#1e3d7a", fontSize: { xs: 19, sm: 21 }, fontWeight: 800 }}>{job.title}</Typography><Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1.25 }}><Box sx={{ display: "flex", gap: 0.6, alignItems: "center" }}><LocationOn sx={{ color: "#2874c9", fontSize: 17 }} /><Typography sx={{ color: "#52637e", fontSize: 14 }}>{job.location}</Typography></Box><Box sx={{ display: "flex", gap: 0.6, alignItems: "center" }}><WorkOutlined sx={{ color: "#2874c9", fontSize: 17 }} /><Typography sx={{ color: "#52637e", fontSize: 14 }}>{job.type}</Typography></Box></Box></Box>
              <Button onClick={() => selectRole(job.title)} variant="outlined" endIcon={<ArrowForward />} sx={{ justifySelf: { xs: "start", sm: "end" }, borderColor: "#22458a", borderRadius: "8px", color: "#22458a", fontWeight: 800, textTransform: "none", whiteSpace: "nowrap", "&:hover": { borderColor: "#22458a", bgcolor: "#e3f1fa" } }}>Apply for role</Button>
            </Box>)}
          </Box>
          {!matchingCareers.length && <Box sx={{ bgcolor: "#f3f7fb", borderRadius: "12px", mt: 3, p: { xs: 3, md: 4 } }}><Typography sx={{ color: "#1e3d7a", fontSize: 19, fontWeight: 800 }}>No roles found</Typography><Typography sx={{ color: "#52637e", fontSize: 15, mt: 1 }}>Try another search, or email us your CV for future opportunities.</Typography></Box>}
        </Container>
      </Box>

      <Box component="section" ref={applicationRef} id="career-application" sx={{ bgcolor: "#f3f7fb", py: { xs: 7, md: 10 }, scrollMarginTop: 100 }}>
        <Container maxWidth="md">
          <Typography component="h2" sx={{ ...titleSx, fontSize: { xs: 32, sm: 42 } }}>Apply for a role</Typography>
          <Typography sx={{ color: "#52637e", fontSize: 16, lineHeight: 1.6, mt: 1.25, maxWidth: 620 }}>Your application is saved securely in our careers team spreadsheet. Please do not include sensitive identity documents in this form.</Typography>
          <Box component="form" onSubmit={submitApplication} sx={{ mt: 4, bgcolor: "#fff", border: "1px solid rgba(34, 69, 138, 0.16)", borderRadius: "16px", p: { xs: 2.5, sm: 4 } }}>
            <TextField tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(event) => setWebsite(event.target.value)} sx={{ position: "absolute", left: -10000, width: 1, height: 1, opacity: 0 }} />
            <Grid container spacing={2.25}>
              <Grid size={{ xs: 12, sm: 6 }}><TextField required fullWidth label="Full name" value={application.fullName} onChange={(event) => setApplicationField("fullName", event.target.value)} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField required fullWidth type="email" label="Email address" value={application.email} onChange={(event) => setApplicationField("email", event.target.value)} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField required fullWidth type="tel" label="Telephone number" value={application.telephone} onChange={(event) => setApplicationField("telephone", event.target.value)} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="Role you are applying for" value={application.role} onChange={(event) => setApplicationField("role", event.target.value)}><MenuItem value="General application">General application</MenuItem>{careers.map((job) => <MenuItem key={job.title} value={job.title}>{job.title}</MenuItem>)}</TextField></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth type="url" label="CV, LinkedIn or professional profile link" helperText="Optional. Share a secure link rather than uploading identity documents." value={application.profileUrl} onChange={(event) => setApplicationField("profileUrl", event.target.value)} /></Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth multiline minRows={5} label="Cover letter or message" value={application.coverLetter} onChange={(event) => setApplicationField("coverLetter", event.target.value)} /></Grid>
            </Grid>
            <FormControlLabel required control={<Checkbox checked={privacyConsent} onChange={(event) => setPrivacyConsent(event.target.checked)} />} label="I consent to Law & Lawyers using these details to consider my application and contact me." sx={{ mt: 2, alignItems: "flex-start", "& .MuiFormControlLabel-label": { fontSize: 14, lineHeight: 1.45, mt: 0.9 } }} />
            <Box sx={{ mt: 2.5, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}><Button type="submit" variant="contained" disabled={submitting || submitted} endIcon={submitted ? <CheckCircle /> : <ArrowForward />} sx={{ bgcolor: "#22458a", borderRadius: "8px", px: 2.5, py: 1.2, fontWeight: 800, textTransform: "none", "&:hover": { bgcolor: "#17366f" } }}>{submitted ? "Application received" : submitting ? "Sending application..." : "Send application"}</Button>{submitted && <Typography sx={{ color: "#177245", fontSize: 14, fontWeight: 700 }}>Thank you. Your application has been received.</Typography>}</Box>
            {submitError && <Typography role="alert" sx={{ mt: 2, color: "#b42318", fontSize: 14, fontWeight: 700 }}>{submitError}</Typography>}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ bgcolor: "#e3f1fa", py: { xs: 7, md: 9 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "end" }, justifyContent: "space-between", gap: 3 }}><Box><Typography component="h2" sx={{ ...titleSx, fontSize: { xs: 31, sm: 40 } }}>Meet the people behind the work.</Typography><Typography sx={{ color: "#52637e", fontSize: 16, lineHeight: 1.6, maxWidth: 550, mt: 1.5 }}>You will work alongside experienced lawyers who care about quality, clarity and doing right by clients.</Typography></Box><Button component={Link} to="/#team" endIcon={<ArrowForward />} sx={{ color: "#22458a", fontWeight: 800, textTransform: "none", whiteSpace: "nowrap" }}>Meet the full team</Button></Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2, mt: 4 }}>
            {team.slice(0, 3).map((person) => <Box component={Link} to={`/team/${person.slug}`} key={person.slug} sx={{ display: "block", color: "inherit", textDecoration: "none", borderRadius: "14px", overflow: "hidden", bgcolor: "#fff", transition: "transform 180ms ease, box-shadow 180ms ease", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 12px 26px rgba(34, 69, 138, 0.15)" } }}><Box component="img" src={person.photo ?? "/images/logo-icon.png"} alt={person.name} sx={{ display: "block", width: "100%", height: { xs: 260, sm: 220 }, objectFit: "cover", objectPosition: "top" }} /><Box sx={{ p: 2 }}><Typography sx={{ color: "#1e3d7a", fontWeight: 800, fontSize: 18 }}>{person.name}</Typography><Typography sx={{ color: "#60728f", fontSize: 14, mt: 0.4 }}>{person.role}</Typography></Box></Box>)}
          </Box>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 7, md: 9 } }}><Container maxWidth="lg"><Box sx={{ bgcolor: "#1e3d7a", borderRadius: "16px", color: "#fff", p: { xs: 3.5, sm: 5, md: 6 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr auto" }, alignItems: "center", gap: 3 }}><Box><Typography component="h2" sx={{ fontSize: { xs: 30, sm: 38 }, fontWeight: 800, letterSpacing: "-0.045em" }}>Do not see your role listed?</Typography><Typography sx={{ color: "#c8ddf0", fontSize: 16, lineHeight: 1.6, maxWidth: 560, mt: 1.5 }}>We welcome introductions from thoughtful legal professionals who want to make a positive contribution.</Typography></Box><Button onClick={() => selectRole("General application")} endIcon={<ArrowForward />} sx={{ bgcolor: "#fff", color: "#1e3d7a", borderRadius: "8px", px: 2.5, py: 1.25, fontWeight: 800, textTransform: "none", whiteSpace: "nowrap", "&:hover": { bgcolor: "#e3f1fa" } }}>Submit a general application</Button></Box></Container></Box>
    </Box>
  );
}
