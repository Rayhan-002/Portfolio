// Shared across layout.tsx (metadataBase), sitemap.ts, and robots.ts.
// VERCEL_URL is per-deployment (changes every push) so it's only right for
// Preview deploys; Production should resolve to the stable project domain.
export const siteUrl =
  process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
