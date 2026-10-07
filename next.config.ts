import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // The landing page is the self-contained v12 design bundle served statically
  // from /public/site. Rewrite the root URL to that document so relative anchors
  // (#technology, #tokenomics, …) still resolve against "/".
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/site/index.html" }],
    };
  },
};

export default nextConfig;
