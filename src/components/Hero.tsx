import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import Pause from "@mui/icons-material/Pause";
import PlayArrow from "@mui/icons-material/PlayArrow";

export default function Hero() {
  const reduced = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  async function toggleVideo() {
    if (!video.current) return;
    if (video.current.paused) { try { await video.current.play(); } catch { setPlaying(false); } }
    else video.current.pause();
  }
  return (
    <section id="top" className="reference-hero">
      <div className="hero-intro">
        <p className="hero-kicker">Clear advice <span aria-hidden="true">✳</span> Real people</p>
        <h1>
          <motion.span initial={reduced ? false : { opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>Legal matters.</motion.span>
          <motion.span initial={reduced ? false : { opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .12 }}><em>Personal</em> attention.</motion.span>
        </h1>
        <p className="hero-description">From your first home to your next chapter. Solicitors supporting individuals and businesses across London and Manchester.</p>
        <div className="hero-actions"><Link to="/contact" className="square-link filled">Talk to our team <ArrowOutward /></Link><a href="#services" className="square-link">Explore services <ArrowOutward /></a></div>
      </div>
      <div className="hero-film">
        <video ref={video} autoPlay={!reduced} muted loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Law and Lawyers introduction video">
          <source src="/videos/banner-video.mp4" type="video/mp4" />
        </video>
        <div className="film-caption"><span>Law &amp; Lawyers / London &amp; Manchester</span><button type="button" onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? <Pause /> : <PlayArrow />}<span>{playing ? "Pause" : "Play"}</span></button></div>
      </div>
    </section>
  );
}
