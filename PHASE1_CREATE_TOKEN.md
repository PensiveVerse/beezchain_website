# 🔨 Phase 1 — Create the BZC Token on Solana (do this when SOL arrives)

This is the exact, copy-paste guide for the developer way. Everything here happens
in **your terminal + your wallet**, not in the website code.

> You need: ~$30 of **SOL** in a wallet, and about **15 minutes**.

---

## Step 0 — Install the tools (one time)

```bash
# Install the Solana CLI (Mac)
sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"

# Install the SPL Token CLI + Metaplex "sugar"/metaboss for metadata
cargo install spl-token-cli
cargo install metaboss   # for attaching name/symbol/logo metadata
```

## Step 1 — Point the CLI at mainnet and your wallet

```bash
solana config set --url https://api.mainnet-beta.solana.com

# Create (or import) the wallet that will own the token.
# SAVE the seed phrase somewhere safe and OFFLINE.
solana-keygen new --outfile ~/bzc-owner.json
solana config set --keypair ~/bzc-owner.json

# Fund this address with SOL first, then confirm:
solana balance
```

## Step 2 — Create the token (mint) with 9 decimals

```bash
spl-token create-token --decimals 9
# → prints your MINT ADDRESS. COPY IT. This is BZC's contract address.
```

## Step 3 — Create an account to hold BZC, then mint the full supply

```bash
# Replace <MINT> with the address from Step 2
spl-token create-account <MINT>

# Mint 10.08 billion (the CLI handles the 9 decimals automatically)
spl-token mint <MINT> 10080000000
```

## Step 4 — Attach metadata (name, symbol, logo)

1. Upload `public/token/bzc-metadata.json` and a real `bzc-logo.png` to permanent
   storage (e.g. your website, Arweave, or IPFS) and note the public URL.
2. Update the `image` URL inside the JSON to point at the uploaded logo.
3. Attach it:

```bash
metaboss create metadata --account <MINT> --uri https://beezchain.com/token/bzc-metadata.json
```

## Step 5 — 🔒 LOCK the supply (critical for trust)

```bash
# No one can ever create more BZC after this:
spl-token authorize <MINT> mint --disable

# Optional: no one can freeze holders' tokens:
spl-token authorize <MINT> freeze --disable
```

## Step 6 — Verify on Solscan

- Open: `https://solscan.io/token/<MINT>`
- Confirm: **name = BeezChain**, **symbol = BZC**, **supply = 10,080,000,000**,
  **mint authority = none**, **logo shows**. ✅

## Step 7 — Wire it into the website

- Paste `<MINT>` into `src/lib/token.ts` → `mintAddress`.
- Update the `CONTRACT_ADDRESS` in `src/lib/data.ts` to match.
- The swap widget will automatically switch from "coming soon" to live.

---

### ✅ After Phase 1 you have:
A real, supply-locked BZC token, verified on Solscan, wired into your site — ready
for **Phase 3 (add liquidity on Raydium)**.
