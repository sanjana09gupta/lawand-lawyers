import { Link } from "react-router-dom";

export default function DirectorMessage() {
  return (
    <section className="director-message" aria-labelledby="director-message-title">
      <div className="container-px director-message-grid">
        <div>
          <p className="section-index">A note from our senior director</p>
          <h2 id="director-message-title">Legal advice should feel clear, personal and dependable.</h2>
        </div>
        <div className="director-message-copy">
          <p>“At Law and Lawyers, we know that every legal matter carries real consequences for the people involved. Our role is to make the process easier to understand, keep you informed and give you practical advice you can rely on. We are proud of the relationships we build with clients and the care our team brings to every matter.”</p>
          <p className="director-signature">Francis Mathew <span>Senior Director</span></p>
          <Link to="/about">Learn about our firm <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
