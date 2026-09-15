// Central BeezChain (BZC) token config — single source of truth for the app.
// Fill in MINT_ADDRESS after Phase 1 (creating the token on Solana).
// Until then, the swap widget / price components use the placeholder and
// should show a "coming soon" state instead of a broken swap.

export const BZC = {
  name: "BeezChain",
  symbol: "BZC",
  decimals: 9,
  // 10.08 billion, written out in base units is added at mint time.
  totalSupply: 10_080_000_000,
  network: "solana-mainnet",

  // ⚠️ PLACEHOLDER — replace with the real SPL mint address after Phase 1.
  // The address currently on the site is: 8xzLg1tyhw1A9tsvVo9nFC9XbvBeHrtvWddtLiu2yp8E
  // Verify it on Solscan before trusting it; otherwise mint a fresh one.
  mintAddress: "",

  // Quote token people pay with when swapping (Solana USDC).
  quoteMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC (mainnet)

  links: {
    website: "https://beezchain.com",
    solscan: (mint: string) => `https://solscan.io/token/${mint}`,
    dexscreener: (mint: string) => `https://dexscreener.com/solana/${mint}`,
    jupiter: (mint: string) => `https://jup.ag/swap/USDC-${mint}`,
  },
} as const;

// True once the real mint address is filled in above.
export const IS_TOKEN_LIVE = BZC.mintAddress.length > 0;
