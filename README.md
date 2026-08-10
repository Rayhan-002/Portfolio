# Md Rayhan Ali — Portfolio

Personal portfolio site for Md Rayhan Ali (Full-Stack Developer & ML Researcher), built with the Next.js App Router. Single-page, content driven from one data file, deployed on Vercel.

**Live:** https://portfolio-smray-dev.vercel.app

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config via `@theme inline`)
- [Geist Sans/Mono](https://vercel.com/font) (UI/body) + [Newsreader](https://fonts.google.com/specimen/Newsreader) (serif display, via `next/font/google`)

## Features

- **Sections:** Hero, About, Skills, Projects, Research/Publications, Experience & Education, Contact — all rendered from [lib/data.ts](lib/data.ts)
- **Dark mode:** manual light/dark toggle (class-based, persisted to `localStorage`), no flash-of-wrong-theme on load
- **Navigation:** sticky navbar with scroll-spy active-section indicator, mobile hamburger menu
- **Motion:** scroll-reveal on each section via `IntersectionObserver`, respects `prefers-reduced-motion`
- **SEO:** per-page metadata, dynamic Open Graph image and favicon (`next/og`), `sitemap.xml` / `robots.txt`, JSON-LD `Person` schema
- **Projects:** data model supports multiple repo links per project (e.g. split frontend/backend repos) plus an optional live-demo link

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint    # eslint
npm run build   # production build (Turbopack)
npm run start   # serve the production build
```

> `npm run dev` runs with `--webpack` — see the comment in [next.config.ts](next.config.ts) (it works around an OneDrive/Windows file-watching issue). Production builds use Turbopack, Next's default.

## Project Structure

```
app/
  components/     # one component per section (Navbar, Hero, About, Skills, ...)
  layout.tsx       # fonts, metadata, theme-init script, JSON-LD
  page.tsx         # composes the section components in order
  globals.css       # design tokens (light/dark), Tailwind v4 theme
  icon.tsx, opengraph-image.tsx   # generated via next/og
  sitemap.ts, robots.ts
lib/
  data.ts          # single source of truth for all site content
  site.ts          # resolves the canonical site URL (prod vs. preview vs. local)
```

## Content

All personal/CV content (bio, skills, projects, experience, education, publication) lives in [lib/data.ts](lib/data.ts). Update that file to change site content — no component edits needed for content changes.

## Deployment

Deployed on Vercel from the `main` branch. [lib/site.ts](lib/site.ts) resolves the canonical URL: `VERCEL_PROJECT_PRODUCTION_URL` in production, `VERCEL_URL` on preview deployments, `localhost:3000` otherwise — this keeps `sitemap.xml`/`robots.txt`/OG metadata pointing at the right domain regardless of environment.
