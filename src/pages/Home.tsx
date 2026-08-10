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

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Recognition />
      <Services />
      <CTABanner />
      <WhyUs />
      <Team />
      <Testimonials />
      <News />
      <Contact />
    </>
  );
}
