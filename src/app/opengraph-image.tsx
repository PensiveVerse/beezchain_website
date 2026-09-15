import { ImageResponse } from "next/og";

// Branded social-share image used for both Open Graph and Twitter cards.
export const alt = "BeezChain (BZC) — Solana-based blockchain ecosystem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #ffe70a 0%, #ffdb06 45%, #ffcf00 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top badge row */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              background: "#000",
              color: "#ffcf00",
              fontSize: 30,
              fontWeight: 700,
              padding: "8px 20px",
              borderRadius: "12px",
              letterSpacing: "3px",
            }}
          >
            BZC
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#1a1400",
              fontWeight: 600,
            }}
          >
            Built on Solana
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 118,
            fontWeight: 800,
            color: "#111",
            marginTop: "28px",
            lineHeight: 1,
          }}
        >
          BeezChain
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 42,
            color: "#1a1400",
            marginTop: "28px",
            maxWidth: "980px",
          }}
        >
          Real-world value, on-chain. Real estate · Staking · Transparent
          tokenomics.
        </div>

        {/* URL */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#4a3d00",
            marginTop: "44px",
            fontWeight: 600,
          }}
        >
          beezchain-website-teal.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
