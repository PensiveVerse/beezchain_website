"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Two-part custom cursor:
 *  - a precise gold dot that tracks the pointer almost 1:1
 *  - a larger ring that trails with a soft spring for a smooth, weighty feel
 * The ring grows and fills over interactive elements. Uses mix-blend-difference
 * so it stays visible on both the black page and the gold hero. Rendered only
 * on devices with a fine pointer (skipped on touch).
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  // Raw pointer position.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Ring lags behind with a gentle spring; the dot is much snappier.
  const ringX = useSpring(x, { damping: 22, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(y, { damping: 22, stiffness: 180, mass: 0.6 });
  const dotX = useSpring(x, { damping: 30, stiffness: 700, mass: 0.3 });
  const dotY = useSpring(y, { damping: 30, stiffness: 700, mass: 0.3 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, input, label, select, [data-cursor]"));
    };
    const downFn = () => setDown(true);
    const upFn = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", downFn);
    window.addEventListener("mouseup", upFn);

    return () => {
      document.documentElement.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", downFn);
      window.removeEventListener("mouseup", upFn);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringScale = down ? 0.7 : hovering ? 1.8 : 1;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] [mix-blend-mode:difference]">
      {/* trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            scale: ringScale,
            backgroundColor: hovering
              ? "rgba(255,255,255,0.9)"
              : "rgba(255,255,255,0)",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="-ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-white"
        />
      </motion.div>

      {/* precise dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="absolute left-0 top-0"
      >
        <div className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white" />
      </motion.div>
    </div>
  );
}
