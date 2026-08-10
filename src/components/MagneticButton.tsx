import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  strength?: number;
};

export default function MagneticButton({
  href,
  children,
  className = "",
  target,
  rel,
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 14, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const isInternal = href.startsWith("/") && !target;

  if (isInternal) {
    return (
      <MotionLink
        ref={ref}
        to={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: springX, y: springY }}
        className={className}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
