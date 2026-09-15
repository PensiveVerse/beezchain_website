"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Honeycomb from "@/components/ui/Honeycomb";
import Counter from "@/components/ui/Counter";
import HeroVisual from "@/components/ui/HeroVisual";
import { openSwap } from "@/lib/swap";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const HERO_STATS = [
  { value: 10.08, suffix: " B", decimals: 2, label: "Total Supply" },
  { value: 6, suffix: "", decimals: 0, label: "Strategic Partners" },
  { value: 9, suffix: "", decimals: 0, label: "Token Decimals" },
];

export default function Hero() {
  return (
    <section id="home" className="relative px-3 pt-24 md:px-10 md:pt-28">
      <div className="relative mx-auto max-w-[1600px]">
        <div
          className="relative flex min-h-[calc(100dvh-6.5rem)] flex-col justify-center overflow-hidden rounded-[28px] px-6 py-8 shadow-[0_50px_140px_-40px_rgba(255,204,0,0.55)] ring-1 ring-white/20 md:min-h-[calc(100dvh-7rem)] md:px-16 md:py-8"
          style={{
            background:
              "radial-gradient(120% 130% at 20% 15%, #ffe70a 0%, #ffdb06 45%, #ffcf00 100%)",
          }}
        >
          {/* Floating amber-blob animation (video) filling the yellow panel.
              Compressed 720p WebM (with MP4 fallback) — tiny, decorative, and
              the gold gradient below serves as the instant fallback. */}
          <video
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/hero-bubbles.webm" type="video/webm" />
            <source src="/hero-bubbles.mp4" type="video/mp4" />
          </video>

          {/* Floating honeycomb cells — a nod to the "Beez" brand. */}
          <Honeycomb />

          {/* Soft inner vignette to seat the text on the gold field. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 90% at 15% 40%, rgba(0,0,0,0.18), transparent 60%)",
            }}
          />

          {/* content grid: copy on the left, coin visual on the right */}
          <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex max-w-[52rem] flex-col gap-3 text-left"
          >
            <motion.span
              variants={item}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-black/20 bg-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-black backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
              </span>
              Built on Solana • Live Now
            </motion.span>

            <motion.h2
              variants={item}
              className="max-w-[48rem] text-3xl font-extrabold leading-[1.1] text-black sm:text-4xl md:text-5xl"
            >
              Transactions for today&rsquo;s Global Economy
            </motion.h2>

            <motion.h1
              variants={item}
              className="text-5xl font-extrabold leading-none text-white sm:text-7xl md:text-[6rem]"
              style={{ WebkitTextStroke: "2px rgba(120,80,0,0.35)" }}
            >
              BeezChain
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-[40rem] text-sm text-black/80 md:text-base"
            >
              BeezChain Crypto is a blockchain-based platform that rewards users
              with crypto for engaging in physical activity, especially walking
              and running.
            </motion.p>

            <motion.div variants={item} className="mt-1 flex flex-wrap gap-4">
              {/* Buy Token: black fill, metallic gradient border, shine sweep */}
              <button
                type="button"
                onClick={openSwap}
                className="border-gradient rounded-xl transition-transform duration-200 hover:scale-95"
              >
                <span className="shine flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-2.5 text-base font-medium text-white">
                  Buy Token
                  <ArrowRight size={18} />
                </span>
              </button>
              {/* Whitepaper: same metallic gradient border as Buy Token,
                  gold fill to keep it as the secondary action. */}
              <a
                href="https://beezchain.gitbook.io/beezchain-docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-gradient rounded-xl transition-transform duration-200 hover:scale-95"
              >
                <span className="shine flex items-center justify-center gap-2 rounded-xl bg-[#FFD60D] px-6 py-2.5 text-base font-medium text-black">
                  <FileText size={18} />
                  Whitepaper
                </span>
              </a>
            </motion.div>

            {/* Trust / stat strip */}
            <motion.div
              variants={item}
              className="mt-3 flex flex-wrap gap-8 border-t border-black/15 pt-4"
            >
              {HERO_STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-xl font-extrabold text-black md:text-2xl">
                    <Counter
                      to={s.value}
                      decimals={s.decimals}
                      suffix={s.suffix}
                    />
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-black/60">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

            {/* Right: floating coin visual (desktop only) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex"
            >
              <HeroVisual />
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 md:block"
          >
            <div className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-black/40 p-1">
              <motion.span
                className="h-2 w-1 rounded-full bg-black/60"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
