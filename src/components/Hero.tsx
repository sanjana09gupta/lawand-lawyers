import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useState } from "react";

const heroSlides = [
  {
    eyebrow: "Immigration solicitors",
    title: "Your immigration matter, guided with confidence.",
    description: "Expert support for visas, sponsorship, settlement and other UK immigration matters.",
    cta: "Speak to our immigration team",
    to: "/services/immigration",
    image: "/images/immigration-banner.jpeg",
    imageAlt: "Immigration support from Law and Lawyers",
  },
  {
    eyebrow: "Conveyancing solicitors",
    title: "Track your property matter with confidence.",
    description: "Real-time updates, clear milestones and secure communication from instruction to completion.",
    cta: "View our conveyancing service",
    to: "/services/residential-conveyancing",
    image: "/images/conveyancing-app-banner.jpeg",
    imageAlt: "Property conveyancing service from Law and Lawyers",
  },
];

export default function Hero() {
  const reduced = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  function changeSlide(direction: -1 | 1) {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);
  }

  return (
    <section id="top" className="reference-hero">
      <div className="hero-html-banner" aria-roledescription="carousel" aria-label="Featured legal services">
        <motion.div
          key={slide.to}
          className="hero-html-banner-copy"
          initial={reduced ? false : { opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero-kicker">{slide.eyebrow}</p>
          <h1 className="hero-html-banner-title">{slide.title}</h1>
          <p className="hero-description">{slide.description}</p>
          <div className="hero-actions"><Link to={slide.to} className="square-link filled">{slide.cta} <ArrowOutward /></Link></div>
          <div className="hero-banner-controls">
            <button type="button" onClick={() => changeSlide(-1)} aria-label="Show previous featured service"><ChevronLeft /></button>
            <span aria-live="polite">{activeSlide + 1} / {heroSlides.length}</span>
            <button type="button" onClick={() => changeSlide(1)} aria-label="Show next featured service"><ChevronRight /></button>
          </div>
        </motion.div>
        <motion.div key={slide.image} className="hero-html-banner-media" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
          <img src={slide.image} alt={slide.imageAlt} fetchPriority={activeSlide === 0 ? "high" : "auto"} />
        </motion.div>
      </div>
    </section>
  );
}
