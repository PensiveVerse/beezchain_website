// The live landing page is the self-contained v12 design bundle in
// /public/site, served at "/" via the `beforeFiles` rewrite in next.config.ts.
// That rewrite always intercepts "/" before this route is reached, so this
// component only exists to keep the app router valid and acts as a fallback.
//
// Launch-code kept for the liquidity phase (not wired here yet):
//   src/components/LivePrice.tsx, src/components/swap/SwapModal.tsx,
//   src/lib/swap.ts, src/lib/token.ts
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/site/index.html");
}
