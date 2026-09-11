import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import UseCases from "@/components/UseCases";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import Partners from "@/components/Partners";
import ContractAddress from "@/components/ContractAddress";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Background from "@/components/ui/Background";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Ambient aurora + grain behind everything, and a scroll progress bar. */}
      <Background />
      <ScrollProgress />

      {/* Whole site is a centred column capped at 1600px, matching the source.
          NOTE: no overflow-x-hidden here — it would create a scroll container
          and break the Roadmap's position:sticky stacking. */}
      <div className="relative z-[2] mx-auto max-w-[1600px]">
        <Navbar />
        <Hero />
        <About />
        <UseCases />
        <Tokenomics />
        <Roadmap />
        <Partners />
        <ContractAddress />
        <FAQ />
        <Footer />
      </div>
      <BackToTop />
      <CustomCursor />
    </main>
  );
}
