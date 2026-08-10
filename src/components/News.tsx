import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { news } from "../data/content";

const MotionLink = motion.create(Link);

export default function News() {
  return (
    <section id="news" className="bg-paper py-28">
      <div className="container-px">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-600"
          >
            Latest News
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-3 font-serif text-4xl leading-[1.05] text-brand-950 sm:text-5xl"
          >
            Insights &amp; law updates.
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {news.map((n, i) => (
            <MotionLink
              key={n.slug}
              to={`/news/${n.slug}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group flex flex-col gap-6 rounded-2xl border border-brand-900/8 bg-white p-6 transition-colors hover:border-brand-300/60 sm:flex-row ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              {n.image && (
                <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl sm:w-56">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <p className="text-[12px] uppercase tracking-wide text-brand-800/45">
                  {n.date}
                </p>
                <h3 className="mt-2 font-serif text-xl leading-snug text-brand-950">
                  {n.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-brand-800/60">
                  {n.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
                  Read more
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
