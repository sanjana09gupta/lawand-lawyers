import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glow?: boolean;
};

export default function TiltCard({
  children,
  className = "",
  tiltStrength = 10,
  glow = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 220, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [0, 1], [tiltStrength, -tiltStrength]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltStrength, tiltStrength]), springConfig);
  const glowX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(y, [0, 1], ["0%", "100%"]);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
    setHovered(false);
  }

  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(180px circle at ${gx} ${gy}, rgba(74,151,214,0.16), transparent 70%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`relative ${className}`}
    >
      {glow && (
        <motion.div
          aria-hidden="true"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glowBackground }}
        />
      )}
      {children}
    </motion.div>
  );
}
