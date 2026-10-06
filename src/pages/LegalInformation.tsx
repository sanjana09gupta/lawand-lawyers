import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const pages = {
  "/privacy-policy": {
    title: "Privacy Policy",
    eyebrow: "Your information",
    sections: [
      ["Our contact details", "Name: Francis Mathew. Address: 352 High Street North, London E12 6PH. Phone number: 0208 586 5657. Email: info@lawandlawyers.co.uk."],
      ["What type of information we have", "We currently collect and process personal identifiers, contacts and characteristics, including your name, address, telephone number, email address and any other details you provide."],
      ["How we get the information and why we have it", "Most personal information is provided directly by you through our website contact form. Under the UK GDPR, we rely on your consent where applicable. You may remove consent at any time by contacting Francis Mathew using the details above."],
      ["What we do with the information", "We use information you provide to improve and personalise our services. Your information is stored securely online and retained for an appropriate period. Contact us if you require further information about retention or disposal."],
      ["Your data protection rights", "You may request access, rectification, erasure, restriction, objection or portability of your personal data where applicable. Requests are free of charge and we normally respond within one month. You may also complain to the Information Commissioner’s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF, telephone 0303 123 1113."],
    ],
  },
  "/cookie-policy": {
    title: "Cookie Policy",
    eyebrow: "Website cookies",
    sections: [
      ["About this cookie policy", "Cookies are text files placed on your computer to collect standard internet log information and visitor behaviour information. We may collect information automatically through cookies or similar technology."],
      ["How we use cookies", "We use cookies to understand how visitors use our website and to help improve the site. Functionality cookies can recognise you and remember selected preferences. Advertising cookies may collect information about pages viewed, links followed, your browser, device and IP address."],
      ["Managing cookies", "You can set your browser not to accept cookies or remove cookies through browser settings. Some website features may not function as a result. You may change or withdraw cookie consent at any time."],
      ["Other websites and contact", "Our website includes links to other websites, each with its own privacy policy. For questions, email info@lawandlawyers.co.uk, call 020 8586 5657 or write to 352 High Street North, East London E12 6PH."],
    ],
  },
  "/complaints-procedure": {
    title: "Complaints Procedure",
    eyebrow: "Client care",
    sections: [
      ["Are you unhappy with our service?", "We are committed to high-quality legal advice and client care. If you are unhappy or concerned about the service provided, please tell us promptly so we can try to resolve the problem."],
      ["Raising a complaint", "First contact the person handling your matter. If you still have concerns, contact the Client Care Partner so that final issues can be reported and addressed."],
      ["If we cannot resolve it", "The Legal Ombudsman may be able to help once you have given us the opportunity to resolve the complaint. Its usual time limits include six months from our final response, six years from the act or omission, or three years from when you should reasonably have known there was cause for complaint."],
      ["Legal Ombudsman", "PO Box 6806, Wolverhampton WV1 9WJ. Telephone: 0300 555 0333. Email: enquiries@legalombudsman.org.uk. The SRA deals with concerns about conduct."],
    ],
  },
  "/covid-19": {
    title: "Covid-19 Information",
    eyebrow: "Archived service notice",
    sections: [
      ["Current service availability", "Our team continues to support clients. If you need to discuss an appointment, documents or a specific matter, please contact the office directly so we can confirm the most suitable arrangements."],
      ["Contact the team", "Call +44 20 8586 5657 or email info@lawandlawyers.co.uk for assistance with your matter."],
    ],
  },
} as const;

export default function LegalInformation() {
  const { pathname } = useLocation();
  const page = pages[pathname.replace(/\/$/, "") as keyof typeof pages] ?? pages["/privacy-policy"];
  return <>
    <PageHeader eyebrow={page.eyebrow} title={page.title} subtitle="Law and Lawyers Limited" crumbs={[{ label: "Home", to: "/" }, { label: page.title }]} />
    <Box component="section" sx={{ bgcolor: "#fcfdfe", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md"><Box sx={{ display: "grid", gap: 4.5 }}>
        {page.sections.map(([heading, copy]) => <Box key={heading} sx={{ borderBottom: "1px solid rgba(29,52,104,.14)", pb: 4.5 }}><Typography component="h2" variant="h5" sx={{ color: "#1d3468", fontWeight: 800, mb: 1.25 }}>{heading}</Typography><Typography sx={{ color: "#45566f", lineHeight: 1.8 }}>{copy}</Typography></Box>)}
      </Box></Container>
    </Box>
  </>;
}
