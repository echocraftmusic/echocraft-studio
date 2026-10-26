# Echo Craft Studio — Security Review Register

Date: 2026-10-26. Scope: read-only review of GitHub source (`echocraftmusic/echocraft-studio`) plus public website content where available. **Not a penetration test or independent live HTTP-header/database verification.** No client/partner records were accessed or changed.

## Completed in GitHub

- Legacy `/admin/pages/{clients,quotes,referrals,analytics,portfolio}.html`, `/admin/projects.html` and `/admin/settings.html` now start hidden until the same Supabase `getUser()` and approved `profiles.role=admin` / `profiles.status=approved` checks used by the main admin dashboard complete. Those routes are also `noindex,nofollow,noarchive`. Guard redirects to `/admin/login.html`, including nested admin pages.
- Removed unused `images/portfolio/home.bat` developer batch script that publicly disclosed a local Windows file path; it was not a site asset or application dependency.
- The public homepage Square new-window link explicitly uses `rel=noopener noreferrer`, and homepage has a matching referrer-policy meta tag. No changes to checkout URL or forms.
- Existing `admin/dashboard.html` already had login guard and `noindex`; the approved-admin check was inspected, not replaced. The Supabase browser configuration includes a publishable/public key, **not evidence of a leaked service-role key**. The partner application uses Cloudflare Turnstile tokens in browser code.

## Still requires **production verification**

1. **Priority: Database authorization / RLS (not proven by frontend guards).** Review Supabase tables `profiles`, `partners`, `clients_leads`, `referrals`, `commissions`, `payouts`, `partner_applications` and security-definer RPCs (including `get_partner_dashboard`, `submit_client_intake`, application and admin actions). Confirm RLS and grants, admin-only mutations, partner-specific result filtering, auth.uid()-scoped writes, and no unintended `anon` reads. Never assume `role=admin` checked in JavaScript protects database endpoints.
2. **Response security headers VERIFIED LIVE October 26, 2026.** Owner supplied (a) Cloudflare Rules Overview showing an **Active** `Echo Craft Studio - Security Headers` Response Header Transform Rule scoped to hostname `echocraft.studio`, and (b) Chrome DevTools → Network → primary `https://echocraft.studio/` document response showing HTTP 200 and `Strict-Transport-Security: max-age=2592000`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Referrer-Policy: strict-origin-when-cross-origin`. **Complete; do not repeat the header setup/test absent a relevant change.** Strict enforcing CSP deliberately deferred for Square, Supabase, Turnstile, media and existing scripts compatibility.
3. **Priority: Turnstile backend verification.** Browser code receives a challenge token; confirm the RPC/Edge Function validates it server-side with the Turnstile secret and rate-limits anonymous application and intake requests. Client-side check alone does not prevent scripted submissions.
4. **Public deployment validation.** Verify updated legacy admin URLs redirect logged-out users to `/admin/login.html`; check authenticated admin still works; test public project form and partner sign-in. GitHub commit completion is not evidence of production deployment.
5. **Local browser data.** Legacy prototype EC Framework modules may keep client/project records in `localStorage`; avoid storing real sensitive client data there, migrate those workflows to authenticated database storage, or retire the prototype modules. Local storage is not a shared secure server datastore.
6. **CSP.** Plan a Content-Security-Policy-Report-Only compatibility pass and staged enforcement after authentication/CRM forms are tested.

## Scope and risk statement

- We identified and corrected publicly reachable legacy admin *UI* without guard, but this does not prove backend data were readable or that anyone exploited it. Direct HTML/JS URLs remain retrievable on static hosting even when browser guards hide/redirect them; protect actual data with RLS and server-side permissions.
- Never delete customer records, adjust referral percentages, modify application workflow, alter Square links, or replace Supabase/Cloudflare bindings as part of security hardening without verifying production behavior.
- Do not mark the website **vulnerability-free** until the production checks above are performed.
