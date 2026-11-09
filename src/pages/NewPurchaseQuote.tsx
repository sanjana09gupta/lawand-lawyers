import { useState } from "react";
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import { apiUrl } from "../lib/api";

type Values = Record<string, string>;
const choices = ["Sale", "Purchase", "Sale & Purchase"];

export default function NewPurchaseQuote() {
  const [type, setType] = useState("");
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState<Values>({ saleTenure: "Freehold", purchaseTenure: "Freehold", saleMortgage: "Yes", purchaseMortgage: "Yes", jurisdiction: "England", saleSharedOwnership: "No", helpToBuyMortgage: "No", purchaseSharedOwnership: "No", giftedDeposit: "No", newBuild: "No", helpToBuyIsa: "No", lifetimeIsa: "No", sellers: "1", buyers: "1" });
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const set = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const sale = type !== "Purchase";
  const purchase = type !== "Sale";

  const field = (key: string, label: string, required = false, inputType = "text") => (
    <Grid size={{ xs: 12, sm: 6 }} key={key}><TextField fullWidth required={required} type={inputType} label={label} value={values[key] || ""} onChange={(event) => set(key, event.target.value)} slotProps={{ htmlInput: inputType === "number" ? { min: 1, step: 1 } : { maxLength: 200 } }} /></Grid>
  );
  const radio = (key: string, label: string, options = ["Yes", "No"]) => (
    <Grid size={{ xs: 12, sm: 6 }} key={key}><FormControl required><FormLabel id={`${key}-label`}>{label}</FormLabel><RadioGroup row aria-labelledby={`${key}-label`} name={key} value={values[key] || ""} onChange={(event) => set(key, event.target.value)}>{options.map((option) => <FormControlLabel key={option} value={option} control={<Radio required />} label={option} />)}</RadioGroup></FormControl></Grid>
  );
  const address = (prefix: string) => <><Grid size={12}><Typography variant="h6">Property address</Typography></Grid>{field(`${prefix}Address1`, "Address line 1", true)}{field(`${prefix}Address2`, "Address line 2")}{field(`${prefix}Address3`, "Address line 3")}{field(`${prefix}Address4`, "Address line 4")}{field(`${prefix}Postcode`, "Postcode", true)}</>;
  const section = (title: string) => <Grid size={12}><Typography variant="h5" sx={{ mt: 2, color: "#0a1122" }}>{title}</Typography></Grid>;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch(apiUrl("/api/quote"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formType: "Conveyancing quote request", quoteType: type, ...values, privacyConsent: consent, website, formStartedAt: startedAt }) });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) throw new Error("Submission failed");
      setStatus("sent");
    } catch { setStatus("error"); }
  }

  return <>
    <PageHeader eyebrow="Conveyancing" title="Request a conveyancing quote" subtitle="Tell us about your transaction and our team will prepare a quote." crumbs={[{ label: "Home", to: "/" }, { label: "Residential Conveyancing", to: "/services/residential-conveyancing" }, { label: "Request a quote" }]} />
    <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 6, sm: 10 } }}><Container maxWidth="md">
      {!started ? <Box component="form" onSubmit={(event) => { event.preventDefault(); setStarted(true); }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Choose your quote type</Typography>
        <TextField select required fullWidth label="Quote type" value={type} onChange={(event) => setType(event.target.value)}>{choices.map((choice) => <MenuItem key={choice} value={choice}>{choice}</MenuItem>)}</TextField>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>Proceed</Button>
      </Box> : status === "sent" ? <Box role="status"><Typography variant="h5">Thank you</Typography><Typography sx={{ mt: 1 }}>Your quote request has been sent to our team. We will contact you about your quote.</Typography><Button sx={{ mt: 2 }} onClick={() => { setStarted(false); setStatus("idle"); }}>Start a new quote</Button></Box> :
      <Box component="form" onSubmit={submit}><Typography sx={{ mb: 2 }}>Quote type: <strong>{type}</strong> <Button type="button" onClick={() => setStarted(false)}>Change</Button></Typography><Grid container spacing={2.5}>
        {section("Your details")}{field("forename", "Forename(s)", true)}{field("surname", "Surname", true)}{field("telephone", "Contact number", true, "tel")}{field("email", "Email", true, "email")}
        {sale && <>{section("Sale details")}{field("saleAmount", "Sale amount (£)", true, "number")}{radio("saleTenure", "Sale tenure", ["Freehold", "Leasehold"])}{radio("saleMortgage", "Mortgage")}{field("sellers", "Number of sellers", true, "number")}{address("sale")}{section("Sale additional information")}{radio("saleSharedOwnership", "Shared ownership")}{radio("helpToBuyMortgage", "Help to Buy mortgage to redeem")}</>}
        {purchase && <>{section("Purchase details")}{field("purchaseAmount", "Purchase amount (£)", true, "number")}{radio("purchaseTenure", "Tenure", ["Freehold", "Leasehold"])}{values.purchaseTenure === "Leasehold" && radio("leaseholdType", "Leasehold type", ["House", "Flat / Apartment"])}{values.purchaseTenure === "Leasehold" && values.leaseholdType === "Flat / Apartment" && field("floors", "Number of floors", true, "number")}{radio("purchaseMortgage", "Mortgage")}{field("buyers", "Number of buyers", true, "number")}{address("purchase")}{section("Stamp Duty / Land Transaction Tax")}
        <Grid size={12}><Typography color="text.secondary">For guidance, visit <a href="https://www.gov.uk/stamp-duty-land-tax" target="_blank" rel="noreferrer">GOV.UK on Stamp Duty Land Tax</a> or <a href="https://www.gov.wales/land-transaction-tax-guide" target="_blank" rel="noreferrer">GOV.WALES on Land Transaction Tax</a>.</Typography></Grid>
        {radio("jurisdiction", "Property location", ["England", "Wales"])}{radio("ukResident", "UK resident")}{radio("additionalProperty", "Additional property")}{values.additionalProperty === "Yes" && radio("replacingResidence", "Replacing main residence")}{radio("firstTimeBuyer", "First-time buyer")}{values.firstTimeBuyer === "Yes" && radio("mainResidence", "Will this be your main residence?")}
        {section("Purchase additional information")}{radio("purchaseSharedOwnership", "Shared ownership")}{radio("giftedDeposit", "Gifted deposit")}{radio("newBuild", "New build")}{radio("helpToBuyIsa", "Help to Buy ISA")}{values.helpToBuyIsa === "Yes" && field("helpToBuyIsaCount", "Number of Help to Buy ISAs", true, "number")}{radio("lifetimeIsa", "Lifetime ISA")}{values.lifetimeIsa === "Yes" && field("lifetimeIsaCount", "Number of Lifetime ISAs", true, "number")}</>}
        <Grid size={12}><FormControlLabel required control={<Checkbox checked={consent} onChange={(event) => setConsent(event.target.checked)} />} label="I consent to Law & Lawyers using these details to prepare and respond to my quote request." /><TextField tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(event) => setWebsite(event.target.value)} sx={{ position: "absolute", left: -10000, width: 1, height: 1, opacity: 0 }} /></Grid>
        <Grid size={12}><Button type="submit" variant="contained" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Request my quote"}</Button><Button type="button" sx={{ ml: 1 }} onClick={() => { if (window.confirm("Clear all the details entered in this form?")) { setValues({}); setConsent(false); setStarted(false); setType(""); } }}>Start a new quote</Button>{status === "error" && <Typography role="alert" sx={{ mt: 2, color: "#b42318" }}>We could not confirm whether your request was received. Please call +44 7585 574358 before submitting again.</Typography>}</Grid>
      </Grid></Box>}
    </Container></Box>
  </>;
}
