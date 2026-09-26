import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Menu from "@mui/icons-material/Menu";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const reduced = useReducedMotion();
  return <>
    <header className="reference-nav">
      <button className="nav-menu" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      <Link to="/" className="nav-brand"><motion.img src="/images/logo-icon.png" alt="" initial={reduced ? false : { rotate: -12, scale: .8, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: .6, ease: [.22, 1, .36, 1] }} /><span>Law &amp; Lawyers</span></Link>
      <nav aria-label="Main navigation">
        <div className="nav-company">
          <button type="button" className="nav-company-trigger" onClick={() => setCompanyOpen((current) => !current)} aria-expanded={companyOpen} aria-controls="company-menu">Company <KeyboardArrowDown fontSize="small" /></button>
          {companyOpen && <div id="company-menu" className="nav-company-menu">
            <Link to="/about" onClick={() => setCompanyOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setCompanyOpen(false)}>Contact</Link>
            <Link to="/news" onClick={() => setCompanyOpen(false)}>News and Insights</Link>
            <Link to="/careers" onClick={() => setCompanyOpen(false)}>Careers</Link>
            <Link to="/corporate-social-responsibility" onClick={() => setCompanyOpen(false)}>Corporate Social Responsibility</Link>
            <Link to="/book-a-consultation" onClick={() => setCompanyOpen(false)}>Book a Consultation</Link>
            <a href="https://lawandlawyers.perfectportal.co.uk/login" target="_blank" rel="noreferrer" onClick={() => setCompanyOpen(false)}>Client Login</a>
          </div>}
        </div>
        <a href="/#services">Services</a><a href="/#why-us">Why us</a><a href="/#team">Our team</a><Link to="/news">Insights</Link>
      </nav>
      <a href="https://lawandlawyers.perfectportal.co.uk/login" target="_blank" rel="noreferrer" className="nav-login">Client login</a>
      <Link to="/services/residential-conveyancing/new-purchase-quote" className="nav-contact">Get a quote <ArrowOutward /></Link>
    </header>
    <MobileNav open={open} onClose={() => setOpen(false)} />
  </>;
}
