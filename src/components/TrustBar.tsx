import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { stats } from "../data/content";

export default function TrustBar() {
  return (
    <section className="relative -mt-px bg-brand-900 py-10">
      <div className="container-px grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center sm:text-left"
          >
            <p className="font-serif text-3xl text-brand-300 sm:text-4xl">
              <AnimatedCounter
                target={s.target}
                decimals={"decimals" in s ? s.decimals : 0}
                suffix={"suffix" in s ? s.suffix : ""}
              />
            </p>
            <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-white/50">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
