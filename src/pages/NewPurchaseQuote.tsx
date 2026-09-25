import { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Email, RestartAlt } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

type Buyer = { name: string; email: string; phone: string };
type QuoteData = {
  price: string; propertyAddress: string; tenure: string; buyerCount: number; buyers: Buyer[];
  currentAddress: string; newBuild: string; firstTimeBuyer: string; mortgageAdvisor: string;
  mortgageBank: string; giftedMoney: string; giftDetails: string; referralSource: string; notes: string;
};

const storageKey = "law-and-lawyers-new-purchase-quote";
const newData = (): QuoteData => ({
  price: "", propertyAddress: "", tenure: "", buyerCount: 2,
  buyers: Array.from({ length: 4 }, () => ({ name: "", email: "", phone: "" })),
  currentAddress: "", newBuild: "", firstTimeBuyer: "", mortgageAdvisor: "", mortgageBank: "",
  giftedMoney: "", giftDetails: "", referralSource: "", notes: "",
});

export default function NewPurchaseQuote() {
  const [data, setData] = useState<QuoteData>(newData);
  const [loaded, setLoaded] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setData({ ...newData(), ...JSON.parse(saved) });
    } catch { /* Keep the form usable when storage is unavailable. */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch { /* Saving locally is an enhancement, not a requirement. */ }
  }, [data, loaded]);

  const activeBuyers = useMemo(() => data.buyers.slice(0, data.buyerCount), [data.buyers, data.buyerCount]);
  const setField = (field: keyof QuoteData, value: string | number) => setData((current) => ({ ...current, [field]: value }));
  const setBuyer = (index: number, field: keyof Buyer, value: string) => setData((current) => ({
    ...current,
    buyers: current.buyers.map((buyer, buyerIndex) => buyerIndex === index ? { ...buyer, [field]: value } : buyer),
  }));

  const sendByEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const buyers = activeBuyers.map((buyer, index) => `Buyer ${index + 1}: ${buyer.name || "Not provided"} | ${buyer.email || "Not provided"} | ${buyer.phone || "Not provided"}`).join("\n");
    const body = [
      "NEW PURCHASE DETAILS - QUOTE REQUEST", "", "PROPERTY DETAILS",
      `Purchase price: ${data.price || "Not provided"}`,
      `Purchase address: ${data.propertyAddress || "Not provided"}`,
      `Tenure: ${data.tenure || "Not provided"}`, "", "BUYER DETAILS",
      `Number of buyers: ${data.buyerCount}`, buyers,
      `Current address: ${data.currentAddress || "Not provided"}`, "", "PURCHASE AND FINANCIAL DETAILS",
      `New build: ${data.newBuild || "Not provided"}`,
      `First-time buyer: ${data.firstTimeBuyer || "Not provided"}`,
      `Mortgage advisor: ${data.mortgageAdvisor || "Not provided"}`,
      `Mortgage bank: ${data.mortgageBank || "Not provided"}`,
      `Gifted money: ${data.giftedMoney || "Not provided"}`,
      data.giftedMoney === "Yes" ? `Gift details: ${data.giftDetails || "Not provided"}` : "",
      `How did you hear about us: ${data.referralSource || "Not provided"}`,
      data.notes ? `Additional notes: ${data.notes}` : "",
    ].filter(Boolean).join("\n");
    window.location.href = `mailto:mohit@lawandlawyers.co.uk?subject=${encodeURIComponent("New purchase details - quote request")}&body=${encodeURIComponent(body)}`;
  };

  const resetForm = () => {
    if (!window.confirm("Clear all the details entered in this form?")) return;
    localStorage.removeItem(storageKey);
    setData(newData());
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
              <Typography sx={{ mt: 1, color: "text.secondary" }}>Your answers save automatically on this device.</Typography>
              <Grid container spacing={2.5} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}><TextField required fullWidth label="Purchase price" placeholder="£350,000" value={data.price} onChange={(e) => setField("price", e.target.value)} /></Grid>
                <Grid size={{ xs: 12, sm: 6 }}><TextField required select fullWidth label="Freehold or leasehold" value={data.tenure} onChange={(e) => setField("tenure", e.target.value)}><MenuItem value="Freehold">Freehold</MenuItem><MenuItem value="Leasehold">Leasehold</MenuItem><MenuItem value="Not sure">Not sure</MenuItem></TextField></Grid>
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
                <Grid size={{ xs: 12, sm: 6 }}><TextField select fullWidth label="How did you hear about us?" value={data.referralSource} onChange={(e) => setField("referralSource", e.target.value)}><MenuItem value="Recommendation">Recommendation</MenuItem><MenuItem value="Google">Google</MenuItem><MenuItem value="Social media">Social media</MenuItem><MenuItem value="Estate agent">Estate agent</MenuItem><MenuItem value="Other">Other</MenuItem></TextField></Grid>
                <Grid size={{ xs: 12 }}><TextField fullWidth label="Anything else we should know?" multiline minRows={3} placeholder="Target completion date, chain details or other notes" value={data.notes} onChange={(e) => setField("notes", e.target.value)} /></Grid>
              </Grid>
            </Box>

            <Box sx={{ borderTop: "1px solid rgba(29,52,104,0.14)", pt: 4 }}>
              <Typography variant="h5" sx={{ color: "#0a1122" }}>Send your details</Typography>
              <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.7 }}>Email opens with your completed information ready to send to our Property Team. You can also call 07380 866528 for direct advice.</Typography>
              <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                <Button type="submit" variant="contained" startIcon={<Email />} sx={{ py: 1.4, background: "linear-gradient(115deg,#1d3468,#22458a,#2f74bd)" }}>Email my details</Button>
                <Button type="button" onClick={resetForm} variant="outlined" startIcon={<RestartAlt />}>Clear form</Button>
                <Button component={Link} to="/book-a-consultation" variant="text">Book via Zoom</Button>
              </Box>
              {savedAt && <Typography sx={{ mt: 2, fontSize: 13, color: "text.secondary" }}>Saved on this device at {savedAt}.</Typography>}
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
}
