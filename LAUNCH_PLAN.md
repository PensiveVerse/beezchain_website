# 🍯 BeezChain (BZC) Launch Plan — Solana First, Bridge Later

> **Strategy chosen:** Launch BZC as a token on **Solana** first. Once the community
> and trading are healthy, **bridge** BZC to other chains (BSC, Ethereum) to become
> multi-chain. Build your own blockchain (Layer-1) only much later, if you get big.
>
> This document is written in plain, simple words. Read it top to bottom.
> Each phase says **what to do**, **where to do it**, and **why**.

---

## 📖 Quick vocabulary (read this once)

| Word | Simple meaning |
|------|----------------|
| **Token / Coin** | Your money, "BZC", living on a blockchain. |
| **Solana** | The blockchain (network) you launch on first. Fast + cheap. |
| **SPL token** | The name for a token made on Solana. |
| **Wallet** | An app that holds your coins & keys (e.g. **Phantom**). |
| **Mint** | The "factory" that creates your token. |
| **Mint authority** | Permission to make more coins. You will **turn this off** for trust. |
| **Liquidity pool** | A shared money pot (BZC + USDC) that lets people swap. |
| **Swap / Swapbook** | Buying/selling BZC against the pool. On Solana = **Raydium**. |
| **Orderbook** | Stock-market style buy/sell matching. Advanced. Later. |
| **Bridge** | A tool that copies your token to another blockchain. |
| **Vesting / Lock** | Coins frozen for a time so you can't dump them. Builds trust. |
| **Rug pull** | A scam where the team steals the liquidity. We avoid this by **locking**. |
| **Solscan** | The website to view anything on Solana (like Google for the chain). |

---

## 🗺️ The whole journey at a glance

```
PHASE 0  Prepare            → fix website, decide facts, get wallet + SOL
PHASE 1  Create token       → make BZC on Solana, lock the supply
PHASE 2  Distribute safely  → split into wallets, lock team tokens
PHASE 3  Swapbook (Raydium) → add liquidity so people can BUY/SELL
PHASE 4  Website widget     → wallet connect + buy/swap on your own site
PHASE 5  Get listed         → CoinGecko, CoinMarketCap, DexScreener
PHASE 6  Grow community     → airdrops, staking, marketing
PHASE 7  Orderbook (option) → advanced, only when volume is real
PHASE 8  Bridge to others   → BSC + Ethereum = "multi-chain"
PHASE 9  Own Layer-1 (dream)→ build BeezChain network itself, if huge
```

You are at the very start. Do the phases **in order**. Don't skip.

---

## ✅ PHASE 0 — Prepare (Week 1)

**Goal:** Get your facts and tools ready before touching the blockchain.

### 0.1 Fix the contradiction on your website
Your site right now says two different things. This confuses investors and looks
unprofessional. Pick the **Solana** facts and fix the rest:

- ❌ FAQ currently says: "BEP-20", "PancakeSwap", "max supply 1 billion".
- ✅ Should say: "Solana (SPL)", "Raydium / Jupiter", "supply 10.08 Billion".
- File to edit: `src/lib/data.ts` (the `FAQS` array + `TOKEN_STATS`).

> 💡 Ask Claude to do this edit for you — it's a 5-minute change.

### 0.2 Lock your token facts (never change these again)
- **Name:** BeezChain
- **Symbol:** BZC
- **Decimals:** 9
- **Total supply:** 10,080,000,000 (10.08 B)
- **Distribution (from your Tokenomics):**
  - Investors 25%
  - Community 25%
  - Staking & Rewards 20%
  - Gaming & Forex Incentive 10%
  - Tech Reserve 10%
  - Team & Advisors 10%

### 0.3 Get your tools
- [ ] Install **Phantom wallet** (browser extension) → https://phantom.app
- [ ] Buy about **$30–50 of SOL** (from any exchange) and send it to Phantom.
      This pays the tiny network fees.
- [ ] Create a **logo image** for BZC (a square PNG, e.g. 512×512).
- [ ] Write a simple **Whitepaper** (PDF): what BZC is, tokenomics, roadmap.
      Investors always ask for this.

**End of Phase 0:** clean website facts + wallet with SOL + logo + whitepaper.

---

## ✅ PHASE 1 — Create the token (Week 1–2)

**Goal:** Make BZC exist for real on Solana. This is "launching your currency."

### Choose your method
- **Easy (no code):** use a Solana token-creator tool or **Metaplex** — fill a
  form (name, symbol, supply, logo) and click create. Costs a few dollars in SOL.
- **Developer way:** use the **`spl-token` command-line tool** for full control.

### The steps (plain words)
1. **Create the mint** (the token factory) with **9 decimals**.
2. **Mint 10.08 B** BZC into your wallet.
3. **Add metadata** (name, symbol, logo) using **Metaplex** so wallets show it nicely.
4. **Revoke the mint authority** → now nobody, not even you, can print more coins.
   *This is critical.* Investors check this on Solscan before trusting you.
5. (Optional) **Revoke freeze authority** too, so you can't freeze people's coins.

### Verify
- Open **Solscan** (https://solscan.io), paste your token address.
- Confirm: name, symbol, supply = 10.08B, mint authority = disabled. ✅

> ⚠️ The address already in your code (`8xzLg1...yp8E`): check it on Solscan.
> Only advertise it once it's confirmed real, correct, and locked.

**End of Phase 1:** a real BZC token with a fixed, locked supply on Solana.

---

## ✅ PHASE 2 — Distribute the tokens safely (Week 2)

**Goal:** Don't keep 100% in one wallet. Split it and lock the sensitive parts.

1. Create **separate wallets** for each purpose:
   - Investors wallet, Community/Airdrop wallet, Staking wallet, Team wallet,
     Tech Reserve wallet, Gaming/Forex wallet.
2. Move the right **percentage** into each (see Phase 0.2 numbers).
3. **Lock / vest** the **Team & Advisors (10%)** tokens using a token locker so
   they release slowly over time. This proves you won't dump and run.
4. Keep a public note (on your site or docs) of **which wallet holds what**.
   Transparency = trust.

**End of Phase 2:** tokens split by purpose, team tokens locked, all public.

---

## ✅ PHASE 3 — The Swapbook: let people BUY and SELL (Week 3–4)

**Goal:** Create a place to trade BZC. On Solana this is **Raydium** (a swap/AMM).

### How it works (plain words)
- You create a **liquidity pool** by putting in **BZC + USDC together**.
- The ratio you deposit **sets the starting price**.
  - Example: `50,000,000 BZC + 10,000 USDC` → starting price ≈ `$0.0002` per BZC.
- Once live, **anyone can swap** USDC/SOL → BZC and back. That's your swapbook. 🎉

### Steps
1. Go to **Raydium** → "Create Pool / Add Liquidity".
2. Pick pair: **BZC / USDC** (or BZC / SOL).
3. Deposit your chosen amounts (this sets the price).
4. **LOCK the liquidity** using a liquidity locker. 🔒
   *This is the #1 trust signal.* It proves you can't "rug pull" (steal the pool).
5. Share the swap link so people can buy.

### 💰 Reality check
- The **technology is cheap**. The **real money is the liquidity itself.**
- More liquidity = steadier price = more trust. Aim for as much as you can afford;
  a few thousand USDC minimum to look serious.

**End of Phase 3:** BZC is publicly tradable, liquidity locked. Auto-appears on
**Jupiter** (Solana's swap aggregator) and **DexScreener** (price charts).

---

## ✅ PHASE 4 — Add a Buy/Swap widget to YOUR website (Week 4–5)

**Goal:** Let people buy BZC without leaving beezchain.com. This is real dev work
inside your existing Next.js project — Claude can build this for you.

### What gets added
1. **Wallet Connect** — using `@solana/wallet-adapter`. A "Connect Wallet" button
   that supports **Phantom** and **Solflare**.
2. **Swap widget** — embed **Jupiter's Swap Terminal** (a ready-made React/Next
   component). Users pick USDC → BZC and swap right on your page.
3. **Live price + chart** — pull data from the **DexScreener API** and show it
   near your Tokenomics section.
4. A **"Buy BZC"** button in your Navbar / Hero that opens the swap.

### Security rules (never break these)
- 🚫 **Never** put a private key or seed phrase in your website code or `.env`
  that ships to the browser. Keys live in the user's wallet only.
- All buying happens through the user's own wallet approving the transaction.

**End of Phase 4:** your marketing site becomes a real product where people can buy.

---

## ✅ PHASE 5 — Get listed & discovered (Week 5–6)

**Goal:** Make BZC easy to find and look legit.

- [ ] **DexScreener / Birdeye** — automatic once the pool exists; claim/verify your
      token profile (add logo, links, description).
- [ ] **CoinGecko** — apply for listing (needs live pool + some volume + info).
- [ ] **CoinMarketCap** — apply for listing (similar requirements).
- [ ] Update your website **Contract Address** section with the verified address.
- [ ] Add "Verified" links to Solscan so people can check you.

**End of Phase 5:** BZC shows up when people search for it, with price + logo.

---

## ✅ PHASE 6 — Grow the community (Ongoing, starts Week 4)

**Goal:** Real people holding and using BZC. This matters more than any tech.

- **Social:** X (Twitter), Telegram, Discord — post daily, be active.
- **Airdrops:** already in your Q3 roadmap. Give small amounts to early joiners.
- **Staking platform:** let holders lock BZC to earn rewards (from your Staking 20%).
  This is a smart contract — build after Phase 4.
- **Partnerships & real-estate story:** your roadmap's Sanali Business Bay / Ameri
  Hotel income-sharing angle is your unique selling point — market it clearly.
- **Content:** explain use cases (supply chain, tokenized incentives) simply.

**End of Phase 6:** a growing base of holders and daily activity.

---

## 🟡 PHASE 7 — Orderbook (ADVANCED — optional, Month 2–3+)

**Goal:** Add stock-market-style trading. **Only do this when volume is real.**

- On Solana, order books run on **OpenBook** (successor to Serum).
- Create a **BZC/USDC market**, then keep it filled with buy/sell orders using
  **market makers** or a **market-making bot**.
- Build an orderbook UI (bids, asks, depth chart) on your site.

> ⚠️ **Honest warning:** an *empty* order book looks worse than none at all.
> Most tokens never need this. Skip until you have active daily traders.

---

## 🌉 PHASE 8 — Bridge to other chains = "multi-chain" (Month 3–6)

**Goal:** Deliver the "multilayered / multi-chain" vision. Now BZC lives on more
than one blockchain.

### How it works (plain words)
- A **bridge** locks your BZC on Solana and creates an equal amount on another
  chain (e.g. BSC or Ethereum). Users can move BZC back and forth.

### Steps
1. Deploy a **BZC token contract** on the new chain:
   - **BSC** → a **BEP-20** token, tradable on **PancakeSwap**.
   - **Ethereum** → an **ERC-20** token, tradable on **Uniswap**.
2. Connect a **cross-chain bridge** (e.g. Wormhole, or a bridge provider) so the
   same BZC can travel between Solana ↔ BSC ↔ Ethereum.
3. Add liquidity pools on each new chain (like Phase 3, repeated).
4. Update your website to show it's now **multi-chain** and let users pick a chain.

> This is exactly where your old FAQ text (PancakeSwap / BEP-20) becomes true —
> just in **Phase 8**, not at launch.

**End of Phase 8:** BZC is a real multi-chain token. This matches your big vision.

---

## 🏗️ PHASE 9 — Your own blockchain / Layer-1 (THE DREAM — much later)

**Goal:** Build "BeezChain" the actual network, where BZC is the native gas coin.

- **Only attempt this** when you have thousands of holders, real usage, a real
  budget (millions), and a blockchain engineering team.
- Usually built with **Cosmos SDK** or **Substrate**.
- You'd need validators, an explorer, wallets, developer tools, and bridges.
- Then migrate BZC holders from Solana to your new chain.

> This is a multi-year goal. **Community and revenue first, infrastructure later.**
> Building an empty chain with no users is the #1 way crypto projects fail.

---

## 💸 Cost summary (rough)

| Item | Rough cost |
|------|-----------|
| Creating the token (Phase 1) | ~$5–30 in SOL |
| Website widget dev (Phase 4) | Your/Claude's time |
| **Liquidity (Phase 3)** | **The big one — thousands of USDC** |
| Listings (Phase 5) | Mostly free (CMC/CG apply free) |
| Legal advice | Varies — **budget for this** |
| Bridging (Phase 8) | Medium (new pools + bridge fees) |
| Own Layer-1 (Phase 9) | Very high ($millions) |

**Takeaway:** the tech is cheap. Your real budget goes to **liquidity**, **legal**,
and **marketing**.

---

## ⚖️ Legal & safety (do NOT skip)

- Selling a token can be a **regulated financial activity** in many countries.
- Your **real-estate income-sharing** feature may legally count as a **security** —
  talk to a **crypto lawyer early**.
- Get any **smart contracts audited** (staking, vesting) before going live.
- Be transparent: locked liquidity, locked team tokens, public wallets.

---

## 📍 Start THIS WEEK — your first 5 steps

1. ✅ Chain decided: **Solana first**.
2. Install **Phantom**, buy ~$30 of **SOL**.
3. Ask Claude to **fix the FAQ/tokenomics contradiction** in `src/lib/data.ts`.
4. Create the **BZC token** (9 decimals, 10.08B), then **revoke mint authority**.
5. Verify it on **Solscan**, then come back to build the **website swap widget**.

---

## 🤝 What Claude can do for you (in this project)

- Fix the Solana/BSC contradiction in `src/lib/data.ts`.
- Update Tokenomics / Contract Address components with real data.
- Build the **wallet-connect + Jupiter swap widget** in your Next.js app.
- Add a **live price + chart** section from DexScreener.
- Later: build the **staking UI** and the **multi-chain switcher**.

> Blockchain steps (creating the token, adding liquidity, bridging) happen in
> external tools/wallets — Claude guides you, but **you** click the final buttons
> with your own wallet for security.

---

*Plan version: Solana-first. Last updated per project date 2026-09-14.*
