import { motion } from "framer-motion";
import { VerifiedUser, Groups, Schedule, Balance } from "@mui/icons-material";

const points = [
  {
    icon: VerifiedUser,
    title: "SRA Regulated",
    text: "Authorised and regulated by the Solicitors Regulation Authority (SRA ID: 613159), so every matter is handled to the profession's highest standard.",
  },
  {
    icon: Groups,
    title: "A Team, Not a Ticket",
    text: "You work directly with a named director throughout — no handing your case between strangers as it moves through the process.",
  },
  {
    icon: Schedule,
    title: "4-Hour Response",
    text: "We aim to respond to every enquiry within four working hours, because uncertainty is the hardest part of any legal matter.",
  },
  {
    icon: Balance,
    title: "Full-Service Practice",
    text: "From conveyancing to immigration, wills, employment and disputes — one firm that can see a matter through end to end.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-brand-950 py-28">
      <div className="container-px">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-300"
          >
            Why Law and Lawyers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-3 font-serif text-4xl leading-[1.05] text-white sm:text-5xl"
          >
            Care and efficiency, from the first call to completion.
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-brand-950 p-8 transition-colors hover:bg-brand-900"
            >
              <p.icon sx={{ color: "#7fbde5", fontSize: 26 }} />
              <h3 className="mt-6 font-serif text-xl text-white">{p.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/55">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
