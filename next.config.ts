import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating dev indicator (the "N" button)
  devIndicators: false,

  // webpack watchOptions: prevents OneDrive sync events from
  // triggering hot-reloads on Windows (Turbopack was panicking on this setup)
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
