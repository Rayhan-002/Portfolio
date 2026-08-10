# Progress

Read this file first in any new session — it should be enough to pick up work without re-scanning the codebase. Update it at the end of every milestone.

## Where things stand right now

- **Live site:** https://portfolio-smray-dev.vercel.app — still serving the pre-expansion single-page build (M1 below is local/uncommitted, not deployed yet).
- **Local branch:** `dev`. Uncommitted: `README.md`, this file, plus the full M1 case-study implementation (see history #8) — `app/layout.tsx`, `app/page.tsx`, `app/components/Navbar.tsx`, `app/components/Projects.tsx`, `app/sitemap.ts`, `lib/data.ts` modified; new: `app/projects/[slug]/{layout,page}.tsx`, `app/components/{RepoLinks,CaseStudySectionBlock,ProjectNavPanel}.tsx`, `lib/case-studies/tasklens.ts`, `lib/slugify.ts`.
- **Architecture today:** homepage (`app/page.tsx`) is unchanged content-wise (Hero → About → Skills → Projects → Publications → Experience(+Education) → Contact), but `Navbar`/`Footer` now live in root `app/layout.tsx` instead of `page.tsx`, so they apply to every route. One dynamic route now exists: `/projects/tasklens` (statically generated), a full case-study page with a cross-navigation panel. `/projects/<any-other-slug>` correctly 404s (`dynamicParams = false`).
- **Active work:** M1 of the case-study expansion is implemented and verified locally (lint/build/dark-mode/mobile/404 all checked). **Waiting for user approval before starting M2** — per explicit instruction, stop after each milestone.

## Full history

1. **Boilerplate** (2026-07-26 → 07-28) — Next.js 16 App Router scaffold, base components (Navbar/Hero/About/Skills), initial Tailwind v4 config.
2. **Core sections** (2026-07-31) — Projects, Experience, Education, Publications sections built. Dark mode toggle (initially OS-preference only). SEO metadata (sitemap, robots, OG image, JSON-LD Person schema). Vercel deploy config fixes (Turbopack/webpack conflict). Mobile hamburger nav. Multi-repo project links (data model: `Project.repos[]` instead of a single `github` string — needed because TaskLens has separate frontend/backend repos + a live demo). Full education history added (HSC/SSC + awards), `Education` became an array.
3. **Deployment recovery incident** (2026-08-10) — a `git reset` accidentally discarded a merge commit containing the typography work from both `dev` and `main` after pushing. Recovered cleanly via the dangling commit still in Git's object database (`git fsck` found it) and a fast-forward merge — no data was actually lost, just briefly unreachable. Lesson: be careful with `git reset` across branches that have unique unmerged commits.
4. **Typography/design pass** (2026-08-10) — dark mode converted from OS-preference-only to a manual toggle (class-based `.dark`, `useSyncExternalStore`, `beforeInteractive` script to avoid flash-of-wrong-theme). Newsreader serif loaded as `--font-display`, applied to Hero name/tagline (italic) and all section h2 headings — Geist Sans stays the body font. Navbar scroll-spy active-link indicator. Stronger Hero photo framing (accent ring + shadow).
5. **UI-Craft design review** (2026-08-10 → 08-11) — used the `ui-craft` MCP tool to audit the site against design/psychology rules. Found and reported (not yet fixed): a real WCAG AA contrast failure (`text-zinc-400` on light backgrounds in `Skills.tsx`/`Experience.tsx` micro-labels — should be `text-zinc-500`), the Education block visually outweighing actual work Experience (12-chip coursework wall + 3 cards), and TaskLens's Frontend/Backend/Live links having no visual hierarchy.
6. **README + progress.md rewrite** (2026-08-11) — README replaced the default `create-next-app` boilerplate text with real project docs. This file rewritten to be a proper continuity log instead of a one-line stub.
7. **Case-study expansion planning** (2026-08-11) — architecture plan written (routing, data model, cross-nav panel design, milestone breakdown), reviewed against a Plan agent's independent pass, refined with the user (confirmed: no images yet, no `/projects` index page, flat project list, publication reuses the project template) and an explicit "adding a project later" recipe documented so the design doesn't get harder to extend over time.
8. **M1 implemented** (2026-08-11) — see "What's next" for full detail. Routing skeleton, data model (`CaseStudy` types + `projectsWithCaseStudy` shared filter), TaskLens's real case study content (5 sections, no fabricated stats — only content derivable from the existing project description), the `Navbar`/`Footer` → root-layout refactor, and a working (if not yet fully polished) cross-navigation panel. Found and fixed one real bug during verification: Navbar's scroll-spy state persisted stale across client-side route changes because it now lives in the root layout (doesn't remount) — fixed by gating the active-link check on `usePathname() === '/'` rather than trying to reset state imperatively (which also hit the same `react-hooks/set-state-in-effect` lint rule seen with `ThemeToggle` earlier).

## What's next — Case Study Pages expansion

**Goal:** dedicated case-study pages per project (and later the publication), with a persistent "jump to any other project" panel on every case study — so a visitor never has to go back to a list page to see another project. Full plan lives at `C:\Users\smray\.claude\plans\i-am-building-my-structured-horizon.md` (may not survive across machines/sessions — this file is the durable copy).

**Confirmed decisions (don't re-ask):**
- No images/screenshots yet — case studies ship as text + stats, image field stays optional for later.
- No standalone `/projects` or `/research` index page — the homepage sections already serve as the index; the cross-nav panel solves the "don't make me go back to a list" problem directly.
- No category/tag grouping — 5 projects stay a flat list.
- The publication's case study reuses the exact same template as project case studies (no separate academic layout).
- Routing: `/projects/[slug]` for projects, `/research/[slug]` for the publication (later) — matches the nav's user-facing labels.
- Case-study content lives in `lib/case-studies/<id>.ts` (one file per project), imported into `lib/data.ts` — not inlined and not MDX.
- Adding a project later is a 2-file operation (entry in `lib/data.ts` + a `lib/case-studies/<id>.ts` file) — route generation, the cross-nav panel, and the sitemap all pick it up automatically via the shared `projectsWithCaseStudy` filter. No other file needs manual editing when a project is added.

**Milestones:**
1. **M1 — done, pending approval to continue.** Types + `projectsWithCaseStudy` helper in `lib/data.ts`. `lib/case-studies/tasklens.ts` (Overview / The Problem / Architecture / Kanban & Annotation / State Management — content written from the existing project description, no invented metrics; **flagged for the user to review/personalize**, not verified firsthand). `Navbar`/`Footer` moved into `app/layout.tsx`; `app/page.tsx` now just the section list. `Navbar` hrefs changed to root-relative (`/#about`) and swapped to `next/link`'s `<Link>` (eslint `no-html-link-for-pages` caught the plain `<a href="/">`). New shared `RepoLinks` component (dedupes the repo/live-link markup that was inline in `Projects.tsx`, now used there and in the case-study header too). `CaseStudySectionBlock` + `ProjectNavPanel` components. `app/projects/[slug]/layout.tsx` (breadcrumb + nav panel shell) and `page.tsx` (`generateStaticParams`, `dynamicParams = false`, `generateMetadata`, header/stats/sections). `sitemap.ts` includes the new route. Verified: lint, build, homepage unaffected, case study renders correctly light+dark+mobile, `/projects/snipz` (no case study) genuinely 404s, Navbar links work correctly both directions between homepage and case-study page.
2. **M2 — next.** Visual polish pass on the `ProjectNavPanel` (currently functional/plain, not yet run through UI-Craft). Add Snipz's case study (second, deliberately small entry) so the cross-nav panel has more than one real project to validate against.
3. **M3** — Remaining project case studies, content-only, whichever projects the user decides warrant one (their call, per-project, as they go).
4. **M4** — Publication case study: `publication` → `publications[]` migration in `lib/data.ts`, `app/research/[slug]/page.tsx`.
5. **M5** — Polish: per-project OG images, homepage card spacing pass, full sitemap/metadata audit.

## Known issues / notes

- `next dev` is forced to `--webpack` (see comment in `next.config.ts`) — works around a OneDrive-on-Windows file-watching bug. Production builds correctly use Turbopack.
- `metadataBase`/`sitemap.ts`/`robots.ts` resolve the canonical domain via `lib/site.ts` (`VERCEL_PROJECT_PRODUCTION_URL` in production, `VERCEL_URL` on preview, localhost otherwise) — avoids pointing at a per-deployment preview URL.
- No contact form by design — direct email/LinkedIn/GitHub links only (evaluated adding a Resend-backed form, parked, not started).
- UI-Craft review findings (see history #5) are reported but not yet applied — worth doing alongside remaining case-study work since the contrast bug is a real accessibility issue.
- Gotcha worth remembering: any client component that lives in the root layout persists across client-side route changes (doesn't remount) — `useEffect(..., [])` with empty deps only fires once ever, not per-route. If it needs to behave differently per route, depend on `usePathname()` and gate behavior in the effect/render rather than assuming a fresh mount. (Bit Navbar in M1; now fixed there, but the same trap applies to any future root-layout client component.)
- TaskLens's case-study content (history #8) was written by extrapolating from the existing homepage project description, not from firsthand knowledge of the actual implementation — the user should read it and correct/expand anything that isn't accurate before treating it as final copy.

## Not started

- Contact form (parked).
- UI-Craft review fixes (contrast bug, Education/Experience visual balance, TaskLens link hierarchy).
- M2 through M5 of the Case Study Pages expansion.
