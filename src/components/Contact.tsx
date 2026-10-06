import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { offices } from "../data/content";
import ScrollSection from "./ScrollSection";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();

  return (
    <ScrollSection id="contact" className="relative mb-12 overflow-hidden bg-brand-900 py-12 sm:py-14">
      <div className="absolute inset-0 bg-[linear-gradient(128deg,#0d1c42_0%,#17366f_46%,#2864ae_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_90%_at_100%_8%,rgba(126,202,247,.46)_0%,transparent_68%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/35" />

      <div className="container-px relative">
        <div className="max-w-2xl">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-300"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-3 font-serif text-3xl leading-[1.1] text-white sm:text-4xl"
          >
            Contact our team today.
          </motion.h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">
            We aim to respond to your query within 4 working hours. Monday to
            Friday, 9:30–17:30. Closed weekends &amp; bank holidays.
          </p>
        </div>

        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-2">
          <div className="min-w-0 space-y-3 rounded-2xl border border-white/15 bg-brand-950/20 p-3 sm:p-4">
            {offices.map((o, i) => (
              <motion.div
                key={o.name}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-white/15 bg-white/[0.09] p-4 shadow-[0_10px_30px_rgba(5,17,50,.13)] transition-colors hover:bg-white/[0.13]"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-brand-300" size={18} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-serif text-lg text-white">{o.name}</p>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-300">
                        {o.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13.5px] text-white/65">{o.address}</p>
                    {o.mapUrl && <a href={o.mapUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-[12px] font-semibold uppercase tracking-wide text-brand-300 hover:text-white">View on map ↗</a>}
                    <a
                      href={`tel:${o.phone.replace(/[^\d+]/g, "")}`}
                      className="mt-2 flex items-center gap-2 text-[14px] text-white/80 hover:text-brand-200"
                    >
                      <Phone size={13} /> {o.phone}
                    </a>
                    <a
                      href={`mailto:${o.email}`}
                      className="mt-1 flex items-center gap-2 break-all text-[14px] text-white/80 hover:text-brand-200"
                    >
                      <Mail size={13} /> {o.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-start gap-3 rounded-xl px-4 pb-1 pt-2"
            >
              <Clock className="mt-0.5 shrink-0 text-brand-300" size={18} />
              <div>
                <p className="text-sm font-semibold text-white">Opening Hours</p>
                <p className="mt-1 text-[13px] text-white/80">
                  Monday to Friday: 9:30 – 17:30
                </p>
                <p className="text-[13px] text-white/60">
                  Closed weekends &amp; bank holidays
                </p>
              </div>
            </motion.div>
          </div>

          <motion.form
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="min-w-0 rounded-2xl border border-white/20 bg-[#102957]/55 p-5 shadow-[0_18px_45px_rgba(4,14,42,.2)] backdrop-blur-sm sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-[12px] uppercase tracking-wide text-white/50">
                  Full name
                </label>
                <input
                  required
                  type="text"
                  className="mt-2 w-full rounded-lg border border-white/20 bg-white/[0.09] px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition-colors focus:border-brand-200 focus:bg-white/[0.13]"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-[12px] uppercase tracking-wide text-white/50">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="mt-2 w-full rounded-lg border border-white/20 bg-white/[0.09] px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition-colors focus:border-brand-200 focus:bg-white/[0.13]"
                  placeholder="jane@email.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[12px] uppercase tracking-wide text-white/50">
                  I'm enquiring about
                </label>
                <select className="mt-2 w-full rounded-lg border border-white/20 bg-white/[0.09] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-200 focus:bg-white/[0.13]">
                  <option className="bg-brand-900">Residential Conveyancing</option>
                  <option className="bg-brand-900">Immigration</option>
                  <option className="bg-brand-900">Wills and Probate</option>
                  <option className="bg-brand-900">Employment</option>
                  <option className="bg-brand-900">Family</option>
                  <option className="bg-brand-900">Landlord and Tenant</option>
                  <option className="bg-brand-900">Dispute Resolution</option>
                  <option className="bg-brand-900">Something else</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[12px] uppercase tracking-wide text-white/50">
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-white/20 bg-white/[0.09] px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition-colors focus:border-brand-200 focus:bg-white/[0.13]"
                  placeholder="Tell us briefly about your matter..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent}
              className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#4a97d6] py-3 text-sm font-semibold uppercase tracking-wide text-brand-950 shadow-[0_8px_18px_rgba(112,198,255,.22)] transition hover:bg-[#7fbde5] disabled:opacity-70"
            >
              {sent ? (
                <>
                  <CheckCircle2 size={16} /> Enquiry sent
                </>
              ) : (
                "Send Enquiry"
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </ScrollSection>
  );
}
