# BeezChain — Official Website

Marketing + launch site for **BeezChain (BZC)**, a Solana-based blockchain platform.
A single-page, dark-and-gold experience with modern motion design: an animated hero,
an interactive tokenomics chart, an **on-chain transparency** section, a real **3D**
FAQ mark, a sticky-stacking roadmap, and an on-chain **Buy/Swap widget** with a
**live price** feed.

## 🪙 Token status (on-chain)

- **Live on Solana** — mint `8xzLg1tyhw1A9tsvVo9nFC9XbvBeHrtvWddtLiu2yp8E`
- **Supply:** 10,800,000,000 BZC (fixed · 9 decimals · mint authority **revoked**)
- **Distributed** across 6 public wallets (see the Transparency section + `PHASE2_WALLET_ALLOCATION.md`)
- **Team tokens locked** — 12-month cliff + 24-month linear vesting (Jupiter Lock, non-cancellable)
- **Liquidity (Raydium) pending** — the swap + live-price sections go live once liquidity
  exists and the mint address is set in `src/lib/token.ts` → `mintAddress` (see *Going live*).

## ✨ Features

- **Animated hero** — kinetic headline reveal, floating BZC coin with orbit rings,
  glass info cards, live badge, and animated stat counters.
- **Buy/Swap widget** — an animated modal (backdrop blur, scroll-lock, Esc-to-close)
  that embeds the **Jupiter** swap terminal for USDC → BZC. Handles wallet connection
  itself (Phantom/Solflare) with no wallet-adapter bloat. Shows a clean "coming soon"
  state until the mint address is configured.
- **Live price feed** — a market section pulling real-time price, 24h change,
  liquidity, volume, and market cap from the **DexScreener** API (auto-refresh 30s).
- **On-chain transparency** — the official contract + all 6 distribution wallets with
  copy buttons and Solscan links, plus trust badges (fixed supply, mint revoked,
  team locked).
- **Interactive tokenomics** — an animated SVG donut chart from the real distribution
  data, with hover-to-highlight slices and a synced legend.
- **Real 3D FAQ mark** — an extruded, glossy question mark (Three.js / react-three-fiber)
  that revolves 360° and can be dragged to spin.
- **Sticky-stacking roadmap** — quarter cards that pin and stack as you scroll.
- **Smooth custom cursor**, aurora background, film grain, glassmorphism, scroll
  progress bar, partner marquee, animated FAQ accordion, back-to-top.
- **Accessible motion** — heavy decorative animations respect `prefers-reduced-motion`.

## 🧱 Tech Stack

| Area        | Choice                                  |
| ----------- | --------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI runtime  | React 19                                |
| Styling     | Tailwind CSS v4                         |
| Animation   | Framer Motion                           |
| 3D          | Three.js · @react-three/fiber · @react-three/drei |
| Icons       | lucide-react                            |
| Language    | TypeScript                              |
| Font        | Montserrat (`next/font`)                |

## 🚀 Getting Started

Requirements: **Node.js 18.18+** (or 20+) and npm.

```bash
npm install
npm run dev     # dev server (http://localhost:3000, or next free port)
npm run build   # production build
npm start       # run the build
npm run lint
```

## 📁 Project Structure

```
src/
├─ app/
│  ├─ layout.tsx            # root layout, fonts, SEO/OG metadata
│  ├─ page.tsx              # composes all sections
│  ├─ globals.css           # design system: tokens, aurora, glass, animations
│  ├─ favicon.ico / icon.svg / apple-icon.png   # BZC logo favicons
│  └─ opengraph-image.tsx / twitter-image.tsx    # generated social cards
├─ components/
│  ├─ Navbar.tsx            # glass nav that condenses on scroll
│  ├─ Hero.tsx  About.tsx  UseCases.tsx
│  ├─ Tokenomics.tsx        # interactive donut + stats
│  ├─ Transparency.tsx      # on-chain wallets + trust badges
│  ├─ LivePrice.tsx         # DexScreener-powered live market section
│  ├─ Roadmap.tsx  Partners.tsx  ContractAddress.tsx  FAQ.tsx  Footer.tsx
│  ├─ Reveal.tsx            # scroll-reveal wrapper
│  ├─ swap/SwapModal.tsx    # Jupiter-based Buy/Swap modal
│  └─ ui/                   # shared primitives (cursor, counter, donut,
│                           #   HeroVisual, Question3D [3D FAQ mark], …)
└─ lib/
   ├─ data.ts               # site copy + distribution wallets + lock link
   ├─ token.ts              # BZC token config: mint address, decimals, supply, links
   └─ swap.ts               # decoupled event trigger to open the swap modal

public/
├─ token/                   # bzc-logo.png / .svg + bzc-metadata.json (on-chain metadata)
├─ fonts/                   # 3D typeface for the FAQ mark
└─ images/                  # section art + coin
```

Most editable content (headings, links, roadmap, FAQ, contract address, token
stats, distribution wallets) lives in `src/lib/data.ts`.

## 🪙 Going live (swap + price)

The token already exists on-chain (address above). The Buy/Swap widget and Live
Price section stay in a **"coming soon"** state until **liquidity** is added. To flip
them live after the Raydium pool exists:

1. Set `src/lib/token.ts` → `mintAddress` to `8xzLg1tyhw1A9tsvVo9nFC9XbvBeHrtvWddtLiu2yp8E`.
2. That flips `IS_TOKEN_LIVE` to `true` — the swap loads the live Jupiter terminal and
   the price section starts pulling DexScreener data. No other code changes.
3. Paste the public **Jupiter Lock** link into `data.ts` → `TEAM_LOCK_LINK` so the
   Transparency section links straight to the team-lock proof.

> If Jupiter bumps its terminal version, update the `JUPITER_SCRIPT` constant at the
> top of `src/components/swap/SwapModal.tsx`.

## 📚 Project docs (repo root)

- `LAUNCH_PLAN.md` — overall Solana-first launch strategy
- `PHASE2_WALLET_ALLOCATION.md` + `bzc-allocation.csv` — wallet split, vesting, on-chain addresses
- `WHITEPAPER.md` — project whitepaper draft
- `MARKETING/LAUNCH_CONTENT.md` — launch & airdrop content pack

## 🎨 Brand

- Background: `#000000`
- Gold: `#ffcc00` (light `#ffd60d`, dark `#dba81d`)
- Font: Montserrat

## 📦 Deployment

Deploys cleanly to any Node host or [Vercel](https://vercel.com). Build with
`npm run build`; no environment variables are required.
