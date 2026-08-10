# Progress

Read this file first in any new session — it should be enough to pick up work without re-scanning the codebase. Update it at the end of every milestone.

## Where things stand right now

- **Live site:** https://portfolio-smray-dev.vercel.app — M1 (`c4a3f36`) is pushed and merged to both `origin/dev` and `origin/main`, so it should be live once Vercel's build for that commit completes.
- **Local branch:** `dev`, at `c4a3f36` plus M2+M3 work uncommitted on top (user is intentionally batching these two into one push): `app/components/ProjectNavPanel.tsx` and `lib/data.ts` modified, new `lib/case-studies/{snipz,meal-management}.ts`.
- **Architecture today:** homepage (`app/page.tsx`) unchanged content-wise. `Navbar`/`Footer` live in root `app/layout.tsx`, applying to every route. Three dynamic case-study routes now exist and are statically generated: `/projects/tasklens`, `/projects/snipz`, `/projects/meal-management`. Any other `/projects/<slug>` correctly 404s (`dynamicParams = false`).
- **Active work:** M3 implemented and verified locally. **Waiting for user approval before starting M4** — per explicit instruction, stop after each milestone.

## Full history

1. **Boilerplate** (2026-07-26 → 07-28) — Next.js 16 App Router scaffold, base components (Navbar/Hero/About/Skills), initial Tailwind v4 config.
2. **Core sections** (2026-07-31) — Projects, Experience, Education, Publications sections built. Dark mode toggle (initially OS-preference only). SEO metadata (sitemap, robots, OG image, JSON-LD Person schema). Vercel deploy config fixes (Turbopack/webpack conflict). Mobile hamburger nav. Multi-repo project links (data model: `Project.repos[]` instead of a single `github` string — needed because TaskLens has separate frontend/backend repos + a live demo). Full education history added (HSC/SSC + awards), `Education` became an array.
3. **Deployment recovery incident** (2026-08-10) — a `git reset` accidentally discarded a merge commit containing the typography work from both `dev` and `main` after pushing. Recovered cleanly via the dangling commit still in Git's object database (`git fsck` found it) and a fast-forward merge — no data was actually lost, just briefly unreachable. Lesson: be careful with `git reset` across branches that have unique unmerged commits.
4. **Typography/design pass** (2026-08-10) — dark mode converted from OS-preference-only to a manual toggle (class-based `.dark`, `useSyncExternalStore`, `beforeInteractive` script to avoid flash-of-wrong-theme). Newsreader serif loaded as `--font-display`, applied to Hero name/tagline (italic) and all section h2 headings — Geist Sans stays the body font. Navbar scroll-spy active-link indicator. Stronger Hero photo framing (accent ring + shadow).
5. **UI-Craft design review** (2026-08-10 → 08-11) — used the `ui-craft` MCP tool to audit the site against design/psychology rules. Found and reported (not yet fixed): a real WCAG AA contrast failure (`text-zinc-400` on light backgrounds in `Skills.tsx`/`Experience.tsx` micro-labels — should be `text-zinc-500`), the Education block visually outweighing actual work Experience (12-chip coursework wall + 3 cards), and TaskLens's Frontend/Backend/Live links having no visual hierarchy.
6. **README + progress.md rewrite** (2026-08-11) — README replaced the default `create-next-app` boilerplate text with real project docs. This file rewritten to be a proper continuity log instead of a one-line stub.
7. **Case-study expansion planning** (2026-08-11) — architecture plan written (routing, data model, cross-nav panel design, milestone breakdown), reviewed against a Plan agent's independent pass, refined with the user (confirmed: no images yet, no `/projects` index page, flat project list, publication reuses the project template) and an explicit "adding a project later" recipe documented so the design doesn't get harder to extend over time.
8. **M1 implemented** (2026-08-11) — see "What's next" for full detail. Routing skeleton, data model (`CaseStudy` types + `projectsWithCaseStudy` shared filter), TaskLens's real case study content (5 sections, no fabricated stats — only content derivable from the existing project description), the `Navbar`/`Footer` → root-layout refactor, and a working (if not yet fully polished) cross-navigation panel. Found and fixed one real bug during verification: Navbar's scroll-spy state persisted stale across client-side route changes because it now lives in the root layout (doesn't remount) — fixed by gating the active-link check on `usePathname() === '/'` rather than trying to reset state imperatively (which also hit the same `react-hooks/set-state-in-effect` lint rule seen with `ThemeToggle` earlier). Committed as `c4a3f36`, pushed to `dev`, later merged/pushed to `main` too.
9. **M2 implemented** (2026-08-11) — ran `ProjectNavPanel` through the `ui-craft` MCP tool for real design guidance (not just eyeballed). Concrete change: active project/section indicator switched from a left-border to an accent-text + `bg-accent/10` pill — matches the tool's explicit "active item: accent text + accent-subtle background" rule, and reuses a pattern already established elsewhere in the site (Featured badge, venue badge), so it's *more* consistent, not a new pattern. Inactive links gained a `hover:bg-surface` affordance treatment and larger click targets (padding, not just text). Also fixed the same light-mode `text-zinc-400` contrast bug (see history #5) that had crept into this new component — caught it before it shipped a third time. Added Snipz's case study (2 sections, deliberately short) specifically to prove the template compresses gracefully for a smaller project, not just TaskLens's flagship depth. Verified: cross-navigation panel now lists both projects on both pages, clicking directly jumps between case studies with no detour through a list page (the core ask), active-project pill renders correctly light/dark/desktop/mobile, zero console errors.
10. **M3 implemented** (2026-08-11) — asked the user which of the 3 remaining projects warrant a case study (their call, per the plan); **only Meal Management System was chosen** — Backpackers Home and Neural Network Algorithms deliberately skipped, not forgotten. Added `lib/case-studies/meal-management.ts` (2 sections, Snipz-scoped) and wired it in. Verified: nav panel now lists all 3 case-study projects in order, cross-navigation from Meal Management directly to TaskLens works, homepage shows exactly 3 "Read Case Study" links, dark mode correct, zero console errors. User plans to push M2+M3 together as one commit.

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
1. **M1 — done.** Routing skeleton, data model, TaskLens's case study, `Navbar`/`Footer` → root-layout refactor, first working cross-nav panel. Full detail in history #8. Committed `c4a3f36`, on `main` and `dev`.
2. **M2 — done.** `ProjectNavPanel` polish via `ui-craft` (accent pill active state, hover affordance, fixed a contrast bug on the way), Snipz's case study added as the "small project" test case. Full detail in history #9. **Not yet committed** (batched with M3, see below).
3. **M3 — done, pending approval to continue.** Meal Management System's case study added (user's explicit choice — Backpackers Home and Neural Network Algorithms were offered and declined for now, not oversights). Full detail in history #10. **Not yet committed** — user is pushing M2+M3 together as one commit.
4. **M4 — next (blocked on approval).** Publication case study: `publication` → `publications[]` migration in `lib/data.ts`, `app/research/[slug]/page.tsx`.
5. **M5** — Polish: per-project OG images, homepage card spacing pass, full sitemap/metadata audit.

## Known issues / notes

- `next dev` is forced to `--webpack` (see comment in `next.config.ts`) — works around a OneDrive-on-Windows file-watching bug. Production builds correctly use Turbopack.
- `metadataBase`/`sitemap.ts`/`robots.ts` resolve the canonical domain via `lib/site.ts` (`VERCEL_PROJECT_PRODUCTION_URL` in production, `VERCEL_URL` on preview, localhost otherwise) — avoids pointing at a per-deployment preview URL.
- No contact form by design — direct email/LinkedIn/GitHub links only (evaluated adding a Resend-backed form, parked, not started).
- UI-Craft review findings (see history #5) are reported but not yet applied — worth doing alongside remaining case-study work since the contrast bug is a real accessibility issue.
- Gotcha worth remembering: any client component that lives in the root layout persists across client-side route changes (doesn't remount) — `useEffect(..., [])` with empty deps only fires once ever, not per-route. If it needs to behave differently per route, depend on `usePathname()` and gate behavior in the effect/render rather than assuming a fresh mount. (Bit Navbar in M1; now fixed there, but the same trap applies to any future root-layout client component.)
- All three case studies so far (TaskLens, Snipz, Meal Management — history #8, #9, #10) were written by extrapolating from each project's existing homepage description, not from firsthand knowledge of the actual implementation — the user should read all three and correct/expand anything that isn't accurate before treating them as final copy.

## Not started

- Contact form (parked).
- UI-Craft review fixes (contrast bug, Education/Experience visual balance, TaskLens link hierarchy).
- Case studies for Backpackers Home / Neural Network Algorithms — user declined these for now (2026-08-11 M3 decision), not an oversight. Revisit only if the user brings it up again.
- M4 and M5 of the Case Study Pages expansion.
