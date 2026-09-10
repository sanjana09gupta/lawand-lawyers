import { PersonRounded } from "@mui/icons-material";
import { team } from "../data/content";

export default function Team() {
  return <section id="team" className="team-directory">
    <p className="section-index">02 / Meet your team</p>
    <h2>Real people.<br />On your side.</h2>
    <div className="team-portraits">{team.map(member => <article key={member.name}>
      <div className="team-portrait">{member.photo ? <img src={member.photo} alt={member.name} loading="lazy" width="600" height="600" /> : <PersonRounded aria-label={member.name + " — portrait not available"} sx={{ fontSize: 96, color: "#22458a" }} />}</div>
      <h3>{member.name}</h3><p>{member.role}</p>
    </article>)}</div>
  </section>;
}
