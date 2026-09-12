import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function OpeningIntro() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => location.pathname === "/" && !location.hash);

  useEffect(() => {
    if (!visible || reduced) return;
    const dismiss = () => setVisible(false);
    // Decorative intro, not a loader: never make visitors wait to interact.
    const timeout = window.setTimeout(dismiss, 2200);
    window.addEventListener("pointerdown", dismiss, { once: true });
    window.addEventListener("keydown", dismiss, { once: true });
    window.addEventListener("wheel", dismiss, { once: true, passive: true });
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("wheel", dismiss);
    };
  }, [visible, reduced]);

  if (!visible || reduced || location.pathname !== "/" || location.hash) return null;

  return <motion.div className="opening-intro" aria-hidden="true"
    initial={{ y: "0%" }} animate={{ y: "-102%" }}
    transition={{ delay: .85, duration: .75, ease: [.76, 0, .24, 1] }}
    onAnimationComplete={() => setVisible(false)}>
    <div className="opening-brand">
      <motion.img src="/images/logo-icon.png" alt="" width="88" height="88"
        initial={{ opacity: 0, y: 24, rotate: -12, scale: .8 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        transition={{ duration: .65, ease: [.22, 1, .36, 1] }} />
      <div className="opening-wordmark-mask"><motion.p
        initial={{ y: "110%" }} animate={{ y: 0 }}
        transition={{ delay: .12, duration: .6, ease: [.22, 1, .36, 1] }}>
        Law &amp; Lawyers
      </motion.p></div>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35, duration: .3 }}>
        Clear advice. Real people.
      </motion.span>
    </div>
  </motion.div>;
}
