# BeezChain — Official Website

Marketing website for **BeezChain (BZC)**, a Solana-based blockchain platform. A
single-page, dark-and-gold experience with modern motion design: an animated hero,
an interactive tokenomics chart, a sticky-stacking roadmap, and a custom cursor.

## ✨ Features

- **Animated hero** — kinetic headline reveal, floating BZC coin with orbit rings,
  glass info cards, live badge, and animated stat counters. Sized to fit the
  viewport (no scroll needed to see the full section).
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
│  ├─ Roadmap.tsx       # sticky-stacking timeline
│  ├─ Partners.tsx      # logo marquee
│  ├─ ContractAddress.tsx
│  ├─ FAQ.tsx
│  ├─ Footer.tsx
│  ├─ Reveal.tsx        # scroll-reveal wrapper
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
   └─ data.ts           # all site copy/content (nav, use cases, tokenomics, roadmap, FAQ…)
```

Most editable content (headings, links, roadmap, FAQ, contract address, token
stats) lives in `src/lib/data.ts`.

## 🎨 Brand

- Background: `#000000`
- Gold: `#ffcc00` (light `#ffd60d`, dark `#dba81d`)
- Font: Montserrat

## 📦 Deployment

Deploys cleanly to any Node host or [Vercel](https://vercel.com). Build with
`npm run build`; no environment variables are required.
