import Hero from "../components/Hero";
import TrustProof from "../components/TrustProof";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Team from "../components/Team";
import DirectorMessage from "../components/DirectorMessage";

export default function Home() {
  return (
    <div className="editorial-home">
      <Hero />
      <Team />
      <Services />
      <WhyUs />
      <DirectorMessage />
      <TrustProof />
    </div>
  );
}
