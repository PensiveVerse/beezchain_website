"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section className="relative px-5 pb-24 pt-10 md:px-10 lg:px-20">
      <Reveal className="flex flex-col items-center">
        <span className="eyebrow mb-5">Got questions?</span>
        <h2 className="mb-14 text-center text-4xl font-bold md:text-6xl">
          <span className="text-gold-shimmer">FAQ&rsquo;s</span>
        </h2>
      </Reveal>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 lg:flex-row lg:items-start">
        {/* accordion */}
        <div className="w-full flex-1 lg:w-[60%]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className={`mb-5 overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-gold/60 bg-gold/[0.04]"
                      : "border-white/10 bg-white/[0.02] hover:border-gold/30"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="flex items-center gap-4 text-base md:text-xl">
                      <strong className="text-gold">Q{i + 1}</strong>
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gold transition-all duration-300 ${
                        isOpen ? "rotate-180 bg-gold/15" : "bg-white/5"
                      }`}
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-white/70 md:text-base">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* graphic */}
        <Reveal className="hidden w-full md:block lg:w-[40%]">
          <div className="relative flex justify-center">
            <div
              aria-hidden
              className="absolute top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl"
            />
            <Image
              src="/images/faq.webp"
              alt="FAQ"
              width={452}
              height={614}
              className="relative w-64 animate-float object-contain"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
