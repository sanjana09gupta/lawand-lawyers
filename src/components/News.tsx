import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { news } from "../data/content";

const MotionLink = motion.create(Link);

export default function News() {
  const [featured, ...stories] = news;
  return (
    <section id="news" className="news-section">
      <div className="news-shell">
        <header className="news-heading">
          <p>Latest news</p>
          <h2>Guides for the decisions ahead.</h2>
          <a className="news-instagram" href="https://www.instagram.com/lawandlawyersuk?stkn=MXM4cGl3NmZxNGdjeg==" target="_blank" rel="noreferrer">Follow our recent updates on Instagram <ArrowRight size={15} /></a>
        </header>
        <div className="news-editorial-grid">
          <MotionLink to={`/news/${featured.slug}`} className="news-featured group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55 }} whileHover={{ y: -4 }}>
            {featured.image && <img src={featured.image} alt={featured.title} />}
            <div className="news-featured-copy"><p>{featured.date}</p><h3>{featured.title}</h3><span>Read article <ArrowRight size={16} /></span></div>
          </MotionLink>
          <div className="news-list">
            {stories.map((story, index) => <MotionLink key={story.slug} to={`/news/${story.slug}`} className="news-list-item group" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45, delay: index * 0.08 }}><p>{story.date}</p><h3>{story.title}</h3><span>Read article <ArrowRight size={15} /></span></MotionLink>)}
          </div>
        </div>
      </div>
    </section>
  );
}
