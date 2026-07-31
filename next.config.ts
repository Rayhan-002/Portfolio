import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating dev indicator (the "N" button)
  devIndicators: false,

  // Production builds use Turbopack (Next.js 16 default). This empty config
  // acknowledges that on purpose — the webpack() block below is dev-only.
  turbopack: {},

  // webpack watchOptions: prevents OneDrive sync events from
  // triggering hot-reloads on Windows (Turbopack was panicking on this setup)
  // Only applies to `next dev --webpack` (see package.json "dev" script) —
  // watchOptions has no effect on `next build`.
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      aggregateTimeout: 500,
      ignored: [
        "**/.git/**",
        "**/node_modules/**",
        "**/.vscode/**",
        "**/.next/**",
      ],
    };
    return config;
  },
};

export default nextConfig;
