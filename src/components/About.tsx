"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BrainCircuit, ShieldCheck, Network } from "lucide-react";
import Reveal from "@/components/Reveal";

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI-Powered",
    text: "Intelligent automation driven by a GPT-style model baked into the chain.",
  },
  {
    icon: Network,
    title: "Decentralized Ledger",
    text: "A distributed, tamper-proof ledger for managing digital assets at scale.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    text: "Cryptographically secured data with trustless, verifiable transactions.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Parallax: the backdrop drifts slower than the page for depth.
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="about" className="relative bg-black">
      <div ref={ref} className="relative h-[36rem] overflow-hidden md:h-[50rem]">
        {/* Full-bleed rays + coin composite, parallaxed */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
          <Image
            src="/images/aboutbg.webp"
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className="h-full w-full object-cover opacity-60 md:opacity-100"
          />
        </motion.div>

        {/* Top + bottom fades blend the section into the black page. */}
        <div className="absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[3] h-[120px] bg-gradient-to-t from-black to-transparent" />

        {/* Text: vertically centred, left-aligned */}
        <div className="relative z-10 flex h-full items-center px-5 md:px-28">
          <Reveal className="flex max-w-[38rem] flex-col">
            <span className="eyebrow mb-6 w-fit">Who we are</span>
            <h2 className="mb-8 text-5xl font-extrabold md:text-7xl">
              <span className="text-gold-shimmer">ABOUT US</span>
            </h2>
            <p className="text-base leading-relaxed text-white/90 md:text-xl">
              A next-gen solution combining decentralized ledger technology with
              AI-powered features. It&rsquo;s built to manage digital assets,
              secure data, and support intelligent automation through a GPT-style
              model.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Feature highlight cards */}
      <div className="relative z-10 mx-auto -mt-10 grid max-w-6xl grid-cols-1 gap-6 px-5 pb-20 md:grid-cols-3 md:px-10">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1}>
            <div className="group h-full rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_20px_60px_-20px_rgba(255,204,0,0.35)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/30 transition-transform duration-300 group-hover:scale-110">
                <f.icon size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
