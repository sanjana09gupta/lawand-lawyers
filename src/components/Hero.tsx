import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import BrandMark from "./BrandMark";
import MagneticButton from "./MagneticButton";
import { team } from "../data/content";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const lineReveal = {
  hidden: { y: "112%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stats = [
  { value: "6", label: "Directors" },
  { value: "3", label: "UK offices" },
  { value: "7+", label: "Areas of law" },
];

const avatarTeam = team.filter((m) => m.photo).slice(0, 3);

export default function Hero() {
  return (
    <section
      id="top"
      className="relative bg-paper px-3 pt-3 pb-20 sm:px-6 sm:pt-6 sm:pb-28"
    >
      <div className="relative mt-24 min-h-[88svh] overflow-hidden rounded-[2rem] bg-brand-950 sm:mt-28 sm:min-h-[85vh] sm:rounded-[2.5rem]">
        {/* background video, visible on the left of the diagonal split */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/banner-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-brand-950/45" />

        {/* diagonal panel — desktop only, echoes the split-screen reference */}
        <div
          className="absolute inset-0 hidden bg-brand-950 sm:block"
          style={{ clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 16% 100%)" }}
        />
        <div
          className="absolute inset-0 hidden opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px] sm:block"
          style={{ clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 16% 100%)" }}
        />

        {/* mobile-only legibility overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,17,34,0.55)_0%,rgba(10,17,34,0.88)_60%,#0a1122_100%)] sm:hidden" />

        {/* oversized wordmark sitting on the video side */}
        <div className="pointer-events-none absolute -left-3 bottom-6 hidden select-none overflow-hidden sm:block">
          <span className="font-serif text-[13rem] italic leading-none text-white/[0.07]">
            L&amp;L
          </span>
        </div>

        <motion.div
          className="pointer-events-none absolute right-6 top-6 aspect-square w-14 opacity-20 sm:right-10 sm:top-10 sm:w-16"
          initial={{ rotate: -6, opacity: 0 }}
          animate={{ rotate: 0, opacity: 0.2 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandMark id="hero-mark" className="h-full w-full" />
        </motion.div>

        {/* content */}
        <div className="container-px relative z-10 flex min-h-[88svh] flex-col justify-center gap-7 py-24 sm:min-h-[85vh] sm:items-end sm:pl-[46%] sm:text-right">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-brand-200 backdrop-blur-sm"
          >
            SRA-Regulated Solicitors · London &amp; Manchester
          </motion.div>

          <h1 className="max-w-xl font-serif text-[clamp(2.5rem,6vw,4.2rem)] leading-[0.98] text-white">
            <span className="block overflow-hidden">
              <motion.span
                variants={lineReveal}
                initial="hidden"
                animate="show"
                custom={0}
                className="block"
              >
                Clear counsel,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={lineReveal}
                initial="hidden"
                animate="show"
                custom={1}
                className="block italic text-brand-300"
              >
                carried through.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="max-w-md text-[15.5px] leading-relaxed text-white/65 sm:ml-auto"
          >
            Managing your legal matters with care, precision and
            efficiency — so the process stays smooth and stress-free from
            first call to completion.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="flex flex-wrap items-center gap-3 sm:justify-end"
          >
            <MagneticButton
              href="/contact"
              className="brand-gradient group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(47,116,189,0.7)]"
            >
              Get a Quote
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href="#services"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-white transition-colors hover:border-brand-300 hover:text-brand-300"
            >
              Explore Services
              <ArrowUpRight size={15} />
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-4 flex items-stretch gap-5 sm:justify-end"
          >
            <div className="w-px bg-white/15" />
            <ul className="space-y-2 text-left text-[13px] text-white/55">
              {stats.map((s) => (
                <li key={s.label}>
                  <span className="font-serif text-[15px] text-white">{s.value}</span>{" "}
                  {s.label}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* proof card, breaking the frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-8 z-20 flex translate-y-1/2 items-center gap-4 rounded-2xl border border-brand-900/8 bg-white py-3 pl-3 pr-5 shadow-[0_16px_40px_-16px_rgba(13,20,36,0.35)] sm:left-14"
      >
        <div className="flex -space-x-3">
          {avatarTeam.map((m) => (
            <img
              key={m.name}
              src={m.photo!}
              alt={m.name}
              className="h-10 w-10 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <div>
          <div className="flex items-center gap-1 text-star">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
            ))}
            <span className="ml-1 text-[12.5px] font-semibold text-brand-950">4.6</span>
          </div>
          <p className="text-[12px] text-brand-800/55">Trusted by 700+ clients</p>
        </div>
      </motion.div>
    </section>
  );
}
