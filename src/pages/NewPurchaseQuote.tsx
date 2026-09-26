import { useMemo, useState } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { CheckCircle, Email, RestartAlt } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

type Buyer = { name: string; email: string; phone: string };
type QuoteData = {
  price: string; propertyAddress: string; tenure: string; buyerCount: number; buyers: Buyer[];
  currentAddress: string; newBuild: string; firstTimeBuyer: string; mortgageAdvisor: string;
  mortgageBank: string; giftedMoney: string; giftDetails: string; referralSource: string; referralName: string;
  propertyLocation: string; transactionDetail: string; purchasePurpose: string; newMortgage: string; notes: string;
};

const newData = (): QuoteData => ({
  price: "", propertyAddress: "", tenure: "", buyerCount: 2,
  buyers: Array.from({ length: 4 }, () => ({ name: "", email: "", phone: "" })),
  currentAddress: "", newBuild: "", firstTimeBuyer: "", mortgageAdvisor: "", mortgageBank: "",
  giftedMoney: "", giftDetails: "", referralSource: "", referralName: "", propertyLocation: "",
  transactionDetail: "", purchasePurpose: "", newMortgage: "", notes: "",
});

export default function NewPurchaseQuote() {
  const [data, setData] = useState<QuoteData>(newData);
  const [startedAt] = useState(() => Date.now());
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const activeBuyers = useMemo(() => data.buyers.slice(0, data.buyerCount), [data.buyers, data.buyerCount]);
  const setField = (field: keyof QuoteData, value: string | number) => setData((current) => ({ ...current, [field]: value }));
  const setBuyer = (index: number, field: keyof Buyer, value: string) => setData((current) => ({
    ...current,
    buyers: current.buyers.map((buyer, buyerIndex) => buyerIndex === index ? { ...buyer, [field]: value } : buyer),
  }));

  const sendByEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
        const payload = {
          submittedAt: new Date().toISOString(),
          formType: "New purchase quote request",
          purchasePrice: data.price,
          purchaseAddress: data.propertyAddress,
          propertyLocation: data.propertyLocation,
          tenure: data.tenure,
          transactionDetail: data.transactionDetail,
          purchasePurpose: data.purchasePurpose,
          newMortgage: data.newMortgage,
          numberOfBuyers: data.buyerCount,
          buyer1Name: data.buyers[0]?.name ?? "", buyer1Email: data.buyers[0]?.email ?? "", buyer1Telephone: data.buyers[0]?.phone ?? "",
          buyer2Name: data.buyers[1]?.name ?? "", buyer2Email: data.buyers[1]?.email ?? "", buyer2Telephone: data.buyers[1]?.phone ?? "",
          buyer3Name: data.buyers[2]?.name ?? "", buyer3Email: data.buyers[2]?.email ?? "", buyer3Telephone: data.buyers[2]?.phone ?? "",
          buyer4Name: data.buyers[3]?.name ?? "", buyer4Email: data.buyers[3]?.email ?? "", buyer4Telephone: data.buyers[3]?.phone ?? "",
          currentAddress: data.currentAddress,
          newBuild: data.newBuild,
          firstTimeBuyer: data.firstTimeBuyer,
          mortgageAdvisor: data.mortgageAdvisor,
          mortgageBank: data.mortgageBank,
          giftedMoney: data.giftedMoney,
          giftDetails: data.giftDetails,
          referralSource: data.referralSource,
          referralName: data.referralName,
          notes: data.notes,
          privacyConsent,
          formStartedAt: startedAt,
          website,
        };
        const response = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json().catch(() => null);
        if (!response.ok || !result?.ok) throw new Error(result?.error || "Unable to save quote request.");
        setSubmitted(true);
    } catch {
      setSubmitError("We could not save your details. Nothing has been submitted. Please call 07380 866528 or try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    if (!window.confirm("Clear all the details entered in this form?")) return;
    setData(newData());
    setPrivacyConsent(false);
  };

  return (
    <>
      <PageHeader
        eyebrow="Conveyancing quote request"
        title="New Purchase Details"
        subtitle="Complete the details below and we will prepare an accurate quote for your purchase."
        crumbs={[{ label: "Home", to: "/" }, { label: "Residential Conveyancing", to: "/services/residential-conveyancing" }, { label: "New Purchase Details" }]}
      />
      <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 6, sm: 10 } }}>
        <Container maxWidth="md">
          <form onSubmit={sendByEmail}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ color: "#0a1122" }}>Property details</Typography>
              <Typography sx={{ mt: 1, color: "text.secondary" }}>Your details are submitted only when you choose to send them.</Typography>
              <Grid container spacing={2.5} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}><TextField required fullWidth label="Purchase price" placeholder="£350,000" value={data.price} onChange={(e) => setField("price", e.target.value)} /></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="Property location" value={data.propertyLocation} onChange={(e) => setField("propertyLocation", e.target.value)}><MenuItem value="England">England</MenuItem><MenuItem value="Wales">Wales</MenuItem></TextField></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="Freehold or leasehold" value={data.tenure} onChange={(e) => setField("tenure", e.target.value)}><MenuItem value="Freehold">Freehold</MenuItem><MenuItem value="Leasehold">Leasehold</MenuItem><MenuItem value="Share of Freehold">Share of Freehold</MenuItem><MenuItem value="Not sure">Not sure</MenuItem></TextField></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><TextField select fullWidth label="Transaction details" value={data.transactionDetail} onChange={(e) => setField("transactionDetail", e.target.value)}><MenuItem value="None">None of these</MenuItem><MenuItem value="Shared Ownership">Shared Ownership</MenuItem><MenuItem value="Right to Buy">Right to Buy</MenuItem><MenuItem value="Help to Buy ISA or Lifetime ISA">Help to Buy ISA or Lifetime ISA</MenuItem></TextField></Grid>
                <Grid size={{ xs: 12 }}><TextField required fullWidth multiline minRows={3} label="Purchase address" placeholder="House or flat, street, town and postcode" value={data.propertyAddress} onChange={(e) => setField("propertyAddress", e.target.value)} /></Grid>
              </Grid>
            </Box>

            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ color: "#0a1122" }}>Buyer details</Typography>
              <Grid container spacing={2.5} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="Number of buyers" value={data.buyerCount} onChange={(e) => setField("buyerCount", Number(e.target.value))}>{[1, 2, 3, 4].map((count) => <MenuItem key={count} value={count}>{count}</MenuItem>)}</TextField></Grid>
              </Grid>
              {activeBuyers.map((buyer, index) => (
                <Box key={index} sx={{ mt: 3, pt: 3, borderTop: "1px solid rgba(29,52,104,0.14)" }}>
                  <Typography sx={{ fontWeight: 700, color: "#1d3468" }}>{data.buyerCount === 1 ? "Buyer" : `Buyer ${index + 1}`}</Typography>
                  <Grid container spacing={2.5} sx={{ mt: 0.25 }}>
                    <Grid size={{ xs: 12, sm: 4 }}><TextField required fullWidth label="Full name" placeholder="As it appears on ID" value={buyer.name} onChange={(e) => setBuyer(index, "name", e.target.value)} /></Grid>
                    <Grid size={{ xs: 12, sm: 4 }}><TextField required fullWidth type="email" label="Email address" value={buyer.email} onChange={(e) => setBuyer(index, "email", e.target.value)} /></Grid>
                    <Grid size={{ xs: 12, sm: 4 }}><TextField required fullWidth type="tel" label="Telephone number" value={buyer.phone} onChange={(e) => setBuyer(index, "phone", e.target.value)} /></Grid>
                  </Grid>
                </Box>
              ))}
              <TextField required fullWidth multiline minRows={3} sx={{ mt: 3 }} label="Current address" placeholder="Current address for all buyers, including postcode" value={data.currentAddress} onChange={(e) => setField("currentAddress", e.target.value)} />
            </Box>

            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ color: "#0a1122" }}>Purchase and financial details</Typography>
              <Grid container spacing={2.5} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="Are you buying a new build?" value={data.newBuild} onChange={(e) => setField("newBuild", e.target.value)}><MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem></TextField></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="Are you a first-time buyer?" value={data.firstTimeBuyer} onChange={(e) => setField("firstTimeBuyer", e.target.value)}><MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem></TextField></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Mortgage advisor" placeholder="Name and firm, or none" value={data.mortgageAdvisor} onChange={(e) => setField("mortgageAdvisor", e.target.value)} /></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Mortgage bank" placeholder="Lender, or cash purchase" value={data.mortgageBank} onChange={(e) => setField("mortgageBank", e.target.value)} /></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="Are you receiving any gifted money?" value={data.giftedMoney} onChange={(e) => setField("giftedMoney", e.target.value)}><MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem></TextField></Grid>
                {data.giftedMoney === "Yes" && <Grid size={{ xs: 12, sm: 6 }}><TextField required fullWidth label="Gift money details" placeholder="Who from and roughly how much" value={data.giftDetails} onChange={(e) => setField("giftDetails", e.target.value)} /></Grid>}
                <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="Will you be getting a new mortgage?" value={data.newMortgage} onChange={(e) => setField("newMortgage", e.target.value)}><MenuItem value="Yes">Yes</MenuItem><MenuItem value="No, cash purchase">No, this is a cash purchase</MenuItem></TextField></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><TextField select fullWidth label="Purchase purpose" value={data.purchasePurpose} onChange={(e) => setField("purchasePurpose", e.target.value)}><MenuItem value="First-time buyer">First-time buyer</MenuItem><MenuItem value="Buy-to-let">Buy-to-let</MenuItem><MenuItem value="Second home">Second home</MenuItem><MenuItem value="Replacing main residence">Replacing main residence</MenuItem><MenuItem value="Other">Other</MenuItem></TextField></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="How did you hear about us?" value={data.referralSource} onChange={(e) => setField("referralSource", e.target.value)}><MenuItem value="Internet">Internet</MenuItem><MenuItem value="Google search">Google search</MenuItem><MenuItem value="Friends or family">Friends or family</MenuItem><MenuItem value="Referred by someone">Referred by someone</MenuItem><MenuItem value="Estate agent">Estate agent</MenuItem><MenuItem value="Social media">Social media</MenuItem><MenuItem value="Other">Other</MenuItem></TextField></Grid>
                {data.referralSource === "Referred by someone" && <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Referrer's name" value={data.referralName} onChange={(e) => setField("referralName", e.target.value)} /></Grid>}
                <Grid size={{ xs: 12 }}><TextField fullWidth label="Anything else we should know?" multiline minRows={3} placeholder="Target completion date, chain details or other notes" value={data.notes} onChange={(e) => setField("notes", e.target.value)} /></Grid>
              </Grid>
            </Box>

            <Box sx={{ borderTop: "1px solid rgba(29,52,104,0.14)", pt: 4 }}>
              <Typography variant="h5" sx={{ color: "#0a1122" }}>Send your details</Typography>
              <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.7 }}>Your completed details will be saved securely and sent to our Property Team. You can also call 07380 866528 for direct advice.</Typography>
              <TextField tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(event) => setWebsite(event.target.value)} sx={{ position: "absolute", left: -10000, width: 1, height: 1, opacity: 0 }} />
              <FormControlLabel required control={<Checkbox checked={privacyConsent} onChange={(event) => setPrivacyConsent(event.target.checked)} />} label="I consent to Law & Lawyers using these details to prepare and respond to my quote request." sx={{ mt: 2, alignItems: "flex-start", "& .MuiFormControlLabel-label": { fontSize: 14, lineHeight: 1.45, mt: 0.9 } }} />
              <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                <Button type="submit" variant="contained" disabled={submitting || submitted} startIcon={submitted ? <CheckCircle /> : <Email />} sx={{ py: 1.4, background: "linear-gradient(115deg,#1d3468,#22458a,#2f74bd)" }}>{submitted ? "Details sent" : submitting ? "Sending details..." : "Send my details"}</Button>
                <Button type="button" onClick={resetForm} variant="outlined" startIcon={<RestartAlt />}>Clear form</Button>
                <Button component={Link} to="/book-a-consultation" variant="text">Book via Zoom</Button>
              </Box>
              {submitted && <Typography sx={{ mt: 2, fontSize: 14, color: "#177245", fontWeight: 700 }}>Thank you. Your quote request has been received.</Typography>}
              {submitError && <Typography role="alert" sx={{ mt: 2, fontSize: 14, color: "#b42318", fontWeight: 700 }}>{submitError}</Typography>}
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
}
