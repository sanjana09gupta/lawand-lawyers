import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

export default function DirectorMessage() {
  const reduced = useReducedMotion();
  return (
    <section className="director-message" aria-labelledby="director-message-title">
      <div className="container-px director-message-grid">
        <motion.div initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          <p className="section-index">A note from our senior director</p>
          <h2 id="director-message-title">Legal advice should feel clear, personal and dependable.</h2>
        </motion.div>
        <motion.div className="director-message-copy" initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.6, delay: reduced ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <p>“At Law and Lawyers, we know that every legal matter carries real consequences for the people involved. Our role is to make the process easier to understand, keep you informed and give you practical advice you can rely on. We are proud of the relationships we build with clients and the care our team brings to every matter.”</p>
          <p className="director-signature">Francis Mathew <span>Senior Director</span></p>
          <Link to="/about">Learn about our firm <span aria-hidden="true">↗</span></Link>
        </motion.div>
      </div>
    </section>
  );
}
