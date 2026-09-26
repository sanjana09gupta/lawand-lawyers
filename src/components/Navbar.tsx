import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Menu from "@mui/icons-material/Menu";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return <>
    <header className="reference-nav">
      <button className="nav-menu" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      <Link to="/" className="nav-brand"><motion.img src="/images/logo-icon.png" alt="" initial={reduced ? false : { rotate: -12, scale: .8, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: .6, ease: [.22, 1, .36, 1] }} /><span>Law &amp; Lawyers</span></Link>
      <nav aria-label="Main navigation"><a href="/#services">Services</a><a href="/#why-us">Why us</a><a href="/#team">Our team</a><Link to="/news">Insights</Link></nav>
      <a href="https://lawandlawyers.perfectportal.co.uk/login" target="_blank" rel="noreferrer" className="nav-login">Client login</a>
      <Link to="/services/residential-conveyancing/new-purchase-quote" className="nav-contact">Get a quote <ArrowOutward /></Link>
    </header>
    <MobileNav open={open} onClose={() => setOpen(false)} />
  </>;
}
