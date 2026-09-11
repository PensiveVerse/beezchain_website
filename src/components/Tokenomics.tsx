import { TOKEN_STATS } from "@/lib/data";
import Reveal from "@/components/Reveal";
import DonutChart, { type Segment } from "@/components/ui/DonutChart";

// Distribution (sums to 100%), ordered largest-first for a clean legend.
const SEGMENTS: Segment[] = [
  { label: "Investors", value: 25, color: "#fff3bf" },
  { label: "Community", value: 25, color: "#ffe066" },
  { label: "Staking & Rewards", value: 20, color: "#ffcc00" },
  { label: "Gaming & Forex Incentive", value: 10, color: "#f0b429" },
  { label: "Tech Reserve", value: 10, color: "#dba81d" },
  { label: "Team & Advisors", value: 10, color: "#a9781a" },
];

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl glass px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
        {label}
      </div>
      <div className="mt-2 break-words text-lg font-extrabold leading-tight tracking-tight text-gold md:text-xl">
        {value}
      </div>
    </div>
  );
}

export default function Tokenomics() {
  return (
    <section
      id="tokenomics"
      className="dot-grid relative bg-black px-4 py-20 text-white"
    >
      <Reveal className="flex flex-col items-center">
        <span className="eyebrow mb-5">Token distribution</span>
        <h2 className="mb-4 text-center text-5xl font-extrabold uppercase md:text-[6rem]">
          <span className="text-gold-shimmer">Tokenomics</span>
        </h2>
        <p className="mb-16 max-w-2xl text-center text-sm text-white/60 md:text-base">
          A transparent breakdown of BZC&rsquo;s 10.08&nbsp;B total supply across
          the ecosystem. Hover a slice to explore.
        </p>
      </Reveal>

      {/* Interactive distribution chart */}
      <Reveal className="mx-auto max-w-5xl rounded-3xl glass p-6 md:p-10">
        <DonutChart segments={SEGMENTS} centerImage="/images/coin.webp" />
      </Reveal>

      {/* Key facts */}
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-5">
        {TOKEN_STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <StatCard label={s.label} value={s.value} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
