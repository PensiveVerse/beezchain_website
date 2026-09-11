import Image from "next/image";
import { USE_CASES } from "@/lib/data";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/ui/TiltCard";

export default function UseCases() {
  return (
    <section className="relative bg-black px-4 py-20 text-white">
      <Reveal className="flex flex-col items-center">
        <span className="eyebrow mb-5">What you can build</span>
        <h2 className="mb-4 text-center text-4xl font-extrabold md:text-7xl">
          <span className="text-gold-shimmer">USE CASES</span>
        </h2>
        <p className="mb-16 max-w-2xl text-center text-sm text-white/60 md:text-base">
          Real-world applications powered by BeezChain&rsquo;s decentralized,
          AI-ready infrastructure.
        </p>
      </Reveal>

      <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-14 md:grid-cols-2">
        {USE_CASES.map((uc, i) => (
          <Reveal key={uc.title} delay={(i % 2) * 0.12} className="w-full">
            <TiltCard className="group mx-auto h-full w-fit">
              {/* 1px gold edge: gold-filled outer, black inner, both chamfered */}
              <div className="clip-corner bg-gradient-to-br from-gold via-gold-dark to-gold/30 p-[1.5px] transition-all duration-300 group-hover:from-gold-light group-hover:to-gold">
                <div className="clip-corner relative h-full max-w-[29rem] overflow-hidden bg-[#070707] px-7 py-10">
                  {/* light-beam glow baked into the card background */}
                  <Image
                    src="/images/ucbg.webp"
                    alt=""
                    fill
                    className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="relative z-10 [transform:translateZ(40px)]">
                    <div className="mb-5 mt-8 inline-flex rounded-2xl bg-gold/10 p-3 ring-1 ring-gold/25 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={uc.icon}
                        alt={uc.title}
                        width={128}
                        height={128}
                        className="h-20 w-20 object-contain"
                      />
                    </div>
                    <h3 className="mb-4 text-xl font-semibold text-gold">
                      {uc.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/80">
                      {uc.text}
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
