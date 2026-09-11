"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { CONTRACT_ADDRESS } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function ContractAddress() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="contract" className="relative px-5 py-20">
      <Reveal className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow mb-5">Verified on-chain</span>
          <h2 className="mb-5 text-3xl font-extrabold md:text-5xl">
            <span className="text-gold-shimmer">CONTRACT ADDRESS</span>
          </h2>
          <p className="mb-10 max-w-2xl text-base text-white/70 md:text-xl">
            Get a clear and detailed overview of{" "}
            <span className="font-semibold text-gold">BEEZCHAIN</span>{" "}
            Token&rsquo;s supply, allocation, and distribution strategy.
          </p>
        </div>

        {/* Glass panel with the address + copy button */}
        <div className="relative overflow-hidden rounded-3xl glass-gold p-8 md:p-12">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/20 blur-3xl"
          />
          <div className="relative flex flex-col items-center gap-6">
            <div className="flex w-full items-center gap-3 rounded-2xl border border-gold/30 bg-black/70 p-4 md:p-5">
              <span className="hidden shrink-0 rounded-lg bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gold sm:block">
                BZC
              </span>
              <p className="flex-1 break-all text-center font-mono text-sm text-gold md:text-lg">
                {CONTRACT_ADDRESS}
              </p>
            </div>
            <button
              onClick={copy}
              className="btn-gold shine inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold"
            >
              {copied ? (
                <>
                  <Check size={18} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={18} /> Copy Address
                </>
              )}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
