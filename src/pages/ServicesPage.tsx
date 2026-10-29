import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
import Services from "../components/Services";

const featuredBanners = [
  {
    image: "/images/conveyancing-app-banner.jpeg",
    alt: "Property conveyancing service from Law and Lawyers",
    cta: "/services/residential-conveyancing",
    ctaLabel: "Explore conveyancing services",
    ctaPosition: { left: "4%", top: "64.5%", width: "36.8%", height: "9.2%" },
  },
  {
    image: "/images/immigration-banner.jpeg",
    alt: "Immigration legal services from Law and Lawyers",
    cta: "/services/immigration",
    ctaLabel: "Explore immigration services",
    ctaPosition: { left: "4.5%", top: "62%", width: "36.8%", height: "9%" },
  },
];

function FeaturedServiceBanners() {
  const [activeSlide, setActiveSlide] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % featuredBanners.length), 6500);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const banner = featuredBanners[activeSlide];
  const showPrevious = () => setActiveSlide((current) => (current - 1 + featuredBanners.length) % featuredBanners.length);
  const showNext = () => setActiveSlide((current) => (current + 1) % featuredBanners.length);

  return (
    <Box component="section" className="service-banner-hero" aria-label="Featured legal services">
      <h1 className="visually-hidden">Legal services</h1>
      <Box className="service-banner-carousel">
        <AnimatePresence initial={false} mode="wait">
          <motion.div key={banner.image} className="service-banner-slide" initial={reducedMotion ? false : { opacity: 0, scale: 1.015 }} animate={{ opacity: 1, scale: 1 }} exit={reducedMotion ? undefined : { opacity: 0, scale: 0.995 }} transition={{ duration: reducedMotion ? 0 : 0.55, ease: "easeInOut" }}>
            <img src={banner.image} alt={banner.alt} />
            <Link to={banner.cta} className="service-banner-cta" aria-label={banner.ctaLabel} style={banner.ctaPosition} />
          </motion.div>
        </AnimatePresence>
        <Box className="service-banner-controls" aria-label="Featured service banner controls">
          <IconButton onClick={showPrevious} aria-label="Show previous service banner" size="small"><ChevronLeft /></IconButton>
          <Box component="span" aria-live="polite">{activeSlide + 1} / {featuredBanners.length}</Box>
          <IconButton onClick={showNext} aria-label="Show next service banner" size="small"><ChevronRight /></IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default function ServicesPage() {
  return <>
    <FeaturedServiceBanners />
    <PageHeader eyebrow="Legal services" title="The right support for what comes next." subtitle="Explore clear, practical legal advice for individuals and businesses, then speak with the team best placed to help." crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]} />
    <Services />
  </>;
}
