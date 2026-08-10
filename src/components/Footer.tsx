import { Link } from "react-router-dom";
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
];

export default function Footer() {
  return (
    <footer className="bg-brand-950 border-t border-white/10 pt-20 pb-10 text-white/60">
      <div className="container-px">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/">
              <img src="/images/logo.svg" alt="Law and Lawyers" className="h-9 w-auto" />
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

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
          {offices.map((o) => (
            <div key={o.name}>
              <p className="text-[13px] font-semibold uppercase tracking-wide text-white/80">
                {o.name}
              </p>
              <p className="mt-1 text-[13.5px]">{o.phone}</p>
              <p className="text-[13.5px]">{o.email}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
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
