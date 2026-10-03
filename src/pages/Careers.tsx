import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { ArrowForward, AttachFile, CheckCircle } from "@mui/icons-material";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { careers, team } from "../data/content";
import { apiUrl } from "../lib/api";

const benefits = [
  ["Grow with responsibility", "Take ownership of meaningful work with experienced colleagues close by."],
  ["Build a lasting practice", "Develop your legal career in a firm that values sound judgement and client care."],
  ["Work with real people", "Join a friendly, diverse team focused on making important decisions feel manageable."],
];

const titleSx = { color: "#1e3d7a", fontWeight: 800, letterSpacing: "-0.045em" };

type ApplicationData = { fullName: string; email: string; telephone: string; role: string; profileUrl: string; coverLetter: string };
type CvUpload = { name: string; mimeType: string; base64: string };
const blankApplication = (): ApplicationData => ({ fullName: "", email: "", telephone: "", role: "", profileUrl: "", coverLetter: "" });
const MAX_CV_BYTES = 2 * 1024 * 1024;

export default function CareersPage() {
  const [application, setApplication] = useState<ApplicationData>(blankApplication);
  const [cv, setCv] = useState<CvUpload | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const applicationRef = useRef<HTMLElement | null>(null);
  const selectRole = (role = "") => {
    setApplication((current) => ({ ...current, role }));
    setSubmitted(false);
    setSubmitError(null);
    window.setTimeout(() => applicationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const setApplicationField = (field: keyof ApplicationData, value: string) => setApplication((current) => ({ ...current, [field]: value }));

  const selectCv = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    setCvError(null);
    if (!file) return;
    if (file.size > MAX_CV_BYTES) {
      setCv(null);
      setCvError("Please choose a CV smaller than 2 MB.");
      return;
    }
    if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
      setCv(null);
      setCvError("Please upload a PDF, DOC or DOCX file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result.split(",")[1] : "";
      if (!result) {
        setCv(null);
        setCvError("We could not read that file. Please try another CV.");
        return;
      }
      setCv({ name: file.name, mimeType: file.type, base64: result });
    };
    reader.onerror = () => setCvError("We could not read that file. Please try another CV.");
    reader.readAsDataURL(file);
  };

  const submitApplication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch(apiUrl("/api/career"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...application, cv, submittedAt: new Date().toISOString(), formType: "Career application", privacyConsent, formStartedAt: startedAt, website }),
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
            <Typography sx={{ color: "#425878", fontSize: { xs: 17, md: 19 }, lineHeight: 1.6, maxWidth: 610, mt: 3 }}>Join a client-focused team where your expertise helps people move forward with confidence. We welcome applications from thoughtful legal professionals.</Typography>
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

      <Box component="section" ref={applicationRef} id="career-application" sx={{ bgcolor: "#f3f7fb", py: { xs: 7, md: 10 }, scrollMarginTop: 100 }}>
        <Container maxWidth="md">
          <Typography component="h2" sx={{ ...titleSx, fontSize: { xs: 32, sm: 42 } }}>Apply for a role</Typography>
          <Typography sx={{ color: "#52637e", fontSize: 16, lineHeight: 1.6, mt: 1.25, maxWidth: 620 }}>Your application is sent securely to our HR team at HR@lawandlawyers.co.uk. Please do not include identity documents or other sensitive documents.</Typography>
          <Box component="form" onSubmit={submitApplication} sx={{ mt: 4, bgcolor: "#fff", border: "1px solid rgba(34, 69, 138, 0.16)", borderRadius: "16px", p: { xs: 2.5, sm: 4 } }}>
            <TextField tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(event) => setWebsite(event.target.value)} sx={{ position: "absolute", left: -10000, width: 1, height: 1, opacity: 0 }} />
            <Grid container spacing={2.25}>
              <Grid size={{ xs: 12, sm: 6 }}><TextField required fullWidth label="Full name" value={application.fullName} onChange={(event) => setApplicationField("fullName", event.target.value)} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField required fullWidth type="email" label="Email address" value={application.email} onChange={(event) => setApplicationField("email", event.target.value)} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField required fullWidth type="tel" label="Telephone number" value={application.telephone} onChange={(event) => setApplicationField("telephone", event.target.value)} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="Role you are applying for" value={application.role} onChange={(event) => setApplicationField("role", event.target.value)}><MenuItem value="General application">General application</MenuItem>{careers.map((job) => <MenuItem key={job.title} value={job.title}>{job.title}</MenuItem>)}</TextField></Grid>
              <Grid size={{ xs: 12 }}>
                <Box sx={{ border: "1px dashed rgba(34, 69, 138, 0.42)", borderRadius: "10px", bgcolor: "#f8fbfe", p: { xs: 2, sm: 2.5 } }}>
                  <Typography sx={{ color: "#1e3d7a", fontSize: 16, fontWeight: 800 }}>Upload your CV</Typography>
                  <Typography sx={{ color: "#52637e", fontSize: 13.5, lineHeight: 1.5, mt: 0.5 }}>Optional PDF, DOC or DOCX file, up to 2 MB. Your CV will be attached to the email sent to HR.</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", mt: 1.75 }}>
                    <Button component="label" variant="outlined" startIcon={<AttachFile />} sx={{ borderColor: "#22458a", color: "#22458a", borderRadius: "8px", fontWeight: 800, textTransform: "none", "&:hover": { borderColor: "#17366f", bgcolor: "#e3f1fa" } }}>
                      Choose CV
                      <input hidden type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={selectCv} />
                    </Button>
                    {cv && <Typography sx={{ color: "#177245", fontSize: 14, fontWeight: 700 }}>{cv.name} ready to send</Typography>}
                  </Box>
                  {cvError && <Typography role="alert" sx={{ mt: 1, color: "#b42318", fontSize: 13.5, fontWeight: 700 }}>{cvError}</Typography>}
                </Box>
              </Grid>
              <Grid size={{ xs: 12 }}><TextField fullWidth type="url" label="LinkedIn or professional profile link" helperText="Optional." value={application.profileUrl} onChange={(event) => setApplicationField("profileUrl", event.target.value)} /></Grid>
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
