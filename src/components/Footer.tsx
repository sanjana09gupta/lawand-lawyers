import { Link } from "react-router-dom";
import { useEffect } from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Phone from "@mui/icons-material/Phone";
import { LinkedInIcon, InstagramIcon, FacebookIcon, XIcon } from "./SocialIcons";
import { individualServices, businessServices, officeContacts } from "../data/content";
import { conveyancingFeesUrl } from "../data/links";

const social = [
  { icon: LinkedInIcon, href: "https://www.linkedin.com/company/lawandlawyersuk/", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://www.instagram.com/lawandlawyersuk?stkn=MXM4cGl3NmZxNGdjeg==", label: "Instagram" },
  { icon: FacebookIcon, href: "https://www.facebook.com/lawandlawyersuk", label: "Facebook" },
  { icon: XIcon, href: "https://x.com/LawandLawyersUK", label: "X" },
];

const company = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "News and Insights", to: "/news" },
  { label: "Careers", to: "/careers" },
  { label: "Corporate Social Responsibility", to: "/corporate-social-responsibility" },
  // { label: "Book a Consultation", to: "/book-a-consultation" },
];

const directPhone = "+44 20 8586 5657";
const officeEmails = ["london@lawandlawyers.co.uk", "sales@lawandlawyers.co.uk"];
const sraValidationUrl = "https://www.sra.org.uk/validation?083082065+069110103108105115104067111108111117114+068101102097117108116046112110103+104116116112115058047047119119119046108097119097110100108097119121101114115046099111046117107047&UGxEQk3X8u945Ku3FOxdkpABzFp%2bOxJehz%2bpocbyIaPGomfioh5oTg%3d%3d";

function ReviewBadge() {
  useEffect(() => {
    const script = document.querySelector<HTMLScriptElement>('script[src="https://www.reviewsolicitors.co.uk/widget/rs.js"]');
    const load = () => {
      const target = document.getElementById("rswidget_footer");
      const rs = (window as Window & { rs?: { loadWidget: (id: string, type: string, firm: number, props: object) => void } }).rs;
      if (target && !target.querySelector("iframe")) rs?.loadWidget("rswidget_footer", "dropdown", 10832, {});
    };
    load();
    script?.addEventListener("load", load);
    return () => script?.removeEventListener("load", load);
  }, []);
  return <div id="rswidget_footer" className="relative mt-5 w-full max-w-[400px] [&_.floatHolder]:hidden [&_.rsoverlay]:hidden" />;
}

function FooterLinks({ title, children }: { title: string; children: React.ReactNode }) {
  return <>
    <details className="group border-b border-white/20 md:hidden">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-300">{title}<KeyboardArrowDown className="transition-transform duration-200 group-open:rotate-180" /></summary>
      <div className="pb-5 text-[14px]">{children}</div>
    </details>
    <div className="hidden md:block">
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-300">{title}</h3>
      <div className="mt-4 text-[13px] leading-relaxed">{children}</div>
    </div>
  </>;
}

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-[#0d2248] py-8 text-white/75 sm:py-10">
      <div className="container-px">
        <div className="flex flex-col gap-4 rounded-xl bg-[#153568] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="border-l-2 border-brand-300 pl-4 sm:flex sm:items-center sm:gap-6">
            <h2 className="font-serif text-2xl text-white sm:text-3xl">Need legal advice?</h2>
            <p className="mt-1 text-[13px] text-white/75 sm:mt-0">Speak to an adviser about your legal needs.</p>
          </div>
          <a href="tel:+442085865657" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-300 px-6 text-[13px] font-bold text-brand-950 transition-colors hover:bg-white" aria-label={`Call ${directPhone}`}><Phone fontSize="small" /> {directPhone}</a>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(260px,1.35fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          <div>
            <Link to="/" className="inline-flex rounded-md bg-white p-1.5"><img src="/images/law-and-lawyers-logo.jpeg" alt="Law and Lawyers Solicitors" className="h-10 w-auto object-contain" /></Link>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed">SRA-regulated solicitors managing your legal matters with care and efficiency across London and Leeds.</p>
            <div className="mt-4 flex gap-2">{social.map((s) => <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/75 transition-colors hover:border-brand-300 hover:text-brand-300"><s.icon size={15} /></a>)}</div>
            <ReviewBadge />
          </div>
          <div className="border-t border-white/20 md:grid md:grid-cols-3 md:gap-7 md:pt-7 lg:col-span-3 lg:border-0 lg:pt-0">
            <FooterLinks title="Company"><ul className="space-y-3">{company.map((l) => <li key={l.label}><Link to={l.to} className="hover:text-brand-300">{l.label}</Link></li>)}<li><a href="https://lawandlawyers.perfectportal.co.uk/" target="_blank" rel="noreferrer" className="hover:text-brand-300">Client Login</a></li></ul></FooterLinks>
            <FooterLinks title="For Individuals"><ul className="space-y-3">{individualServices.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-brand-300">{s.title}</Link></li>)}<li><Link to={conveyancingFeesUrl} className="font-semibold text-brand-300 hover:text-white">Fees information</Link></li></ul></FooterLinks>
            <FooterLinks title="For Businesses"><ul className="space-y-3">{businessServices.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-brand-300">{s.title}</Link></li>)}</ul></FooterLinks>
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-white/20 pt-7 md:grid-cols-2 md:gap-10 lg:mt-10">
          {officeContacts.map((office) => <div key={office.name}>
            <h3 className="font-serif text-lg text-white">{office.name}{office.label && <span className="ml-2 font-sans text-[10px] font-semibold uppercase tracking-wide text-brand-300">{office.label}</span>}</h3>
            {office.address && <p className="mt-2 text-[13px] leading-relaxed text-white/70">{office.address}</p>}
            <a href={`tel:${office.phone.replace(/[^\d+]/g, "")}`} className="mt-2 block text-[13px] hover:text-brand-300">{office.phone}</a>
            {officeEmails.map((email) => <a key={email} href={`mailto:${email}`} className="footer-email mt-1 block break-all text-[13px]">{email}</a>)}
          </div>)}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/20 py-7" aria-label="Professional accreditations">
          <div aria-label="Authorised and regulated by the Solicitors Regulation Authority" className="h-[163px] w-[275px] shrink-0 overflow-hidden bg-white">
            <iframe title="Solicitors Regulation Authority digital badge" src="https://cdn.yoshki.com/iframe/55845r.html" frameBorder="0" scrolling="no" loading="lazy" className="h-full w-full border-0" />
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <img src="/images/lexcel-accreditation.png" alt="Lexcel accredited by the Law Society" className="h-16 w-20 object-contain sm:h-20 sm:w-24" />
            <img src="/images/cqs-logo-2026.png" alt="Conveyancing Quality Scheme accredited by the Law Society" className="h-16 w-20 object-contain sm:h-20 sm:w-24" />
            <img src="/images/recog3.png" alt="Cyber Essentials certified" className="h-16 w-20 object-contain sm:h-20 sm:w-24" />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/20 pt-5 text-[12px] leading-relaxed text-white/70">
          <p>Law and Lawyers Limited is authorised and regulated by the Solicitors Regulation Authority (SRA ID: 613159). <a href={sraValidationUrl} target="_blank" rel="noreferrer" className="font-semibold text-brand-300 underline underline-offset-2 hover:text-white">Validate our SRA details</a>.</p>
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2"><p>© {new Date().getFullYear()} Law and Lawyers Solicitors Ltd. All rights reserved.</p><p><Link to="/privacy-policy" className="hover:text-brand-300">Privacy Policy</Link>{" | "}<Link to="/cookie-policy" className="hover:text-brand-300">Cookie Policy</Link>{" | "}<Link to="/complaints-procedure" className="hover:text-brand-300">Complaints</Link>{" | "}<Link to="/fee-information" className="hover:text-brand-300">Fee Information</Link></p></div>
        </div>
      </div>
    </footer>
  );
}