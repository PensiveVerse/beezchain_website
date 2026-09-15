# 💼 Phase 2 — BZC Wallet Allocation Sheet

**Total supply: 10,080,000,000 BZC** (10.08 B) · Solana (SPL) · 9 decimals

This sheet defines **which wallet holds which slice of the supply**, how each slice
is **locked or vested**, and the order to move funds after Phase 1 (minting).
Fill in each wallet address as you create it in Phantom, then keep this public for
transparency.

> 🎯 Goal: never keep 100% in one wallet. Separate by purpose, lock the sensitive
> parts, and publish the addresses so holders can verify everything on Solscan.

---

## 1. Allocation overview

| # | Allocation | % | Tokens (BZC) | Purpose |
|---|-----------|----|--------------|---------|
| 1 | Investors | 25% | 2,520,000,000 | Early capital & strategic backers |
| 2 | Community | 25% | 2,520,000,000 | Airdrops, growth, ecosystem incentives |
| 3 | Staking & Rewards | 20% | 2,016,000,000 | Rewards paid to holders who stake |
| 4 | Gaming & Forex Incentive | 10% | 1,008,000,000 | Incentive programs & partnerships |
| 5 | Tech Reserve | 10% | 1,008,000,000 | Development & infrastructure |
| 6 | Team & Advisors | 10% | 1,008,000,000 | Team — **locked/vested** |
| | **TOTAL** | **100%** | **10,080,000,000** | |

---

## 2. Wallet register (fill in as you create each)

| # | Wallet name | Tokens (BZC) | Solana address | Status |
|---|-------------|--------------|----------------|--------|
| 1 | `bzc-investors` | 2,520,000,000 | `[TBD]` | ⬜ not created |
| 2 | `bzc-community` | 2,520,000,000 | `[TBD]` | ⬜ not created |
| 3 | `bzc-staking` | 2,016,000,000 | `[TBD]` | ⬜ not created |
| 4 | `bzc-gaming-forex` | 1,008,000,000 | `[TBD]` | ⬜ not created |
| 5 | `bzc-tech-reserve` | 1,008,000,000 | `[TBD]` | ⬜ not created |
| 6 | `bzc-team-advisors` | 1,008,000,000 | `[TBD]` | ⬜ not created |
| 7 | `bzc-liquidity` (see §4) | *carve-out* | `[TBD]` | ⬜ not created |

> Keep each wallet's **seed phrase offline**. The team and liquidity wallets are
> the highest-risk — consider a hardware wallet or multisig for those.

---

## 3. Locking & vesting plan

Locking/vesting is what separates a serious project from a scam. Recommended
defaults below — adjust to your legal/investor agreements.

| Allocation | TGE unlock* | Cliff | Vesting after cliff | Lock tool |
|-----------|-------------|-------|---------------------|-----------|
| Investors | 10% | 3 months | Linear over 12 months | Token locker / vesting contract |
| Community | 5% | none | Released via campaigns/airdrops over 24 months | Program-controlled |
| Staking & Rewards | 0% | none | Emitted as staking rewards over 24–36 months | Staking contract |
| Gaming & Forex | 0% | 1 month | Released per program milestones | Program-controlled |
| Tech Reserve | 0% | 6 months | Linear over 24 months | Token locker |
| **Team & Advisors** | **0%** | **12 months** | **Linear over 24 months** | **Token locker (public)** |

*TGE = Token Generation Event (launch). "TGE unlock" = % available immediately.

**Non-negotiables for trust:**
- 🔒 **Team & Advisors locked** with a 12-month cliff — publish the lock link.
- 🔒 **Liquidity locked** after the Raydium pool is created (Phase 3).
- 📢 **All six addresses public** on the website / docs.

`[TBD: confirm exact schedules against any signed investor/advisor agreements.]`

---

## 4. ⚠️ Liquidity carve-out (important gap)

Your tokenomics has **no dedicated "Liquidity" line**, but Phase 3 (Raydium pool)
**requires BZC to pair with USDC**. Decide where the initial liquidity BZC comes
from. Options:

- **Recommended:** carve **3–5%** for liquidity out of the **Investors** or
  **Community** bucket, into a separate `bzc-liquidity` wallet.
- Example (4% = 403,200,000 BZC) paired with your USDC sets the launch price.

Update §1/§2 once you decide, so the numbers still total 100%.

`[TBD: choose liquidity % and its source bucket.]`

---

## 5. Distribution order (run after Phase 1 mint)

1. Confirm all 10.08 B BZC are minted to the **owner wallet** (from Phase 1).
2. Create the 6–7 wallets above; record each address in §2.
3. Transfer each allocation from the owner wallet to its purpose wallet:
   ```bash
   # Example (replace <MINT>, <DEST>, and amount):
   spl-token transfer <MINT> 2520000000 <DEST-investors> --fund-recipient
   ```
4. Move the **liquidity carve-out** to `bzc-liquidity` (kept liquid for Phase 3).
5. **Lock/vest** the Team, Tech Reserve, and Investor portions per §3.
6. Publish all addresses + lock links on the site and in the whitepaper.
7. Verify every balance on **Solscan** matches this sheet.

---

## 6. Verification checklist

- [ ] All 6 purpose wallets created and addresses recorded
- [ ] Liquidity carve-out decided and moved to `bzc-liquidity`
- [ ] Balances match §1 exactly (sum = 10,080,000,000)
- [ ] Team & Advisors tokens locked (12-month cliff) — link saved
- [ ] Tech Reserve + Investor vesting set up — links saved
- [ ] All addresses published publicly
- [ ] Owner wallet emptied of allocations (holds only what's intended)
- [ ] Everything cross-checked on Solscan

---

*Companion file: `bzc-allocation.csv` (same numbers, spreadsheet-ready).*
*Fill all `[TBD]` items and confirm vesting against legal agreements before launch.*
