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

## Connected Supabase production read-only security review — 2026-10-26

**Connection:** The linked Supabase integration returned the active project used by the Studio frontend (verified against the public publishable config's Supabase URL). **Read-only inspection only**: `list_projects`, `list_tables`, `get_advisors(type=security)`, and SELECT queries of PostgreSQL security metadata/function definitions. No personal data, secrets, migrations or database records were modified or exported.

### Confirmed positives

- **All 10 public tables have RLS enabled**: `profiles`, `partner_applications`, `partners`, `referrals`, `commissions`, `payouts`, `payout_commissions`, `referral_visits`, `clients_leads`, `analytics_events`.
- The `clients_leads` table's ordinary authenticated SELECT/UPDATE/DELETE policies require an approved admin (role + status), and admin write policies check the role; commission/referral/payout tables use `private.is_approved_admin()`.
- The `profiles` SELECT policy scopes access to `auth.uid() = id`.
- `get_partner_dashboard()` checks `auth.uid()`, requires a linked active partner profile, and filters referrals, commissions, payouts and visits by the resolved partner ID.
- Inspected `approve_partner_application`, `delete_partner_application`, `get_admin_partner_activation_statuses`, `get_admin_referral_visits` and `remove_partner_from_program` definitions: administrative checks inside the privileged functions were present. Public `EXECUTE` grants on several functions remain unnecessary defense-in-depth exposure and should be narrowed after signature-by-signature review.

### Findings requiring remediation/verification (do not declare vulnerability-free)

1. **High — excessive RPC EXECUTE grants:** The Supabase Security Advisor reports **10 SECURITY DEFINER function signatures executable by `anon`** and **13 by `authenticated`**. Examples include privileged administrator functions `approve_partner_application` (one 3-argument legacy overload), `delete_partner_application`, `get_admin_referral_visits`, `get_admin_partner_activation_statuses`, and `remove_partner_from_program`. Their body checks mitigate unauthorized execution, but the `anon` grants needlessly expose callable endpoints. Plan **specific `REVOKE EXECUTE`** for admin-only RPC signatures; preserve intentional public RPCs (`submit_client_intake`, `submit_partner_application`, `resolve_partner_referral`) and inspect all frontend callers before modifying anything. Do not replace `SECURITY DEFINER` blindly.
2. **High — public form abuse protection:** `submit_client_intake` and `submit_partner_application` can be executed anonymously. Function definition inspection found **no Turnstile verification reference**. Frontend partner application collects a Turnstile token, but this is insufficient proof of server-side verification. Audit any intermediary Edge Function and anonymous invocation pathways, then implement server-side Turnstile verification and rate limiting without breaking forms. Direct invocation of public intake RPC may bypass frontend checks.
3. **Medium — authentication settings:** Security advisor reports email OTP expiry **greater than 1 hour** and **leaked-password protection disabled**. Review valid flows and available plan capabilities before changes.
4. **Low / intentional possibility — `referral_visits`:** RLS enabled but no policies. A privileged function records/reads visits. Confirm intended use; do not create broad policies.
5. **Medium — partner activation behavior:** The `mark_partner_activated()` function checks logged-in user and partner profile ownership, then marks the partner active. Confirm approved-application lifecycle so no self-activation is possible ahead of approval.
6. **Verification:** Do role-scoped negative tests (anon, ordinary authenticated, own partner, other partner, admin) using controlled test identities if available before declaring isolation complete. No unauthorized data extraction tests were performed.

**Reference documentation:** https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable ; https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable ; https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

**Change control:** No production database writes were made during this audit. Obtain explicit approval for a reviewed migration that removes unnecessary RPC execute grants and verify frontend compatibility. Maintain private customer/partner data confidentiality.

## Database authorization update — 2026-10-26

Owner-approved migration `restrict_anonymous_admin_rpc_execution_20261026` completed. Removed anonymous and PUBLIC execute grants for these administrator operations: `approve_partner_application(uuid,text,uuid)`, `delete_partner_application(uuid)`, `get_admin_partner_activation_statuses()`, `get_admin_referral_visits(integer)`, and `remove_partner_from_program(uuid)`.

Verification: anonymous execution now false for all five, while authenticated execution is retained for authenticated administrators (subject to in-function authorization). Supabase security advisor anonymous privileged-function warnings decreased from 10 to 5. Public intake, partner applications, referral resolution, and existing authenticated partner dashboard/activation behavior were not modified. No business records or RLS policies changed. Remaining reviews: partner-facing grants, server-side form protection, OTP expiration, breached-password protection, and browser regression testing.

## Partner application bypass closed — 2026-10-26

Production inspection confirmed that active Supabase Edge Function `submit-partner-application` (version 3) checks the Cloudflare Turnstile token with the Cloudflare Siteverify API, validates hostname and has a honeypot field before submitting via Supabase `service_role` to `public.submit_partner_application`.

**Issue:** The underlying `SECURITY DEFINER` SQL function had direct `EXECUTE` grants for both `anon` and `authenticated`, bypassing the Edge Function's Turnstile gate.

**Fix (owner-approved):** Applied Supabase migration `protect_partner_application_turnstile_boundary_20261026`, revoking direct SQL function execution from `PUBLIC`, `anon`, and `authenticated`; retained `service_role` execution for the existing Edge Function.

**Verified live through privilege introspection:** `anon=false`, `authenticated=false`, `service_role=true`. Security advisor anonymous privileged-function warning count reduced from 5 to 4, authenticated count from 13 to 12.

**No form data changed.** Edge Function source logic was not edited or redeployed. A successful end-to-end public application submission has not been retested after revocation. Separate `submit_client_intake` remains callable by anonymous visitors without server-side Turnstile; it needs a redesigned protected submission endpoint rather than blindly revoking access. Auth OTP duration and leaked-password warning remain pending dashboard configuration review; leaked-password protection is Pro-plan-or-above per Supabase documentation.

## Protected client-intake rollout — 2026-10-26

Owner authorized execution. Deployed new Supabase Edge Function `submit-client-intake` (version 2, active), using a server-side Cloudflare Turnstile Siteverify check, hostname restriction, honeypot, field lengths/required field checks and privileged server-to-database call. The service role key and Turnstile secret stay in server environment variables, not in public GitHub files.

GitHub `client-intake.html` now renders Turnstile and a hidden honeypot; `js/client-intake.js` invokes the Edge Function instead of directly calling `submit_client_intake`, preserving partner referral attribution. Code committed to main; no existing client records were edited.

**Rollout safety gate: NOT YET CLOSED:** The tool environment could not independently retrieve the live `echocraft.studio/client-intake.html` page or verify an actual successful end-to-end submission. Thus **anonymous execute permission on the old `submit_client_intake` database RPC was deliberately NOT revoked** to avoid interrupting real business leads if public deployment or server secrets are incomplete. Until the live form is validated and the old RPC is revoked, bypass resistance is partial. Do not mark the public intake as fully hardened.

Next: verify the new Turnstile widget appears and successfully submits a controlled non-customer test with the correct referral attribution; inspect the Edge Function logs; then remove direct `EXECUTE` from `PUBLIC`, `anon`, `authenticated` on the precisely identified `submit_client_intake` signature, retain `service_role`, and recheck Supabase advisors. Do not disable the public RPC early.

Auth OTP expiry and leaked-password protection settings remain unchanged; leaked-password protection may require an eligible Supabase plan.
