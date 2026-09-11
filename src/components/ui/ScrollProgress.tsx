"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gold bar pinned to the very top of the viewport that fills as the
 * page scrolls. `useSpring` smooths the raw scroll value so it glides.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="scroll-progress fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light"
    />
  );
}
