import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { PersonRounded } from "@mui/icons-material";
import { team } from "../data/content";

function Avatar({ member, className }: { member: (typeof team)[number]; className?: string }) {
  return member.photo ? (
    <img src={member.photo} alt={member.name} className={`h-full w-full object-cover ${className ?? ""}`} />
  ) : (
    <div
      className={`brand-gradient flex h-full w-full items-center justify-center ${className ?? ""}`}
      role="img"
      aria-label={`${member.name} — no photo available`}
    >
      <PersonRounded sx={{ fontSize: "55%", color: "rgba(255,255,255,0.85)" }} />
    </div>
  );
}

export default function Team() {
  const [index, setIndex] = useState(0);
  const len = team.length;
  const current = team[index];
  const next1 = team[(index + 1) % len];
  const next2 = team[(index + 2) % len];

  function step(dir: 1 | -1) {
    setIndex((i) => (i + dir + len) % len);
  }

  return (
    <section id="team" className="bg-[#f2ede4] py-28">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-600"
            >
              Our Team
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-3 font-serif text-4xl leading-[1.05] text-brand-950 sm:text-5xl"
            >
              Directors who manage your matter with care.
            </motion.h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-brand-800/55">
            Six directors, decades of combined experience — ensuring every
            transaction goes smoothly and stress-free for you.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* text panel */}
          <div>
            <div className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-brand-700">
              <BadgeCheck size={15} />
              SRA-Regulated Director
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5"
              >
                <p className="font-serif text-2xl text-brand-950">{current.name}</p>
                <p className="mt-1 text-[14px] text-brand-800/55">{current.role}</p>
                <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-brand-800/70">
                  Part of the director team overseeing client matters end to
                  end, from first enquiry through to completion.
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => step(-1)}
                aria-label="Previous director"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-900/12 bg-white text-brand-800 transition-colors hover:border-brand-400 hover:text-brand-600"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next director"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-900/12 bg-white text-brand-800 transition-colors hover:border-brand-400 hover:text-brand-600"
              >
                <ChevronRight size={18} />
              </button>
              <span className="ml-2 text-[12.5px] text-brand-800/45">
                {index + 1} / {len}
              </span>
            </div>
          </div>

          {/* photo collage */}
          <div className="relative h-[360px] sm:h-[420px]">
            <motion.div
              key={`${next1.name}-back`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute left-2 top-4 h-40 w-32 overflow-hidden rounded-2xl border-4 border-[#f2ede4] shadow-[0_20px_40px_-16px_rgba(16,21,31,0.25)] sm:left-6 sm:h-48 sm:w-40"
            >
              <Avatar member={next1} />
            </motion.div>

            <motion.div
              key={`${next2.name}-corner`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="absolute bottom-4 right-4 h-32 w-32 overflow-hidden rounded-2xl border-4 border-[#f2ede4] shadow-[0_20px_40px_-16px_rgba(16,21,31,0.25)] sm:bottom-8 sm:right-10 sm:h-36 sm:w-36"
            >
              <Avatar member={next2} />
            </motion.div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.name}
                initial={{ opacity: 0, scale: 0.92, x: -16 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: 16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-1/2 h-56 w-48 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border-4 border-white shadow-[0_30px_60px_-20px_rgba(16,21,31,0.35)] sm:h-72 sm:w-60"
              >
                <Avatar member={current} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
