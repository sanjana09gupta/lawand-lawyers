import { motion } from "framer-motion";
import { recognitions } from "../data/content";

const loop = [...recognitions, ...recognitions, ...recognitions];

export default function Recognition() {
  return (
    <section className="border-y border-brand-900/8 bg-white py-16">
      <div className="container-px">
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-600">
          Industry Recognition
        </p>
        <p className="mx-auto mt-2 max-w-md text-center text-[14.5px] leading-relaxed text-brand-800/55">
          Acknowledged by industry specialists, government and
          non-government bodies, and our clients.
        </p>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />

        <motion.div
          className="flex w-max items-center gap-10"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {loop.map((r, i) => (
            <div
              key={`${r.alt}-${i}`}
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-brand-900/8 bg-white p-4 shadow-[0_1px_2px_rgba(16,21,31,0.04)]"
            >
              <img src={r.src} alt={r.alt} className="max-h-12 w-full object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
