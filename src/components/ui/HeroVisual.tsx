"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, TrendingUp, ShieldCheck } from "lucide-react";

/** A small dot riding on an orbit ring. */
function OrbitDot({ className }: { className?: string }) {
  return (
    <span
      className={`absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-black/70 shadow-[0_0_12px_rgba(0,0,0,0.5)] ${className ?? ""}`}
    />
  );
}

/**
 * Hero right-hand visual: the BeezChain coin floating inside two counter-
 * rotating orbit rings, framed by a dark glow so it pops on the gold panel,
 * with a couple of floating glass info cards for depth.
 */
export default function HeroVisual() {
  return (
    <div className="relative flex h-[30rem] w-full items-center justify-center">
      {/* dark radial glow so the gold coin reads on the gold panel */}
      <div className="absolute h-[24rem] w-[24rem] rounded-full bg-black/25 blur-3xl" />

      {/* outer orbit ring (clockwise) */}
      <motion.div
        className="absolute h-[27rem] w-[27rem] rounded-full border border-dashed border-black/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        <OrbitDot />
      </motion.div>

      {/* inner orbit ring (counter-clockwise) */}
      <motion.div
        className="absolute h-[20rem] w-[20rem] rounded-full border border-black/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        <OrbitDot className="bg-white/70" />
      </motion.div>

      {/* the coin, gently floating */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/coin.webp"
          alt="BeezChain BZC coin"
          width={320}
          height={320}
          sizes="256px"
          className="w-64 drop-shadow-[0_20px_40px_rgba(120,80,0,0.45)]"
        />
      </motion.div>

      {/* floating glass card — top right */}
      <motion.div
        className="absolute right-2 top-6 flex items-center gap-2 rounded-2xl border border-white/20 bg-black/50 px-4 py-3 backdrop-blur-md"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/20 text-gold">
          <Zap size={18} />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-bold text-white">Low Fees</div>
          <div className="text-[11px] text-white/60">Solana speed</div>
        </div>
      </motion.div>

      {/* floating glass card — bottom left */}
      <motion.div
        className="absolute bottom-8 left-0 flex items-center gap-2 rounded-2xl border border-white/20 bg-black/50 px-4 py-3 backdrop-blur-md"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/20 text-gold">
          <TrendingUp size={18} />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-bold text-white">10.08B</div>
          <div className="text-[11px] text-white/60">Total supply</div>
        </div>
      </motion.div>

      {/* floating glass badge — mid right */}
      <motion.div
        className="absolute -right-1 bottom-24 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 backdrop-blur-md"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <ShieldCheck size={14} className="text-gold" />
        <span className="text-[11px] font-semibold text-white">Audited</span>
      </motion.div>
    </div>
  );
}
