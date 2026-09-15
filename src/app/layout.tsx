import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Update this to your final custom domain (e.g. https://beezchain.com) when set.
const SITE_URL = "https://beezchain-website-teal.vercel.app";
const TITLE = "BeezChain (BZC) — Solana-based blockchain ecosystem";
const DESCRIPTION =
  "BeezChain (BZC) is a Solana-based ecosystem bringing real-world value on-chain — real-estate income, staking, rewards, and transparent tokenomics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | BeezChain",
  },
  description: DESCRIPTION,
  applicationName: "BeezChain",
  keywords: [
    "BeezChain",
    "BZC",
    "Solana",
    "SPL token",
    "crypto",
    "DeFi",
    "real estate",
    "staking",
    "tokenomics",
  ],
  icons: {
    icon: "/images/coin.webp",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "BeezChain",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="min-h-screen bg-black text-white">{children}</body>
    </html>
  );
}
