"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink, Lock, ShieldCheck, Coins } from "lucide-react";
import {
  CONTRACT_ADDRESS,
  DISTRIBUTION_WALLETS,
  TEAM_LOCK_LINK,
} from "@/lib/data";
import Reveal from "@/components/Reveal";

const short = (a: string) => `${a.slice(0, 4)}…${a.slice(-4)}`;
const solscanAccount = (a: string) => `https://solscan.io/account/${a}`;
const solscanToken = (a: string) => `https://solscan.io/token/${a}`;

export default function Transparency() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (addr: string) => {
    try {
      await navigator.clipboard.writeText(addr);
      setCopied(addr);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="transparency" className="relative px-5 py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow mb-5">Verifiable on-chain</span>
          <h2 className="mb-5 text-3xl font-extrabold md:text-5xl">
            <span className="text-gold-shimmer">ON-CHAIN TRANSPARENCY</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base text-white/70 md:text-xl">
            Every BZC allocation lives in a public wallet you can verify on
            Solscan. The supply is fixed, and the team tokens are locked.
          </p>
        </div>

        {/* trust badges */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Badge
            icon={<Coins size={18} />}
            title="Fixed supply"
            value="10,800,000,000 BZC"
          />
          <Badge
            icon={<ShieldCheck size={18} />}
            title="Mint authority"
            value="Revoked — locked"
          />
          <Badge
            icon={<Lock size={18} />}
            title="Team tokens"
            value="Locked for 3 years"
          />
        </div>

        {/* wallet list */}
        <div className="relative overflow-hidden rounded-3xl glass-gold p-4 md:p-6">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/10 blur-3xl"
          />
          <div className="relative space-y-2">
            {DISTRIBUTION_WALLETS.map((w) => (
              <div
                key={w.address}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="min-w-[46px] shrink-0 rounded-lg bg-gold/15 px-2 py-1 text-center text-xs font-bold text-gold">
                    {w.pct}%
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 font-semibold text-white">
                      {w.name}
                      {w.locked && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-0.5 text-[11px] font-semibold text-green-400">
                          <Lock size={11} /> Locked
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-white/50">
                      {w.amount} BZC{w.note ? ` · ${w.note}` : ""}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-[58px] sm:pl-0">
                  <code className="rounded-lg bg-black/60 px-2 py-1 font-mono text-xs text-gold">
                    {short(w.address)}
                  </code>
                  <button
                    onClick={() => copy(w.address)}
                    aria-label="Copy address"
                    className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {copied === w.address ? (
                      <Check size={15} />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                  <a
                    href={
                      w.locked && TEAM_LOCK_LINK
                        ? TEAM_LOCK_LINK
                        : solscanAccount(w.address)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on Solscan"
                    className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-gold"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <a
            href={solscanToken(CONTRACT_ADDRESS)}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
          >
            View the BZC token on Solscan
            <ExternalLink size={14} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Badge({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gold/20 bg-black/40 p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
        {icon}
      </span>
      <div>
        <div className="text-xs uppercase tracking-wide text-white/50">
          {title}
        </div>
        <div className="text-sm font-bold text-white">{value}</div>
      </div>
    </div>
  );
}
