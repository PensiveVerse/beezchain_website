# BeezChain — Official Website

Marketing + launch site for **BeezChain (BZC)**, a Solana-based blockchain platform.
A single-page, dark-and-gold experience with modern motion design: an animated hero,
an interactive tokenomics chart, a sticky-stacking roadmap, a custom cursor, and an
on-chain **Buy/Swap widget** with a **live price** feed.

## ✨ Features

- **Animated hero** — kinetic headline reveal, floating BZC coin with orbit rings,
  glass info cards, live badge, and animated stat counters. Sized to fit the
  viewport (no scroll needed to see the full section).
- **Buy/Swap widget** — an animated modal (backdrop blur, scroll-lock,
  Esc-to-close) that embeds the **Jupiter** swap terminal for USDC → BZC. Handles
  wallet connection itself (Phantom/Solflare) with no wallet-adapter bloat. Opened
  from any "Buy Token" CTA via a decoupled event trigger. Shows a clean
  "coming soon" state until the token mint address is configured.
- **Live price feed** — a market section that pulls real-time price, 24h change,
  liquidity, volume, and market cap from the **DexScreener** API (auto-refreshing
  every 30s), with a "coming soon" placeholder pre-launch.
- **Interactive tokenomics** — an animated SVG donut chart built from the real
  distribution data, with hover-to-highlight slices, a synced legend, and the BZC
  coin at its centre.
- **Sticky-stacking roadmap** — quarter cards that pin and stack as you scroll,
  with phase tags and status badges.
- **Smooth custom cursor** — a precise dot plus a spring-trailing ring that reacts
  to interactive elements (auto-disabled on touch devices).
- **Ambient polish** — aurora gradient background, film grain, glassmorphism,
  scroll progress bar, partner marquee, animated FAQ accordion, and a back-to-top
  button.
- **Accessible motion** — heavy decorative animations respect
  `prefers-reduced-motion`.

## 🧱 Tech Stack

| Area        | Choice                                  |
| ----------- | --------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI runtime  | React 19                                |
| Styling     | Tailwind CSS v4                         |
| Animation   | Framer Motion 13                        |
| Icons       | lucide-react                            |
| Language    | TypeScript                              |
| Font        | Montserrat (`next/font`)                |

## 🚀 Getting Started

Requirements: **Node.js 18.18+** (or 20+) and npm.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:3000)
npm run dev

# production build + run
npm run build
npm start

# lint
npm run lint
```

## 📁 Project Structure

```
src/
├─ app/
│  ├─ layout.tsx        # root layout, fonts, metadata
│  ├─ page.tsx          # composes all sections
│  └─ globals.css       # design system: tokens, aurora, glass, animations
├─ components/
│  ├─ Navbar.tsx        # glass nav that condenses on scroll
│  ├─ Hero.tsx          # animated hero
│  ├─ About.tsx         # parallax intro + feature cards
│  ├─ UseCases.tsx      # 3D tilt cards
│  ├─ Tokenomics.tsx    # interactive donut + stats
│  ├─ LivePrice.tsx     # DexScreener-powered live market section
│  ├─ Roadmap.tsx       # sticky-stacking timeline
│  ├─ Partners.tsx      # logo marquee
│  ├─ ContractAddress.tsx
│  ├─ FAQ.tsx
│  ├─ Footer.tsx
│  ├─ Reveal.tsx        # scroll-reveal wrapper
│  ├─ swap/
│  │  └─ SwapModal.tsx  # Jupiter-based Buy/Swap modal
│  └─ ui/               # shared primitives
│     ├─ Background.tsx      # aurora + grain
│     ├─ ScrollProgress.tsx
│     ├─ Counter.tsx         # count-up-on-view numbers
│     ├─ CustomCursor.tsx
│     ├─ TiltCard.tsx
│     ├─ Honeycomb.tsx
│     ├─ HeroVisual.tsx      # floating coin + orbit rings
│     ├─ DonutChart.tsx      # interactive tokenomics chart
│     └─ BackToTop.tsx
└─ lib/
   ├─ data.ts           # all site copy/content (nav, use cases, tokenomics, roadmap, FAQ…)
   ├─ token.ts          # BZC token config: mint address, decimals, supply, links
   └─ swap.ts           # decoupled event trigger to open the swap modal

public/
└─ token/
   └─ bzc-metadata.json # on-chain (Metaplex) token metadata: name, symbol, logo…
```

Most editable content (headings, links, roadmap, FAQ, contract address, token
stats) lives in `src/lib/data.ts`.

## 🪙 Going live (swap + price)

The Buy/Swap widget and Live Price section ship in a **"coming soon"** state until
the token exists on-chain. To activate them:

1. Create the BZC token on Solana (see `PHASE1_CREATE_TOKEN.md`).
2. Paste the verified mint address into `src/lib/token.ts` → `mintAddress`.
3. That flips `IS_TOKEN_LIVE` to `true` — the swap loads the real Jupiter terminal
   and the price section starts pulling live DexScreener data. No other code changes.

If Jupiter bumps its terminal version, update the one `JUPITER_SCRIPT` constant at
the top of `src/components/swap/SwapModal.tsx`.

## 📚 Launch docs

Planning and launch runbooks live at the repo root:

- `LAUNCH_PLAN.md` — full Solana-first launch strategy (all phases)
- `PHASE1_CREATE_TOKEN.md` — step-by-step token creation on Solana
- `PHASE2_WALLET_ALLOCATION.md` + `bzc-allocation.csv` — wallet split & vesting
- `WHITEPAPER.md` — project whitepaper draft

## 🎨 Brand

- Background: `#000000`
- Gold: `#ffcc00` (light `#ffd60d`, dark `#dba81d`)
- Font: Montserrat

## 📦 Deployment

Deploys cleanly to any Node host or [Vercel](https://vercel.com). Build with
`npm run build`; no environment variables are required.
