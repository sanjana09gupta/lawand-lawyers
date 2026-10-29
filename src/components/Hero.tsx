import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowOutward from "@mui/icons-material/ArrowOutward";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="reference-hero">
      <div className="hero-intro hero-intro-image">
        <div className="hero-intro-content">
          <div className="hero-title-block">
            <p className="hero-kicker">London solicitors · SRA regulated</p>
            <h1 className="hero-headline" aria-label="Immigration and property solicitors in London">
              <motion.span initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>Immigration</motion.span>
              <motion.span initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>and property</motion.span>
              <motion.span initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }}>solicitors</motion.span>
              <motion.span initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }}>in London</motion.span>
            </h1>
          </div>
          <div className="hero-summary">
            <p className="hero-description">Law and Lawyers is an SRA-regulated London law firm advising on immigration, conveyancing, wills and probate, employment and family law. Speak to an experienced solicitor today.</p>
            <div className="hero-actions"><Link to="/contact" className="square-link filled">Get a free quote <ArrowOutward /></Link></div>
          </div>
        </div>
        <div className="hero-image-stage">
          <img className="hero-background-image" src="/images/hero-office.png" alt="Law and Lawyers office interior" fetchPriority="high" />
          <div className="hero-image-overlay" />
        </div>
      </div>
    </section>
  );
}
