import Image from "next/image";
import { PARTNERS } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Partners() {
  // duplicate the set so the marquee loops seamlessly
  const row = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <section className="relative bg-black py-10">
      <Reveal className="flex flex-col items-center">
        <span className="eyebrow mb-5">Trusted by the ecosystem</span>
        <h2 className="mb-10 text-center text-3xl font-bold md:text-6xl">
          <span className="text-gold-shimmer">STRATEGIC PARTNERS</span>
        </h2>
      </Reveal>

      <div className="marquee-mask marquee-fade w-full overflow-hidden border-y border-gold/30 bg-white/[0.02] py-8">
        <div className="animate-marquee flex w-max items-center gap-[60px]">
          {row.map((p, i) => (
            <Image
              key={`${p.name}-${i}`}
              src={p.logo}
              alt={p.name}
              width={240}
              height={64}
              className="h-14 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
