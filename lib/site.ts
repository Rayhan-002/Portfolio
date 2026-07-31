// Shared across layout.tsx (metadataBase), sitemap.ts, and robots.ts —
// falls back to the Vercel-assigned deployment URL until a custom domain is set.
export const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'
