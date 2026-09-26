import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Props = {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function AnimatedCounter({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (nextValue) => setValue(nextValue),
      onComplete: () => setValue(target),
    });
    return () => controls.stop();
  }, [duration, inView, reduceMotion, target]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${target.toFixed(decimals)}${suffix}`}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
