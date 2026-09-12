import { useState } from "react";
import { AddRounded, PersonRounded } from "@mui/icons-material";
import { motion, useReducedMotion } from "framer-motion";
import { team } from "../data/content";
import ScrollSection from "./ScrollSection";

function TeamPortrait({ member, index }: { member: typeof team[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const open = hovered || expanded;

  return <motion.div className="team-scroll-card"
    initial={reduceMotion ? false : { y: 32, opacity: .25 }}
    whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .15 }}
    transition={{ duration: .55, delay: index * .055, ease: [.22, 1, .36, 1] }}>
    <article className="team-file" data-open={open}
    onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
    onPointerLeave={() => setHovered(false)}
    onKeyDown={event => { if (event.key === "Escape") { setExpanded(false); setHovered(false); } }}>
    <button type="button" className="team-card-toggle" aria-expanded={open}
      aria-controls={`team-details-${index}`} aria-label={`${member.name}, ${open ? "hide" : "show"} details`}
      onClick={() => setExpanded(value => !value)}>
      <span className="team-file-index" aria-hidden="true">L&L / {String(index + 1).padStart(2, "0")}</span>
      <span className="team-portrait">
        {member.photo ? <img src={member.photo} alt={member.name} loading="lazy" width="600" height="600" /> : <PersonRounded className="team-placeholder" aria-hidden="true" />}
      </span>
      <span className="team-nameplate"><span>{member.name}</span><AddRounded className="team-reveal-icon" aria-hidden="true" /></span>
    </button>
    <motion.div id={`team-details-${index}`} className="team-card-details" aria-hidden={!open}
      initial={false} animate={{ y: open ? 0 : "100%", opacity: open ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : .28, ease: [.22, 1, .36, 1] }}>
      <span className="team-detail-label">Meet your team</span>
      <p>{member.role}</p>
      {!member.photo && <small>Portrait not available</small>}
    </motion.div>
  </article></motion.div>;
}

export default function Team() {
  const reduced = useReducedMotion();
  return <ScrollSection id="team" className="team-directory" light>
    <p className="section-index">02 / Meet your team</p>
    <motion.div className="team-heading" initial={reduced ? false : { x: -16, opacity: .4 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6 }}><h2>Real people.<br />On your side.</h2>
      <p>A personal approach starts with our people.<br /><span>Hover or tap a portrait to meet the team.</span></p>
    </motion.div>
    <div className="team-portraits">{team.map((member, index) => <TeamPortrait key={member.name} member={member} index={index} />)}</div>
  </ScrollSection>;
}
