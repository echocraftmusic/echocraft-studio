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
