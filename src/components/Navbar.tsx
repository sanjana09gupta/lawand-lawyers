import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/icons-material/Menu";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="reference-nav">
      <button className="nav-menu" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      <Link to="/" className="nav-brand"><img src="/images/logo-icon.png" alt="" /><span>Law &amp; Lawyers</span></Link>
      <nav aria-label="Main navigation"><a href="/#services">Services</a><a href="/#team">Our team</a><Link to="/news">Insights</Link></nav>
      <Link to="/contact" className="nav-contact">Get in touch <ArrowOutward /></Link>
    </header>
    <MobileNav open={open} onClose={() => setOpen(false)} />
  </>;
}
