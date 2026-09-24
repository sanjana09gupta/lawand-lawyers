import { Link } from "react-router-dom";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { LinkedInIcon, InstagramIcon, FacebookIcon, XIcon } from "./SocialIcons";
import { individualServices, businessServices, offices } from "../data/content";

const social = [
  { icon: LinkedInIcon, href: "#", label: "LinkedIn" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
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

function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  return <details className="group border-b border-white/10">
    <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between py-4 text-[12px] font-semibold uppercase tracking-wide text-white/70">
      {title}<KeyboardArrowDown className="transition-transform duration-200 group-open:rotate-180" />
    </summary>
    <div className="pb-5 text-[14px]">{children}</div>
  </details>;
}

export default function Footer() {
  return (
    <footer className="bg-brand-950 border-t border-white/10 pt-20 pb-10 text-white/60">
      <div className="container-px">
        <div className="lg:hidden">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/images/logo-icon.png" alt="Law and Lawyers" className="h-9 w-auto" />
            <span className="font-serif text-lg text-white">Law &amp; Lawyers</span>
          </Link>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed">
            SRA-regulated solicitors managing your legal matters with care and efficiency across London and Manchester.
          </p>
          <div className="mt-5 flex gap-2">
            {social.map((s) => <a key={s.label} href={s.href} aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-brand-300/40 hover:text-brand-300"><s.icon size={15} /></a>)}
          </div>
          <div className="mt-7 border-t border-white/10">
            <FooterAccordion title="Company"><ul className="space-y-3">{company.map((l) => <li key={l.label}><Link to={l.to} className="hover:text-brand-300">{l.label}</Link></li>)}<li><a href="https://lawandlawyers.perfectportal.co.uk/" target="_blank" rel="noreferrer" className="hover:text-brand-300">Client Login</a></li></ul></FooterAccordion>
            <FooterAccordion title="For Individuals"><ul className="space-y-3">{individualServices.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-brand-300">{s.title}</Link></li>)}</ul></FooterAccordion>
            <FooterAccordion title="For Businesses"><ul className="space-y-3">{businessServices.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-brand-300">{s.title}</Link></li>)}</ul></FooterAccordion>
            <FooterAccordion title="Our offices"><div className="space-y-5">{offices.map((o) => <div key={o.name}><p className="text-[13px] font-semibold uppercase tracking-wide text-white/80">{o.name}</p><p className="mt-1 text-white/50">{o.address}</p>{o.mapUrl && <a href={o.mapUrl} target="_blank" rel="noreferrer" className="mt-2 block text-brand-300">View on map ↗</a>}<a href={`tel:${o.phone.replace(/[^\d+]/g, "")}`} className="mt-2 block">{o.phone}</a><a href={`tel:${o.mobile.replace(/[^\d+]/g, "")}`} className="block">{o.mobile}</a><a href={`mailto:${o.email}`} className="block break-all">{o.email}</a></div>)}</div></FooterAccordion>
          </div>
        </div>

        <div className="hidden gap-12 lg:grid lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/images/logo-icon.png" alt="Law and Lawyers" className="h-9 w-auto" />
              <span className="font-serif text-lg text-white">Law &amp; Lawyers</span>
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed">
              SRA-regulated solicitors managing your legal matters with care
              and efficiency across London and Manchester.
            </p>
            <div className="mt-6 flex gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-brand-300/40 hover:text-brand-300"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/40">
              Company
            </p>
            <ul className="mt-4 space-y-3 text-[14px]">
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
            <ul className="mt-4 space-y-3 text-[14px]">
              {individualServices.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="hover:text-brand-300">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/40">
              For Businesses
            </p>
            <ul className="mt-4 space-y-3 text-[14px]">
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

        <div className="mt-16 hidden gap-6 border-t border-white/10 pt-10 sm:grid-cols-3 lg:grid">
          {offices.map((o) => (
            <div key={o.name}>
              <p className="text-[13px] font-semibold uppercase tracking-wide text-white/80">
                {o.name}
              </p>
              <p className="mt-1 text-[13.5px]">{o.phone}</p>
              <p className="text-[13.5px]">{o.mobile}</p>
              <p className="text-[13.5px]">{o.email}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[12.5px] sm:flex-row sm:items-center sm:justify-between lg:mt-10 lg:pt-8">
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
