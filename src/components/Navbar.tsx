import { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { Menu as MenuIcon, Phone } from "@mui/icons-material";
import { Link as RouterLink, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import MobileNav from "./MobileNav";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Our Team", href: "/#team" },
  { label: "Insights", href: "/news" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActive(null);
      return;
    }
    const ids = ["services", "why-us", "team"];
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`/#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const isRoutedActive = (href: string) => !href.includes("#") && location.pathname === href;

  return (
    <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-6 sm:top-5">
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-brand-900/8 bg-white/90 px-4 backdrop-blur-md transition-shadow duration-500 sm:px-5 ${
          scrolled
            ? "shadow-[0_8px_30px_-12px_rgba(13,20,36,0.25)]"
            : "shadow-[0_4px_20px_-10px_rgba(13,20,36,0.15)]"
        }`}
      >
        <RouterLink to="/" className="flex shrink-0 items-center gap-2.5 pl-1">
          <img src="/images/logo-icon.png" alt="Law and Lawyers" className="h-8 w-auto" />
          <span className="hidden font-serif text-base tracking-tight text-brand-900 sm:block">
            Law &amp; Lawyers
          </span>
        </RouterLink>

        <Box component="nav" className="hidden lg:flex" sx={{ alignItems: "center", gap: 0.5 }}>
          {links.map((l) => {
            const isActive = active === l.href || isRoutedActive(l.href);
            return (
              <Box key={l.label} sx={{ position: "relative" }}>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-brand-900/6"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {l.href.startsWith("/#") ? (
                  <a
                    href={l.href}
                    className={`relative z-10 block rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors ${
                      isActive ? "text-brand-700" : "text-brand-800 hover:text-brand-600"
                    }`}
                  >
                    {l.label}
                  </a>
                ) : (
                  <NavLink
                    to={l.href}
                    className={`relative z-10 block rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors ${
                      isActive ? "text-brand-700" : "text-brand-800 hover:text-brand-600"
                    }`}
                  >
                    {l.label}
                  </NavLink>
                )}
              </Box>
            );
          })}
        </Box>

        <Box className="hidden lg:flex" sx={{ alignItems: "center", gap: 1 }}>
          <Button
            href="tel:+442085865657"
            startIcon={<Phone sx={{ fontSize: 15 }} />}
            sx={{ color: "#1d3468", fontSize: 13, fontWeight: 500, px: 1.5 }}
          >
            0208 586 5657
          </Button>
          <Button
            href="https://lawandlawyers.perfectportal.co.uk/"
            target="_blank"
            rel="noreferrer"
            sx={{ color: "#1d3468", fontSize: 13, fontWeight: 500, px: 1.5 }}
          >
            Client Login
          </Button>
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            sx={{
              fontSize: "12.5px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              px: 3,
              py: 1.2,
              background: "linear-gradient(115deg,#1d3468,#22458a,#2f74bd,#4a97d6)",
            }}
          >
            Get a Quote
          </Button>
        </Box>

        <IconButton onClick={() => setOpen(true)} className="lg:hidden" sx={{ color: "#101b38" }} aria-label="Open menu">
          <MenuIcon />
        </IconButton>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
