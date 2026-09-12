import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Segmented } from "antd";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import { individualServices, businessServices } from "../data/content";
import ScrollSection from "./ScrollSection";

export default function Services() {
  const [business, setBusiness] = useState(false);
  const reduced = useReducedMotion();
  const items = business ? businessServices : individualServices;
  return <ScrollSection id="services" className="expertise-section" light>
    <motion.div className="expertise-heading" initial={reduced ? false : { x: -16, opacity: .4 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6 }}><p className="section-index">01 / Our expertise</p><h2>Life moves.<br />We help you<br /><em>move forward.</em></h2><p>Practical support for the decisions that matter. Find the right team for your next step.</p><Segmented value={business ? "Businesses" : "Individuals"} options={["Individuals", "Businesses"]} onChange={value => setBusiness(value === "Businesses")} /></motion.div>
    <div className="service-rows">{items.map((item, i) => <motion.div key={item.slug} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .035 }}><Link to={`/services/${item.slug}`}><span className="service-number">{String(i + 1).padStart(2, "0")}</span><span>{item.title}</span><ArrowOutward /></Link></motion.div>)}</div>
  </ScrollSection>;
}
