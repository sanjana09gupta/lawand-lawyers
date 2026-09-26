import { Link } from "react-router-dom";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Phone from "@mui/icons-material/Phone";
import StarRounded from "@mui/icons-material/StarRounded";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import { LinkedInIcon, InstagramIcon, FacebookIcon, XIcon } from "./SocialIcons";
import { individualServices, businessServices, offices } from "../data/content";
import { conveyancingFeesUrl } from "../data/links";

const social = [
  { icon: LinkedInIcon, href: "https://www.linkedin.com/company/lawandlawyersuk/", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://www.instagram.com/lawandlawyersuk?stkn=MXM4cGl3NmZxNGdjeg==", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: XIcon, href: "#", label: "X" },
];

const company = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "News and Insights", to: "/news" },
  { label: "Careers", to: "/careers" },
  { label: "Corporate Social Responsibility", to: "/corporate-social-responsibility" },
  { label: "Book a Consultation", to: "/book-a-consultation" },
];

const directPhone = "+44 7380 866528";

function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  return <details className="group border-b border-white/10">
    <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between py-4 text-[12px] font-semibold uppercase tracking-wide text-white/70">
      {title}<KeyboardArrowDown className="transition-transform duration-200 group-open:rotate-180" />
    </summary>
    <div className="pb-5 text-[14px]">{children}</div>
  </details>;
}

function TrustBadges() {
  return (
    <div className="mt-6 flex flex-wrap gap-2.5">
      <div
        aria-label="ReviewSolicitors client review badge"
        className="min-w-48 rounded-lg bg-[#00a849] px-3 py-2.5 text-white"
      >
        <p className="text-[13px] font-semibold tracking-wide">reviewsolicitors</p>
        <div className="mt-1 flex items-center gap-0.5 text-amber-300" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((star) => <StarRounded key={star} sx={{ fontSize: 18 }} />)}
        </div>
        <p className="mt-1 text-[10px] font-medium text-white/90">Independent client reviews</p>
      </div>
      <div
        aria-label="Authorised and regulated by the Solicitors Regulation Authority"
        className="flex min-w-48 items-center gap-2.5 rounded-lg bg-white px-3 py-2.5 text-[#b52039]"
      >
        <VerifiedUser sx={{ fontSize: 34, color: "#d3253e" }} />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Regulated by</p>
          <p className="text-[12px] font-extrabold leading-tight">Solicitors Regulation Authority</p>
          <p className="mt-0.5 text-[10px] text-slate-500">SRA ID: 613159</p>
        </div>
      </div>
      <div className="flex h-[86px] w-[118px] items-center justify-center rounded-lg bg-white p-2" aria-label="Lexcel accredited by the Law Society">
        <img src="/images/recog1.jpg" alt="Lexcel accredited by the Law Society" className="max-h-full max-w-full object-contain" />
      </div>
      <div className="flex h-[86px] w-[118px] items-center justify-center rounded-lg bg-white p-2" aria-label="Conveyancing Quality Scheme accredited by the Law Society">
        <img src="/images/recog2.png" alt="Conveyancing Quality Scheme accredited by the Law Society" className="max-h-full max-w-full object-contain" />
      </div>
      <div className="flex h-[86px] w-[118px] items-center justify-center rounded-lg bg-white p-2" aria-label="Cyber Essentials certified">
        <img src="/images/recog3.png" alt="Cyber Essentials certified" className="max-h-full max-w-full object-contain" />
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-950 border-t border-white/10 pt-10 pb-6 text-white/60 lg:pt-12">
      <div className="container-px">
        <div className="mb-9 flex flex-col gap-4 rounded-xl bg-brand-900/70 px-5 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">Get in touch</p>
            <h2 className="mt-1 font-serif text-xl text-white sm:text-2xl">Book a consultation or call us directly.</h2>
            <p className="mt-1 text-[13px] leading-relaxed text-white/60">Speak to an adviser now, or choose a convenient time through our Zoom scheduler.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/book-a-consultation" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-400 px-4 text-[13px] font-semibold text-brand-950 transition-colors hover:bg-brand-300">
              <CalendarMonth fontSize="small" /> Book via Zoom
            </Link>
            <a href="tel:+447380866528" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-4 text-[13px] font-semibold text-white transition-colors hover:border-brand-300 hover:text-brand-300" aria-label={`Call ${directPhone}`}>
              <Phone fontSize="small" /> {directPhone}
            </a>
          </div>
        </div>
        <div className="lg:hidden">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/images/logo-icon.png" alt="Law and Lawyers" className="h-9 w-auto" />
            <span className="font-serif text-lg text-white">Law &amp; Lawyers</span>
          </Link>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed">
            SRA-regulated solicitors managing your legal matters with care and efficiency across London and Manchester.
          </p>
          <div className="mt-5 flex gap-2">
            {social.map((s) => <a key={s.label} href={s.href} aria-label={s.label} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noreferrer" : undefined} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-brand-300/40 hover:text-brand-300"><s.icon size={15} /></a>)}
          </div>
          <TrustBadges />
          <div className="mt-7 border-t border-white/10">
            <FooterAccordion title="Company"><ul className="space-y-3">{company.map((l) => <li key={l.label}><Link to={l.to} className="hover:text-brand-300">{l.label}</Link></li>)}<li><a href="https://lawandlawyers.perfectportal.co.uk/" target="_blank" rel="noreferrer" className="hover:text-brand-300">Client Login</a></li></ul></FooterAccordion>
            <FooterAccordion title="For Individuals"><ul className="space-y-3">{individualServices.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-brand-300">{s.title}</Link></li>)}<li><Link to={conveyancingFeesUrl} className="font-semibold text-brand-300 hover:text-white">Fees information</Link></li></ul></FooterAccordion>
            <FooterAccordion title="For Businesses"><ul className="space-y-3">{businessServices.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-brand-300">{s.title}</Link></li>)}</ul></FooterAccordion>
            <FooterAccordion title="Our offices"><div className="space-y-5">{offices.map((o) => <div key={o.name}><p className="text-[13px] font-semibold uppercase tracking-wide text-white/80">{o.name}</p><p className="mt-1 text-white/50">{o.address}</p>{o.mapUrl && <a href={o.mapUrl} target="_blank" rel="noreferrer" className="mt-2 block text-brand-300">View on map ↗</a>}<a href={`tel:${o.phone.replace(/[^\d+]/g, "")}`} className="mt-2 block">{o.phone}</a><a href={`tel:${o.mobile.replace(/[^\d+]/g, "")}`} className="block">{o.mobile}</a><a href={`mailto:${o.email}`} className="footer-email block break-all">{o.email}</a></div>)}</div></FooterAccordion>
          </div>
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/images/logo-icon.png" alt="Law and Lawyers" className="h-9 w-auto" />
              <span className="font-serif text-lg text-white">Law &amp; Lawyers</span>
            </Link>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed">
              SRA-regulated solicitors managing your legal matters with care
              and efficiency across London and Manchester.
            </p>
            <div className="mt-4 flex gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-brand-300/40 hover:text-brand-300"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
            <TrustBadges />
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/40">
              Company
            </p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {company.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-brand-300">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://lawandlawyers.perfectportal.co.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-300"
                >
                  Client Login
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/40">
              For Individuals
            </p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {individualServices.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="hover:text-brand-300">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={conveyancingFeesUrl} className="font-semibold text-brand-300 hover:text-white">
                  Fees information
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/40">
              For Businesses
            </p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {businessServices.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="hover:text-brand-300">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 hidden gap-6 border-t border-white/10 pt-5 sm:grid-cols-3 lg:grid">
          {offices.map((o) => (
            <div key={o.name}>
              <p className="text-[13px] font-semibold uppercase tracking-wide text-white/80">
                {o.name}
              </p>
              <p className="mt-1 text-[13.5px]">{o.phone}</p>
              <p className="text-[13.5px]">{o.mobile}</p>
              <a href={`mailto:${o.email}`} className="footer-email text-[13.5px]">{o.email}</a>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Law and Lawyers Limited is authorised and regulated by the
            Solicitors Regulation Authority (SRA ID: 613159).
          </p>
          <p>© {new Date().getFullYear()} Law and Lawyers Solicitors Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
