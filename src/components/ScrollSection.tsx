import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Progress follows the section entering the viewport, in either scroll direction. */
export default function ScrollSection({ children, id, className, light = false }: {
  children: ReactNode;
  id: string;
  className: string;
  light?: boolean;
}) {
  const target = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start 95%", "start 35%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [.975, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const backgroundColor = useTransform(scrollYProgress, [0, 1], ["#fcfdfe", "#e3f1fa"]);

  return <motion.section ref={target} id={id} className={`scroll-section ${className}`}
    style={reduced ? undefined : { scale, y, borderRadius, ...(light ? { backgroundColor } : {}) }}>
    {children}
  </motion.section>;
}
