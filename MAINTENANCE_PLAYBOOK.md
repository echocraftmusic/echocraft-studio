# MAINTENANCE_PLAYBOOK.md — echocraft.studio

**Updated:** 2026-10-22  
**Read with:** [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)  
**Confidence:** Entry paths below were observed directly in GitHub source. Deployment, runtime state, credentials, and connected Cloudflare resources were **not independently verified**.

## Known code entry points

- `index.html` — Studio homepage
- `js/navigation.js` — Navigation
- `js/animations.js` — Animation
- `js/main.js` — General interactions; fetch usage
- `js/mobile-carousels.js` — Mobile carousels

## Key regression and risk checks

Critical: contact/inquiry flows, working menu and responsive visuals, packages/terms accuracy. Echo Bot is a concept until confirmed in source.

## Before each requested update

1. Read `PROJECT_CONTEXT.md`, this playbook, and the latest code/commit history.
2. Confirm domain `https://echocraft.studio`, GitHub default branch and Cloudflare project. Do **not** assume the repository automatically publishes to the live website.
3. Identify exact existing implementation and safest edit path; do not reconstruct a current working site from old snippets.
4. List user-requested changes and any dependencies before editing; preserve all unrelated styles and functionality.
5. For edits involving Worker bindings, payments, authentication, content publication or client data, inspect the supporting implementation first and never guess configuration.
6. Test desktop and mobile layout; verify links and core actions; check browser console/network issues where possible.
7. Record changed files, deployment method and actual verification result. Do not call a Git commit a live deployment.
8. Update `PROJECT_CONTEXT.md` for decisions and this file when code layout or testing procedures materially change.

## Deployment handoff (fill from verified Cloudflare settings)

- GitHub repo: `echocraftmusic/echocraft-studio`
- Production URL: https://echocraft.studio
- Deployment method: **UNVERIFIED**
- Cloudflare account/project: **UNVERIFIED**
- Production branch: **UNVERIFIED**
- Build/output directory: **UNVERIFIED**
- Worker routes/bindings: **UNVERIFIED (never record secret values)**
- Last independently verified production release: **UNVERIFIED**

## What to provide at the end of any future site task

- Changed files and summary
- Commit hash / PR if written to GitHub
- Build/test results and remaining unknowns
- Deployment status: not deployed / deployed but unverified / verified live
- Updated project documentation when substantive

## Activity log

- **2026-10-22** — Created code-entry-point and maintenance checklist from inspected repository files. Documentation-only; no live deployment performed.
