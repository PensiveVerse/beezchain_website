"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export type Segment = {
  label: string;
  value: number; // percentage (0-100)
  color: string;
};

const R = 70;
const CX = 100;
const CY = 100;
const C = 2 * Math.PI * R; // circumference

/**
 * Interactive tokenomics donut. Each arc draws itself on scroll-into-view
 * (animated strokeDashoffset), and hovering a segment or legend row
 * highlights the arc, and the BeezChain coin sits at the centre of the ring —
 * with a percentage readout that overlays the coin while a slice is hovered.
 */
export default function DonutChart({
  segments,
  centerImage,
}: {
  segments: Segment[];
  centerImage?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  // Interaction: mouse uses hover (enter/leave); touch & pen use tap-to-toggle.
  // Splitting by pointerType keeps the two from cancelling each other out on
  // hybrid devices (a tap would otherwise fire enter *and* click).
  const hoverEnter = (e: React.PointerEvent, i: number) => {
    if (e.pointerType === "mouse") setActive(i);
  };
  const hoverLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setActive(null);
  };
  const tapToggle = (e: React.PointerEvent, i: number) => {
    if (e.pointerType !== "mouse") setActive((prev) => (prev === i ? null : i));
  };

  // Precompute each arc's pixel length and starting rotation.
  let cumulative = 0;
  const arcs = segments.map((s) => {
    const len = (s.value / 100) * C;
    const startAngle = (cumulative / 100) * 360 - 90; // start at 12 o'clock
    cumulative += s.value;
    return { ...s, len, startAngle };
  });

  return (
    <div className="grid w-full items-center gap-10 md:grid-cols-2">
      {/* Chart */}
      <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-0">
          {/* track */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={26}
          />
          {arcs.map((a, i) => {
            const isActive = active === i;
            const dim = active !== null && !isActive;
            return (
              <motion.circle
                key={a.label}
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke={a.color}
                strokeWidth={isActive ? 32 : 26}
                strokeLinecap="butt"
                strokeDasharray={`${a.len} ${C - a.len}`}
                transform={`rotate(${a.startAngle} ${CX} ${CY})`}
                initial={{ strokeDashoffset: a.len, opacity: 0 }}
                whileInView={{ strokeDashoffset: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onPointerEnter={(e) => hoverEnter(e, i)}
                onPointerLeave={hoverLeave}
                onPointerUp={(e) => tapToggle(e, i)}
                style={{
                  opacity: dim ? 0.35 : 1,
                  cursor: "pointer",
                  touchAction: "manipulation",
                  transition: "stroke-width 0.25s ease, opacity 0.25s ease",
                  filter: isActive
                    ? "drop-shadow(0 0 8px rgba(255,204,0,0.55))"
                    : "none",
                }}
              />
            );
          })}
        </svg>

        {/* Center: BeezChain coin, with a hover readout that overlays it */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* soft glow behind the coin */}
          <div
            aria-hidden
            className="absolute h-[52%] w-[52%] rounded-full bg-gold/20 blur-2xl"
          />

          {centerImage ? (
            <Image
              src={centerImage}
              alt="BeezChain coin"
              width={240}
              height={240}
              className="relative w-[54%] max-w-[190px] drop-shadow-[0_10px_30px_rgba(255,204,0,0.4)]"
            />
          ) : (
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl font-extrabold text-gold md:text-5xl">
                100%
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-white/60">
                Allocation
              </span>
            </div>
          )}

          {/* Hover readout — a translucent disc over the coin */}
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                className="absolute flex aspect-square w-[54%] max-w-[190px] flex-col items-center justify-center rounded-full bg-black/75 text-center backdrop-blur-sm ring-1 ring-gold/30"
              >
                <span className="text-3xl font-extrabold text-gold md:text-4xl">
                  {segments[active].value}%
                </span>
                <span className="mt-1 max-w-[8.5rem] px-2 text-[10px] font-semibold uppercase leading-tight tracking-wide text-white/75 md:text-xs">
                  {segments[active].label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <ul className="flex flex-col gap-2">
        {segments.map((s, i) => {
          const isActive = active === i;
          return (
            <li
              key={s.label}
              onPointerEnter={(e) => hoverEnter(e, i)}
              onPointerLeave={hoverLeave}
              onPointerUp={(e) => tapToggle(e, i)}
              style={{ touchAction: "manipulation" }}
              className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "border-gold/50 bg-gold/10"
                  : "border-white/5 bg-white/[0.02] hover:border-white/15"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-sm"
                  style={{ background: s.color }}
                />
                <span className="text-sm text-white/85 md:text-base">
                  {s.label}
                </span>
              </span>
              <span className="text-sm font-bold text-gold md:text-base">
                {s.value}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
