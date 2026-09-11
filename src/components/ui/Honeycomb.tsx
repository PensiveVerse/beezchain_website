"use client";

import { motion } from "framer-motion";

/** A single pointy-top hexagon outline. */
function Hex({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 115" className={className} fill="none">
      <path
        d="M50 2 97 29v57L50 113 3 86V29z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CELLS = [
  { top: "8%", left: "6%", size: 70, dur: 7, delay: 0, op: 0.25 },
  { top: "64%", left: "12%", size: 48, dur: 9, delay: 1.2, op: 0.2 },
  { top: "18%", left: "84%", size: 90, dur: 8, delay: 0.6, op: 0.22 },
  { top: "72%", left: "78%", size: 60, dur: 10, delay: 0.3, op: 0.18 },
  { top: "40%", left: "92%", size: 40, dur: 6.5, delay: 1.6, op: 0.2 },
  { top: "86%", left: "46%", size: 54, dur: 8.5, delay: 0.9, op: 0.16 },
];

/**
 * Floating honeycomb cells drifting over the hero — a nod to the "Beez"
 * brand. Rendered in near-black so they read as soft embossed shapes on
 * the gold field. Purely decorative.
 */
export default function Honeycomb() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {CELLS.map((c, i) => (
        <motion.div
          key={i}
          className="absolute text-black/40"
          style={{
            top: c.top,
            left: c.left,
            width: c.size,
            opacity: c.op,
          }}
          animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
          transition={{
            duration: c.dur,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Hex className="h-full w-full" />
        </motion.div>
      ))}
    </div>
  );
}
