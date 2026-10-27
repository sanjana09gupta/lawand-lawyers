import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import Pause from "@mui/icons-material/Pause";
import PlayArrow from "@mui/icons-material/PlayArrow";

export default function Hero() {
  const reduced = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setVideoReady(true), 900);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (video.current) video.current.playbackRate = 0.72;
  }, [videoReady]);

  async function toggleVideo() {
    if (!videoReady) {
      setVideoReady(true);
      return;
    }
    if (!video.current) return;
    if (video.current.paused) { try { await video.current.play(); } catch { setPlaying(false); } }
    else video.current.pause();
  }
  return (
    <section id="top" className="reference-hero">
      <div className="hero-intro hero-intro-video">
        <div className="hero-intro-content">
          <div className="hero-title-block">
            <p className="hero-kicker">London solicitors · SRA regulated</p>
            <h1 className="hero-headline" aria-label="Immigration and property solicitors in London">
              <motion.span initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>Immigration</motion.span>
              <motion.span initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .08 }}>and property</motion.span>
              <motion.span initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .16 }}>solicitors</motion.span>
              <motion.span initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .24 }}>in London</motion.span>
            </h1>
          </div>
          <div className="hero-summary">
            <p className="hero-description">Law and Lawyers is an SRA-regulated London law firm advising on immigration, conveyancing, wills and probate, employment and family law. Speak to an experienced solicitor today.</p>
            <div className="hero-actions"><Link to="/contact" className="square-link">Get a free quote <ArrowOutward /></Link></div>
          </div>
        </div>
        <div className="hero-video-stage">
          <video ref={video} className="hero-background-video" autoPlay={videoReady && !reduced} muted loop playsInline preload="none" onLoadedMetadata={() => { if (video.current) video.current.playbackRate = 0.72; }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Law and Lawyers introduction video">
            {videoReady && <source src="/videos/banner-video.mp4" type="video/mp4" />}
          </video>
          <div className="hero-video-overlay" />
          <div className="film-caption"><button type="button" onClick={toggleVideo} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? <Pause /> : <PlayArrow />}<span>{playing ? "Pause" : "Play"}</span></button></div>
        </div>
      </div>
    </section>
  );
}
