import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beez Chain",
  description:
    "BeezChain Crypto is a blockchain-based platform that rewards users with crypto for engaging in physical activity, especially walking and running.",
  icons: {
    icon: "/images/coin.webp",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="min-h-screen bg-black text-white">{children}</body>
    </html>
  );
}
