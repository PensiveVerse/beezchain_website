"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
};

/**
 * Pointer-reactive 3D tilt. Tracks the cursor's position over the card and
 * rotates it toward the pointer with a spring, plus a soft gold glare that
 * follows the cursor. Falls flat on touch (no pointer hover) automatically.
 */
export default function TiltCard({ children, className, max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  });

  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`relative [transform-style:preserve-3d] ${className ?? ""}`}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(circle at ${x} ${y}, rgba(255,214,13,0.18), transparent 45%)`
          ),
        }}
      />
    </motion.div>
  );
}
