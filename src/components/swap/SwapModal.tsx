"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Wallet } from "lucide-react";
import { BZC, IS_TOKEN_LIVE } from "@/lib/token";
import { OPEN_SWAP_EVENT } from "@/lib/swap";

// Jupiter Terminal is injected on window at runtime by its CDN script.
// It manages its OWN wallet connection (Phantom/Solflare/etc.), so we do not
// need @solana/wallet-adapter in the bundle.
declare global {
  interface Window {
    Jupiter?: {
      init: (opts: Record<string, unknown>) => void;
      resume?: () => void;
      close?: () => void;
    };
  }
}

// Jupiter Terminal script. If Jupiter bumps the version, update this one line.
const JUPITER_SCRIPT = "https://terminal.jup.ag/main-v4.js";
const TARGET_ID = "bzc-jupiter-terminal";

export default function SwapModal() {
  const [open, setOpen] = useState(false);
  const initialized = useRef(false);

  // Open when any "Buy" button fires the event.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_SWAP_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SWAP_EVENT, onOpen);
  }, []);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Load + initialise Jupiter Terminal only when the token is live and the
  // modal first opens. Runs once.
  const bootJupiter = useCallback(() => {
    if (!IS_TOKEN_LIVE || initialized.current) return;

    const start = () => {
      if (!window.Jupiter) return;
      window.Jupiter.init({
        displayMode: "integrated",
        integratedTargetId: TARGET_ID,
        endpoint: "https://api.mainnet-beta.solana.com",
        formProps: {
          initialInputMint: BZC.quoteMint, // USDC in
          initialOutputMint: BZC.mintAddress, // BZC out
        },
      });
      initialized.current = true;
    };

    if (window.Jupiter) {
      start();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${JUPITER_SCRIPT}"]`,
    );
    if (existing) {
      existing.addEventListener("load", start, { once: true });
      return;
    }

    const s = document.createElement("script");
    s.src = JUPITER_SCRIPT;
    s.async = true;
    s.onload = start;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (open) bootJupiter();
  }, [open, bootJupiter]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[101] w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0b] shadow-[0_40px_120px_-30px_rgba(255,204,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gold text-black">
                  <Wallet size={16} />
                </span>
                <h3 className="text-base font-semibold text-white">
                  Buy {BZC.symbol}
                </h3>
              </div>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {IS_TOKEN_LIVE ? (
                // Jupiter Terminal mounts here once the token is live.
                <div id={TARGET_ID} className="min-h-[520px] w-full" />
              ) : (
                <ComingSoon />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Shown until BZC.mintAddress is filled in (Phase 1 complete + pool live).
function ComingSoon() {
  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
        Swap coming soon
      </span>
      <p className="max-w-xs text-sm leading-relaxed text-white/70">
        {BZC.name} ({BZC.symbol}) is launching on Solana. On-site swapping opens
        the moment the token goes live and liquidity is added on Raydium.
      </p>

      <div className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left text-sm">
        <Row label="Token" value={BZC.name} />
        <Row label="Symbol" value={BZC.symbol} />
        <Row label="Network" value="Solana (SPL)" />
        <Row label="Decimals" value={String(BZC.decimals)} />
        <Row
          label="Supply"
          value={BZC.totalSupply.toLocaleString("en-US")}
        />
      </div>

      <a
        href="https://jup.ag"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
      >
        Learn how swapping works on Jupiter
        <ExternalLink size={14} />
      </a>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-white/50">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
