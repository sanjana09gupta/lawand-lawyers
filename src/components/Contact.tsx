import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { offices } from "../data/content";
import ScrollSection from "./ScrollSection";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();

  return (
    <ScrollSection id="contact" className="relative mb-12 overflow-hidden bg-brand-950 py-10 sm:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_100%_0%,#22458a_0%,transparent_60%)]" />

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
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            We aim to respond to your query within 4 working hours. Monday to
            Friday, 9:30–17:30. Closed weekends &amp; bank holidays.
          </p>
        </div>

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="min-w-0 space-y-3">
            {offices.map((o, i) => (
              <motion.div
                key={o.name}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
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
                    <p className="mt-1.5 text-[13.5px] text-white/45">{o.address}</p>
                    <a
                      href={`tel:${o.phone.replace(/[^\d+]/g, "")}`}
                      className="mt-2 flex items-center gap-2 text-[14px] text-white/65 hover:text-brand-300"
                    >
                      <Phone size={13} /> {o.phone}
                    </a>
                    <a
                      href={`mailto:${o.email}`}
                      className="mt-1 flex items-center gap-2 break-all text-[14px] text-white/65 hover:text-brand-300"
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
              className="flex items-start gap-3 px-4 pt-2"
            >
              <Clock className="mt-0.5 shrink-0 text-brand-300" size={18} />
              <div>
                <p className="text-sm font-semibold text-white">Opening Hours</p>
                <p className="mt-1 text-[13px] text-white/65">
                  Monday to Friday: 9:30 – 17:30
                </p>
                <p className="text-[13px] text-white/45">
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
            className="min-w-0 rounded-xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-[12px] uppercase tracking-wide text-white/50">
                  Full name
                </label>
                <input
                  required
                  type="text"
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-300"
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
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-300"
                  placeholder="jane@email.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[12px] uppercase tracking-wide text-white/50">
                  I'm enquiring about
                </label>
                <select className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-300">
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
                  className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-300"
                  placeholder="Tell us briefly about your matter..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent}
              className="brand-gradient mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-70"
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
