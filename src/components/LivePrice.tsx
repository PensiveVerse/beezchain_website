"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Droplets,
  BarChart3,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { BZC, IS_TOKEN_LIVE } from "@/lib/token";
import { openSwap } from "@/lib/swap";

type Market = {
  priceUsd: string;
  change24h: number;
  liquidityUsd: number;
  volume24h: number;
  marketCap: number;
  url: string;
};

// Pull live market data from DexScreener once the token + pool exist.
async function fetchMarket(mint: string): Promise<Market | null> {
  const res = await fetch(
    `https://api.dexscreener.com/latest/dex/tokens/${mint}`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  const data = await res.json();
  const pairs = Array.isArray(data?.pairs) ? data.pairs : [];
  if (!pairs.length) return null;
  // Prefer the pair with the deepest liquidity.
  const best = pairs.reduce((a: any, b: any) =>
    (b?.liquidity?.usd ?? 0) > (a?.liquidity?.usd ?? 0) ? b : a,
  );
  return {
    priceUsd: best.priceUsd ?? "0",
    change24h: best.priceChange?.h24 ?? 0,
    liquidityUsd: best.liquidity?.usd ?? 0,
    volume24h: best.volume?.h24 ?? 0,
    marketCap: best.marketCap ?? best.fdv ?? 0,
    url: best.url ?? "",
  };
}

const fmtUsd = (n: number) =>
  n >= 1
    ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
    : `$${n.toLocaleString("en-US", { maximumFractionDigits: 8 })}`;

export default function LivePrice() {
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(IS_TOKEN_LIVE);

  useEffect(() => {
    if (!IS_TOKEN_LIVE || !BZC.mintAddress) return;
    let alive = true;
    const load = async () => {
      try {
        const m = await fetchMarket(BZC.mintAddress);
        if (alive) setMarket(m);
      } catch {
        /* ignore transient errors */
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 30_000); // refresh every 30s
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const up = (market?.change24h ?? 0) >= 0;

  return (
    <section id="price" className="relative px-5 py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow mb-5">Live market</span>
          <h2 className="mb-5 text-3xl font-extrabold md:text-5xl">
            <span className="text-gold-shimmer">{BZC.symbol} PRICE</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base text-white/70 md:text-xl">
            Real-time {BZC.name} market data, updated automatically from
            on-chain liquidity.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl glass-gold p-8 md:p-12">
          <div
            aria-hidden
            className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold/20 blur-3xl"
          />

          {IS_TOKEN_LIVE ? (
            <div className="relative flex flex-col gap-8">
              {/* Price headline */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm uppercase tracking-widest text-white/50">
                  Current Price
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-gold md:text-6xl">
                    {loading
                      ? "…"
                      : market
                        ? fmtUsd(Number(market.priceUsd))
                        : "—"}
                  </span>
                  {market && (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
                        up
                          ? "bg-green-500/15 text-green-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {up ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                      {market.change24h.toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Stat
                  icon={<Droplets size={18} />}
                  label="Liquidity"
                  value={market ? fmtUsd(market.liquidityUsd) : "—"}
                />
                <Stat
                  icon={<BarChart3 size={18} />}
                  label="24h Volume"
                  value={market ? fmtUsd(market.volume24h) : "—"}
                />
                <Stat
                  icon={<DollarSign size={18} />}
                  label="Market Cap"
                  value={market ? fmtUsd(market.marketCap) : "—"}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={openSwap}
                  className="btn-gold shine inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold"
                >
                  Buy {BZC.symbol}
                </button>
                {market?.url && (
                  <a
                    href={market.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
                  >
                    View chart on DexScreener
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <ComingSoon />
          )}
        </div>
      </Reveal>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-gold/20 bg-black/50 p-6 text-center">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold">
        {icon}
      </span>
      <span className="text-xs uppercase tracking-wide text-white/50">
        {label}
      </span>
      <span className="text-lg font-bold text-white md:text-xl">{value}</span>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="relative flex flex-col items-center gap-5 py-6 text-center">
      <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
        Live price coming soon
      </span>
      <p className="max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
        Once {BZC.name} ({BZC.symbol}) launches on Solana and liquidity is added
        on Raydium, real-time price, liquidity, volume, and market cap will
        appear here — refreshed automatically.
      </p>
      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        {["Liquidity", "24h Volume", "Market Cap"].map((l) => (
          <div
            key={l}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-6"
          >
            <span className="text-xs uppercase tracking-wide text-white/40">
              {l}
            </span>
            <span className="text-lg font-bold text-white/30">—</span>
          </div>
        ))}
      </div>
      <button
        onClick={openSwap}
        className="btn-gold shine mt-1 inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold"
      >
        Buy {BZC.symbol}
      </button>
    </div>
  );
}
