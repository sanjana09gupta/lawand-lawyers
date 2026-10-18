import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import TrustProof from "../components/TrustProof";
import Services from "../components/Services";
import CTABanner from "../components/CTABanner";
import WhyUs from "../components/WhyUs";
import ConsultationLine from "../components/ConsultationLine";
import ScrollSection from "../components/ScrollSection";

export default function Home() {
  return (
    <div className="editorial-home">
      <Hero />
      <TrustBar />
      <TrustProof />
      <Services />
      <ScrollSection id="consultation-cta" className="">
        <CTABanner />
      </ScrollSection>
      <ScrollSection id="why-us-reveal" className="">
        <WhyUs />
      </ScrollSection>
      <ScrollSection id="consultation-path" className="">
        <ConsultationLine />
      </ScrollSection>
    </div>
  );
}
