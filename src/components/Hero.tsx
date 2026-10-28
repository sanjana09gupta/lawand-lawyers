import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    title: "Your immigration matter, guided with confidence.",
    to: "/services/immigration",
    image: "/images/immigration-banner.jpeg",
    imageAlt: "Immigration support from Law and Lawyers",
  },
  {
    title: "Track your property matter with confidence.",
    to: "/services/residential-conveyancing",
    image: "/images/conveyancing-app-banner.jpeg",
    imageAlt: "Property conveyancing service from Law and Lawyers",
  },
];

export default function Hero() {
  const reduced = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [activeSlide, reduced]);

  function changeSlide(direction: -1 | 1) {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);
  }

  return (
    <section id="top" className="reference-hero">
      <div className="hero-html-banner" aria-roledescription="carousel" aria-label="Featured legal services">
        <motion.div key={slide.image} className="hero-banner-slide" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
          <img src={slide.image} alt={slide.imageAlt} fetchPriority={activeSlide === 0 ? "high" : "auto"} />
          <Link to={slide.to} className={`hero-banner-cta hero-banner-cta-${activeSlide}`} aria-label={`Learn more about ${slide.title}`} />
          <div className="hero-banner-controls">
            <button type="button" onClick={() => changeSlide(-1)} aria-label="Show previous featured service"><ChevronLeft /></button>
            <span aria-live="polite">{activeSlide + 1} / {heroSlides.length}</span>
            <button type="button" onClick={() => changeSlide(1)} aria-label="Show next featured service"><ChevronRight /></button>
          </div>
        </motion.div>
        <div className="hero-live-copy">
          <p className="hero-kicker">London solicitors · SRA regulated</p>
          <h1>Immigration and property solicitors in London</h1>
          <p>Law and Lawyers is an SRA-regulated London law firm advising on immigration, conveyancing, wills and probate, employment and family law. Speak to an experienced solicitor today.</p>
          <Link to="/contact" className="hero-quote-link">Get a free quote <ArrowOutward /></Link>
        </div>
      </div>
    </section>
  );
}
