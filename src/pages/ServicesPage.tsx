import PageHeader from "../components/PageHeader";
import Services from "../components/Services";

export default function ServicesPage() {
  return <>
    <PageHeader eyebrow="Legal services" title="The right support for what comes next." subtitle="Explore clear, practical legal advice for individuals and businesses, then speak with the team best placed to help." crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]} />
    <Services />
  </>;
}
