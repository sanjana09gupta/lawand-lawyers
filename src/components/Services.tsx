import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Segmented } from "antd";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";
import { individualServices, businessServices } from "../data/content";

const tabs = [
  {
    key: "individuals",
    label: "For Individuals",
    blurb:
      "Our experienced personal law solicitors are ready to help with your claim. We have an excellent track record in winning ratios.",
    items: individualServices,
  },
  {
    key: "businesses",
    label: "For Businesses",
    blurb:
      "We have extensive experience in commercial law, handling and managing suits. Our dedicated commercial team is always open to conversing with clients.",
    items: businessServices,
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section id="services" className="bg-mist py-28">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-600"
            >
              What We Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-3 font-serif text-4xl leading-[1.05] text-brand-950 sm:text-5xl"
            >
              Practical legal support, tailored to the matter at hand.
            </motion.h2>

            <div className="mt-10 w-fit">
              <Segmented
                size="large"
                value={tab.key}
                onChange={(val) => setActive(tabs.findIndex((t) => t.key === val))}
                options={tabs.map((t) => ({ label: t.label, value: t.key }))}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={tab.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-7 max-w-md text-[15px] leading-relaxed text-brand-800/70"
              >
                {tab.blurb}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {tab.items.map((item, i) => (
                  <motion.div
                    key={item.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <TiltCard className="h-full rounded-2xl border border-brand-900/8 bg-white shadow-[0_1px_2px_rgba(16,21,31,0.04)] transition-colors hover:border-brand-300/60">
                      <Link
                        to={`/services/${item.slug}`}
                        className="group flex h-full flex-col justify-between gap-8 rounded-2xl p-6"
                      >
                        <span className="text-lg font-medium leading-snug text-brand-950">
                          {item.title}
                        </span>
                        <ArrowUpRight
                          size={20}
                          className="text-brand-900/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-600"
                        />
                      </Link>
                    </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
