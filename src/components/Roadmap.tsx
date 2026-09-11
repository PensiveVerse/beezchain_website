import Image from "next/image";
import { CheckCircle2, Loader, Rocket } from "lucide-react";
import { ROADMAP } from "@/lib/data";
import Reveal from "@/components/Reveal";

// Presentational phase status (client can adjust as milestones ship).
const STATUS = [
  { label: "Completed", Icon: CheckCircle2 },
  { label: "Completed", Icon: CheckCircle2 },
  { label: "In Progress", Icon: Loader },
  { label: "Upcoming", Icon: Rocket },
];

export default function Roadmap() {
  return (
    <section className="relative bg-black">
      <Reveal className="flex flex-col items-center">
        <span className="eyebrow mb-5 mt-10">The journey</span>
        <h2
          id="roadmap"
          className="mb-4 text-center text-5xl font-extrabold uppercase md:text-[6rem]"
        >
          <span className="text-gold-shimmer">Roadmap</span>
        </h2>
        <p className="mb-6 max-w-2xl px-5 text-center text-sm text-white/60 md:text-base">
          From foundation to global scale — how BeezChain grows quarter by
          quarter.
        </p>
      </Reveal>

      {/* Sticky-stacking cards: each sticks at the same offset and the next
          scrolls up to cover it. The trailing spacer lets the LAST card fully
          cover the previous one and dwell before the page scrolls on. */}
      <div className="mx-5 my-16 space-y-12 md:mx-20">
        <div className="relative space-y-20">
          {ROADMAP.map((r, idx) => {
            const gold = r.variant === "gold";
            const headingColor = gold
              ? "text-black"
              : r.quarter === "Q1 2026"
                ? "text-gold"
                : "text-white";
            const status = STATUS[idx] ?? STATUS[STATUS.length - 1];
            const StatusIcon = status.Icon;
            return (
              <div
                key={r.quarter}
                className={`overflow-hidden rounded-3xl border-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:sticky md:top-28 ${
                  gold
                    ? "border-gold bg-gradient-to-br from-yellow-300 to-yellow-400 text-black"
                    : "border-gold/40 bg-gradient-to-br from-[#0c0c0c] to-black text-white"
                }`}
              >
                <div className="md:flex">
                  <div className="w-full p-9 md:w-[60%] md:p-12">
                    {/* phase tag + status pill */}
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${
                          gold
                            ? "bg-black/15 text-black"
                            : "bg-gold/15 text-gold"
                        }`}
                      >
                        Phase 0{idx + 1}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          gold
                            ? "bg-black/15 text-black"
                            : "bg-white/10 text-white/80"
                        }`}
                      >
                        <StatusIcon size={13} />
                        {status.label}
                      </span>
                    </div>

                    <h3 className={`text-5xl font-bold md:text-6xl ${headingColor}`}>
                      {r.quarter}
                    </h3>
                    <h4
                      className={`mt-4 text-xl font-semibold underline underline-offset-8 ${headingColor}`}
                    >
                      {r.title}
                    </h4>
                    <ul className="mt-8 space-y-3">
                      {r.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-sm md:text-base">
                          <CheckCircle2
                            size={18}
                            className={`mt-0.5 shrink-0 ${gold ? "text-black/70" : "text-gold"}`}
                          />
                          <span className={gold ? "text-black/90" : "text-white/85"}>
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative flex w-full items-center justify-center p-6 md:w-[40%]">
                    {/* soft glow behind the artwork */}
                    <div
                      aria-hidden
                      className="absolute h-56 w-56 rounded-full blur-3xl"
                      style={{
                        background: gold
                          ? "rgba(0,0,0,0.12)"
                          : "rgba(255,204,0,0.18)",
                      }}
                    />
                    <Image
                      src={r.image}
                      alt={r.quarter}
                      width={500}
                      height={500}
                      className="relative h-[18rem] w-auto object-contain drop-shadow-2xl md:h-[24rem]"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Spacer (real element, not padding — sticky bottom constraint
              ignores padding). Lets the LAST card pin and dwell. */}
          <div aria-hidden className="hidden h-64 md:block" />
        </div>
      </div>
    </section>
  );
}
