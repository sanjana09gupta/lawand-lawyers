import { Box, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ArrowForward, CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const feeBands = [
  { title: "Purchase or sale - Freehold", rows: [["Property value: £0-£500,000", "£845-£1,495 + VAT"], ["Property value: £500,001 and over", "£995-£2,495 + VAT"]], note: "Higher-value or more complex matters are quoted individually." },
  { title: "Purchase or sale - Leasehold", rows: [["Property value: £0-£500,000", "£895-£1,695 + VAT"], ["Property value: £500,001 and over", "£1,095-£2,695 + VAT"]], note: "Please contact us for a bespoke quotation for complex leasehold titles." },
  { title: "Remortgage", rows: [["Property value: £0-£500,000", "£595-£895 + VAT"], ["Property value: £500,001 and over", "£795-£1,495 + VAT"]] },
];

const disbursements = ["Electronic ID check", "Search fee", "Electronic funds transfer fee", "HM Land Registry fee", "Bankruptcy search", "Land Registry search", "Official copy documents for a sale"];
const additionalFees = ["Acting for your lender", "Leasehold supplement", "New-build property", "Shared ownership", "Right to Buy", "Auction property", "Limited company purchase", "Help to Buy or Lifetime ISA", "Help to Buy equity scheme", "Gifted deposit"];
const costFactors = ["Defective or unusually complex legal title", "Unregistered title", "Involvement of a management company or freeholder", "The need to comply with restrictions on the title", "Missing consents for previous alterations", "More than one mortgage secured on the property", "Auction sales or very tight deadlines", "Delayed documents or information that require work to be duplicated"];

function FeeTable({ title, rows, note }: { title: string; rows: string[][]; note?: string }) {
  return <Box>
    <Typography variant="h6" sx={{ color: "#1d3468", fontWeight: 750, mb: 1.5 }}>{title}</Typography>
    <TableContainer sx={{ border: "1px solid rgba(29,52,104,.16)", borderRadius: 2, overflow: "hidden" }}>
      <Table size="small" aria-label={title}>
        <TableHead><TableRow sx={{ bgcolor: "#e3f1fa" }}><TableCell sx={{ fontWeight: 700, color: "#1d3468" }}>Transaction value</TableCell><TableCell sx={{ fontWeight: 700, color: "#1d3468" }}>Legal fee</TableCell></TableRow></TableHead>
        <TableBody>{rows.map(([label, fee]) => <TableRow key={label}><TableCell>{label}</TableCell><TableCell sx={{ fontWeight: 650 }}>{fee}</TableCell></TableRow>)}</TableBody>
      </Table>
    </TableContainer>
    {note && <Typography sx={{ mt: 1.25, fontSize: 13, color: "text.secondary" }}>{note}</Typography>}
  </Box>;
}

function BulletList({ items }: { items: string[] }) {
  return <Box component="ul" sx={{ display: "grid", gap: 1.3, p: 0, m: 0, listStyle: "none" }}>{items.map((item) => <Box component="li" key={item} sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}><CheckCircle sx={{ color: "#2657a3", fontSize: 20, mt: .2 }} /><Typography sx={{ lineHeight: 1.6 }}>{item}</Typography></Box>)}</Box>;
}

export default function ConveyancingFees() {
  return <>
    <PageHeader eyebrow="Residential conveyancing" title="Conveyancing fees" subtitle="Clear, fixed-fee information for your property transaction." crumbs={[{ label: "Home", to: "/" }, { label: "Residential Conveyancing", to: "/services/residential-conveyancing" }, { label: "Fees" }]} />
    <Box sx={{ bgcolor: "#fcfdfe", py: { xs: 6, sm: 9 } }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 900 }}>
          <Typography variant="h4" sx={{ color: "#0a1122", mb: 2 }}>Our fees</Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>Buying or selling a property is a major step. We aim to make the legal side clear, efficient and fairly priced from the outset. We provide a bespoke written quotation tailored to your transaction and may be able to offer discounts depending on your circumstances.</Typography>
          <Typography sx={{ mt: 2, color: "text.secondary", lineHeight: 1.8 }}>We work on a fixed-fee basis. Our prices cover the legal work and administration needed to complete your purchase, sale or remortgage, including HM Land Registry registration and Stamp Duty Land Tax or Land Transaction Tax work where applicable. Your matter is handled by a qualified conveyancing solicitor and supervised by a director.</Typography>
        </Box>

        <Box sx={{ mt: { xs: 5, sm: 7 }, p: { xs: 2.5, sm: 4 }, borderRadius: 3, bgcolor: "#e3f1fa" }}>
          <Typography variant="h5" sx={{ color: "#1d3468", fontWeight: 750 }}>Guide to our legal fees</Typography>
          <Typography sx={{ mt: 1, color: "#4a5468" }}>All fees below are exclusive of VAT at 20% and disbursements, which are third-party costs.</Typography>
          <Box sx={{ mt: 4, display: "grid", gap: 4 }}>{feeBands.map((band) => <FeeTable key={band.title} {...band} />)}</Box>
        </Box>

        <Grid container spacing={{ xs: 5, md: 8 }} sx={{ mt: { xs: 1, sm: 3 } }}>
          <Grid size={{ xs: 12, md: 6 }}><Typography variant="h5" sx={{ color: "#1d3468", mb: 2 }}>Typical disbursements</Typography><Typography sx={{ mb: 3, color: "text.secondary", lineHeight: 1.75 }}>Disbursements are payments made to third parties, such as search providers, HM Land Registry and HMRC. We handle these payments on your behalf to keep the transaction moving.</Typography><BulletList items={disbursements} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}><Typography variant="h5" sx={{ color: "#1d3468", mb: 2 }}>Stamp Duty Land Tax</Typography><Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>This applies to purchases only. The amount payable to HMRC depends on the purchase price, buyer circumstances and whether you already own another property. First-time buyer relief and higher-rate rules can apply. We will calculate the relevant tax for your transaction, and you can also use the HMRC Stamp Duty Land Tax calculator for guidance.</Typography></Grid>
        </Grid>

        <Box sx={{ mt: { xs: 6, sm: 9 }, pt: { xs: 5, sm: 7 }, borderTop: "1px solid rgba(29,52,104,.16)" }}><Typography variant="h5" sx={{ color: "#1d3468", mb: 2 }}>Leasehold-specific costs</Typography><Typography sx={{ maxWidth: 900, color: "text.secondary", lineHeight: 1.75 }}>Leasehold properties often carry additional charges set by the freeholder or managing agent. These are separate from our legal fees. Notice of Transfer, Notice of Charge, Deed of Covenant, Certificate of Compliance and new share certificate fees are commonly £25 + VAT to £300 + VAT each, although exact amounts can vary. We will confirm these once we have reviewed the lease and management documents.</Typography></Box>

        <Grid container spacing={{ xs: 5, md: 8 }} sx={{ mt: { xs: 5, sm: 7 } }}>
          <Grid size={{ xs: 12, md: 6 }}><Typography variant="h5" sx={{ color: "#1d3468", mb: 2 }}>Additional legal fees</Typography><Typography sx={{ mb: 3, color: "text.secondary", lineHeight: 1.75 }}>An extra fixed fee may apply where your transaction requires additional work. We will always confirm this before incurring it.</Typography><BulletList items={additionalFees} /></Grid>
          <Grid size={{ xs: 12, md: 6 }}><Typography variant="h5" sx={{ color: "#1d3468", mb: 2 }}>When might fees change?</Typography><Typography sx={{ mb: 3, color: "text.secondary", lineHeight: 1.75 }}>Straightforward matters usually sit at the lower end of our fee ranges. Complexities can require more work and an updated estimate.</Typography><BulletList items={costFactors} /></Grid>
        </Grid>

        <Box sx={{ mt: { xs: 6, sm: 9 }, p: { xs: 3, sm: 4 }, borderRadius: 3, bgcolor: "#0a1122", color: "#fff" }}><Typography variant="h5">Request an accurate quote</Typography><Typography sx={{ mt: 1.5, maxWidth: 680, color: "rgba(255,255,255,.72)", lineHeight: 1.7 }}>We will confirm our fixed legal fee, likely disbursements and any additional charges that may apply to your property.</Typography><Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1.5 }}><Button component={Link} to="/services/residential-conveyancing/new-purchase-quote" variant="contained" endIcon={<ArrowForward />} sx={{ bgcolor: "#4a97d6", "&:hover": { bgcolor: "#7fbde5", color: "#0a1122" } }}>Start a quote request</Button><Button component={Link} to="/book-a-consultation" variant="outlined" sx={{ color: "#fff", borderColor: "rgba(255,255,255,.5)", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,.08)" } }}>Book a consultation</Button></Box></Box>
      </Container>
    </Box>
  </>;
}
