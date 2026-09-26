import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BrandMark from "./BrandMark";
import { conveyancingFeesUrl } from "../data/links";

export default function CTABanner() {
  return (
    <section className="bg-paper py-8">
      <div className="container-px">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="brand-gradient relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl px-8 py-10 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 w-44 opacity-20 rotate-6">
            <BrandMark id="cta-mark" className="w-full" />
          </div>
          <div className="relative">
            <h3 className="font-serif text-2xl text-white sm:text-3xl">
              Get a conveyancing quote
            </h3>
            <p className="mt-2 max-w-md text-[14.5px] text-white/75">
              Fixed, transparent fees. Review our published fee information before you begin.
            </p>
          </div>
          <div className="relative flex flex-col items-center gap-3 sm:items-end">
            <Link
              to={conveyancingFeesUrl}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-wide text-brand-800 transition-transform hover:-translate-y-0.5"
            >
              Conveyancing fees <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="text-sm font-semibold text-white underline underline-offset-4">
              Get a quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
