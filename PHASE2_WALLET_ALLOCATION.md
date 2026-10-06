# 💼 Phase 2 — BZC Wallet Allocation Sheet

**Total supply: 10,800,000,000 BZC** (10.8 B) · Solana (SPL) · 9 decimals
**Token (mint) address:** `8xzLg1tyhw1A9tsvVo9nFC9XbvBeHrtvWddtLiu2yp8E`

> ✅ **Status:** the token already exists and the full 10.8 B supply is consolidated
> in the secure operating wallet ("Account 2"). Supply is already locked (mint
> authority revoked). This sheet now covers **distributing** the supply.

This sheet defines **which wallet holds which slice of the supply** and how each slice
is **locked or vested**. Fill in each wallet address as you create it, then keep this
public for transparency.

> 🎯 Goal: never keep 100% in one wallet. Separate by purpose, lock the sensitive
> parts, and publish the addresses so holders can verify everything on Solscan.

---

## 1. Allocation overview

| # | Allocation | % | Tokens (BZC) | Where it goes |
|---|-----------|----|--------------|---------------|
| 1 | **Community** | 25% | 2,700,000,000 | ⏸️ **Stays in Account 2** — funds the liquidity pool + airdrops |
| 2 | Investors | 25% | 2,700,000,000 | → Investors wallet |
| 3 | Staking & Rewards | 20% | 2,160,000,000 | → Staking wallet |
| 4 | Gaming & Forex Incentive | 10% | 1,080,000,000 | → Gaming/Forex wallet |
| 5 | Tech Reserve | 10% | 1,080,000,000 | → Tech Reserve wallet |
| 6 | Team & Advisors | 10% | 1,080,000,000 | → Team wallet (🔒 **locked/vested**) |
| | **TOTAL** | **100%** | **10,800,000,000** | |

**Distributed now:** 5 wallets = **8,100,000,000 BZC**.
**Held in Account 2:** Community = **2,700,000,000 BZC** (for liquidity + airdrops).

---

## 2. Wallet register (create these 5, then fill in each address)

| # | Wallet name | Tokens (BZC) | Solana address | Status |
|---|-------------|--------------|----------------|--------|
| — | `BZC Community` (operating + Community) | 2,700,000,000 | `EXkxdeKv72BMPrC9Q872Xz4WXmV1xyfW1TESMPvw13Nb` | ✅ holds full supply |
| 1 | `BZC Investors` | 2,700,000,000 | `B2AhZrsUKKBbgLDf4jG9JPpBnqvebL8pD6M9Sn8uXHN7` | ✅ created |
| 2 | `BZC Staking` | 2,160,000,000 | `6nUxYZGwKkbL5Ee9uPT6E4ewQjEWo6Fj7DKc6y2rdZfU` | ✅ created |
| 3 | `BZC Gaming-Forex` | 1,080,000,000 | `4P4J9phnwZ1E6KKC6CDS6H7qVj7AJH8iDqgmH7JGDYNq` | ✅ created |
| 4 | `BZC Tech Reserve` | 1,080,000,000 | `Fnxe6GhtwjzM27SjGrhVUprpTEtR7m7gheWHCCo1GjFb` | ✅ created |
| 5 | `BZC Team` | 1,080,000,000 | `GGYuTd3Co19CovDsuoJe2Fq63keQUjk72xtsGfFZ2xo8` | 🔒 **LOCKED** (Jupiter Lock, 2026-10-06) |

> 🔒 **Team lock (Jupiter Lock):** 1,080,000,000 BZC locked with a **12-month cliff**
> (starts Oct 6, 2027) + **24-month linear** release (45,000,000/month) ending Oct 5, 2029.
> **Non-cancellable, recipient non-changeable.** Public lock link: `[TBD — paste from lock.jup.ag]`

> 💡 **Optional simplification:** to manage fewer seeds, you may combine
> `bzc-gaming-forex` + `bzc-tech-reserve` into a single `bzc-reserves` wallet
> (2,160,000,000 BZC). Your call.

> 🔒 Keep each wallet's **seed phrase offline**, **client-controlled**. Use a
> **hardware wallet (Ledger)** for the large/sensitive ones (Investors, Team,
> Tech Reserve).

---

## 3. Locking & vesting plan

Locking/vesting is what separates a serious project from a scam. Recommended
defaults below — adjust to your legal/investor agreements.

| Allocation | TGE unlock* | Cliff | Vesting after cliff | Lock tool |
|-----------|-------------|-------|---------------------|-----------|
| Community | 5% | none | Released via campaigns/airdrops over 24 months | Program-controlled (Account 2) |
| Investors | 10% | 3 months | Linear over 12 months | Token locker / vesting contract |
| Staking & Rewards | 0% | none | Emitted as staking rewards over 24–36 months | Staking contract |
| Gaming & Forex | 0% | 1 month | Released per program milestones | Program-controlled |
| Tech Reserve | 0% | 6 months | Linear over 24 months | Token locker |
| **Team & Advisors** | **0%** | **12 months** | **Linear over 24 months** | **Token locker (public)** |

*TGE = Token Generation Event (launch). "TGE unlock" = % available immediately.

**Non-negotiables for trust:**
- 🔒 **Team & Advisors locked** with a 12-month cliff — publish the lock link.
- 🔒 **Liquidity locked** after the Raydium pool is created (Phase 3).
- 📢 **All wallet addresses public** on the website / docs.

`[TBD: confirm exact schedules against any signed investor/advisor agreements.]`

---

## 4. Liquidity source

There is **no separate liquidity wallet.** The BZC for the Raydium pool comes from
the **Community allocation**, which is why it **stays in Account 2** (the operating
wallet). When liquidity is added (Phase 3):
- A portion of the 2.7 B Community BZC is paired with USDC in the Raydium pool.
- The remaining Community BZC funds airdrops/ecosystem growth.

`[TBD: confirm the exact BZC amount for the pool once the USDC amount is decided.]`

---

## 5. Distribution steps (run now — token already exists in Account 2)

1. Create the **5 wallets** above (client-controlled); record each address in §2.
2. From **Account 2**, transfer each allocation to its wallet. For each, **send a
   small test amount first**, confirm it arrives, then send the rest:
   ```bash
   # CLI example (replace <DEST> + amount). <MINT> = 8xzLg1tyhw1A9tsvVo9nFC9XbvBeHrtvWddtLiu2yp8E
   spl-token transfer <MINT> 2700000000 <DEST-investors> --fund-recipient
   ```
   *(Or do it in Phantom: BEEZCHAIN token → Send → paste address.)*
3. **Lock/vest** the Team (and Tech Reserve / Investor) portions per §3.
4. **Leave Community (2.7 B) in Account 2** for liquidity + airdrops.
5. Publish all addresses + lock links on the site and in the whitepaper.
6. Verify every balance on **Solscan** matches this sheet.

---

## 6. Verification checklist

- [ ] 5 wallets created and addresses recorded (client-controlled)
- [ ] Test transfer sent + confirmed to each before the full amount
- [ ] Balances match §1 (5 wallets = 8,100,000,000; Account 2 keeps 2,700,000,000)
- [ ] Team & Advisors tokens locked (12-month cliff) — link saved
- [ ] Tech Reserve + Investor vesting set up — links saved
- [ ] All addresses published publicly
- [ ] Community 2.7 B retained in Account 2 for liquidity + airdrops
- [ ] Everything cross-checked on Solscan

---

*Companion file: `bzc-allocation.csv` (same numbers, spreadsheet-ready).*
*Fill all `[TBD]` items and confirm vesting against legal agreements before launch.*
