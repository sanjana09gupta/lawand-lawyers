import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const feeLinks = [
  ["Immigration Fees", "/services/immigration"],
  ["Probate Fees", "/services/wills-and-probate"],
  ["Conveyancing Fees", "/services/residential-conveyancing/residential-conveyancing-fees"],
  ["Employment Fees", "/services/employment"],
];

export default function FeeInformation() {
  return <>
    <PageHeader eyebrow="Transparent pricing" title="Fee Information" subtitle="Choose an area of law to view fee information or request a tailored quote." crumbs={[{ label: "Home", to: "/" }, { label: "Fee Information" }]} />
    <Box component="section" sx={{ bgcolor: "#fcfdfe", py: { xs: 6, md: 10 } }}><Container maxWidth="md"><Box sx={{ display: "grid", gap: 1.5 }}>
      {feeLinks.map(([label, to]) => <Button key={label} component={Link} to={to} variant="outlined" endIcon={<ArrowForward />} sx={{ justifyContent: "space-between", borderColor: "rgba(29,52,104,.22)", borderRadius: 2, color: "#1d3468", fontSize: { xs: 17, md: 20 }, fontWeight: 800, px: 3, py: 2.3, textTransform: "none", "&:hover": { borderColor: "#1d3468", bgcolor: "#eef5fb" } }}>{label}</Button>)}
      <Typography sx={{ color: "#52637e", mt: 2, lineHeight: 1.7 }}>Fees depend on the details and complexity of each matter. Contact the team for a tailored quotation.</Typography>
    </Box></Container></Box>
  </>;
}
