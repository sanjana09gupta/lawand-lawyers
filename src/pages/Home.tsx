import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Recognition from "../components/Recognition";
import Services from "../components/Services";
import CTABanner from "../components/CTABanner";
import WhyUs from "../components/WhyUs";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import News from "../components/News";
import Contact from "../components/Contact";
import ConsultationLine from "../components/ConsultationLine";
import ScrollSection from "../components/ScrollSection";

export default function Home() {
  return (
    <div className="editorial-home">
      <Hero />
      <TrustBar />
      <ScrollSection id="recognition" className="">
        <Recognition />
      </ScrollSection>
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
      <Team />
      <ScrollSection id="testimonials" className="">
        <Testimonials />
      </ScrollSection>
      <ScrollSection id="news-reveal" className="">
        <News />
      </ScrollSection>
      <Contact />
    </div>
  );
}
