import { motion } from "framer-motion";
import { Rate } from "antd";
import { FormatQuote } from "@mui/icons-material";
import TiltCard from "./TiltCard";
import { testimonials } from "../data/content";

export default function Testimonials() {
  return (
    <section className="bg-mist py-28">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-600"
            >
              Client Reviews
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-3 font-serif text-4xl leading-[1.05] text-brand-950 sm:text-5xl"
            >
              What our clients say.
            </motion.h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-brand-900/10 bg-white px-5 py-4">
            <Rate disabled allowHalf defaultValue={4.6} style={{ fontSize: 16 }} />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-brand-950">4.6 / 5</p>
              <p className="text-[12px] text-brand-800/50">732+ reviews</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            >
              <TiltCard
                tiltStrength={5}
                className="flex h-full flex-col justify-between rounded-2xl border border-brand-900/8 bg-white p-7"
              >
                <div>
                  <FormatQuote sx={{ color: "rgba(127,189,229,0.7)", fontSize: 26 }} />
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-900/75">
                    “{t.text}”
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-brand-900/8 pt-4">
                  <div>
                    <p className="text-sm font-medium text-brand-950">{t.name}</p>
                    {t.context && (
                      <p className="text-[12px] text-brand-800/45">{t.context}</p>
                    )}
                  </div>
                  <Rate disabled defaultValue={5} style={{ fontSize: 12 }} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
