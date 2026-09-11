"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Condense + frost the bar once the user scrolls past the hero lip.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-0 z-50 w-full max-w-[1600px] -translate-x-1/2"
    >
      <nav
        className={`mx-3 flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 md:mx-6 md:px-6 ${
          scrolled
            ? "mt-3 glass shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)]"
            : "mt-5 bg-transparent"
        }`}
      >
        {/* Left group: logo + links */}
        <div className="flex items-center gap-8 lg:gap-14">
          <a href="#home" className="flex items-center">
            <span className="inline-block rounded-md bg-gold p-1.5 transition-transform duration-200 hover:scale-105">
              <Image
                src="/images/logo.webp"
                alt="BeezChain Technology"
                width={1142}
                height={382}
                priority
                className="h-auto w-32 rounded md:w-40"
              />
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.label} className="group relative">
                <a
                  href={l.href}
                  className="font-outfit text-base font-normal text-white/90 transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
                {/* animated underline grows from the left on hover */}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded bg-gold transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop CTA (gradient-bordered, gold glow) */}
        <a
          href="#tokenomics"
          className="border-gradient hidden rounded-xl transition-transform duration-200 hover:scale-95 lg:block"
        >
          <span className="shine flex items-center justify-center rounded-xl bg-black px-5 py-2 text-base font-medium text-white hover:shadow-[0_0_24px_-6px_rgba(255,204,0,0.7)]">
            Buy Token
          </span>
        </a>

        {/* Mobile: CTA + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="#tokenomics"
            className="border-gradient rounded-xl transition-transform duration-200 hover:scale-95"
          >
            <span className="flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white">
              Buy Token
            </span>
          </a>
          <button
            aria-label="Open main menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gold"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-2 overflow-hidden rounded-2xl glass-gold px-6 py-5 lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-outfit text-base font-normal text-white hover:text-gold"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
