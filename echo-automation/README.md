# Echo Craft AI Automation — v0.1 foundation

**Status:** development branch only; no production deployment or live AI service is implied.

## Architecture

- `echo-demo/index.html`: self-contained sandbox showing an inquiry -> structured intake -> response draft -> simulated owner view. No visitor data is transmitted or stored.
- `echo-automation/worker.js`: reusable Cloudflare Worker interface supporting `GET /health` and `POST /api/analyze` using Workers AI if the `AI` binding exists. Uses a restrictive CORS allowlist, validation, conservative instruction prompt and a JSON-shaped response. Not deployed.
- `echo-automation/wrangler.toml.example`: suggested local configuration (must be reviewed before deploying).

## Intended reusable layers

1. Business configuration: business name, services, allowed origins, hours, policies, categories, contact channel.
2. Visitor interaction: reusable widget or standalone page.
3. Workflows: intake parsing, category, priority, *draft* response and pending-owner-review state.
4. Storage and notifications (not yet implemented): D1 per client, opt-in notification workflow; do not add production data to demo.
5. Security: Turnstile, per-IP rate limiting, request size limits, PII minimization, retention and deletion, human approval on actions, logs/alerts, cost monitoring.

## Guardrails

- No bookings, quotes, promises of service or external notifications automatically generated.
- The static demo is a deterministic **simulation**, never represented as real AI.
- Do not expose Workers AI publicly before abuse controls, resource caps, access testing and cost review.
- No end-user conversations or sensitive information should enter test/demo mode.
- Each client must have isolated credentials and storage; no hardcoded customer credentials or personal data.
- Keep production site and branch unchanged until reviewed and approved.

## Next milestones

- Restore the supplied Echo robot image as a compressed WebP asset after verifying source and dimensions, then wire it into the widget.
- Test Workers AI locally/staging, confirm available models/quotas, enforce request caps.
- Add D1 schema/migrations and private, authenticated owner dashboard.
- Add one real Echo Craft intake flow with consent, notification, and admin-only access.
- Build the reusable chat widget and integrate only into staging first.

## Private-AI test gate (added 2026-11-10)

The `/api/analyze` endpoint now **fails closed** unless both `STAGING_API_TOKEN` (Cloudflare secret) and `ECHO_RATE_LIMITER` are present. Tests must supply `Authorization: Bearer <secret>` from a **trusted server-side client only**. Do not place a secret in the demo page or frontend JavaScript.

- The body is streamed and capped at 2048 actual bytes, regardless of `Content-Length`; inquiry content is limited to 600 characters.
- The rate-limit binding is set at 5 calls/60 seconds, but Cloudflare documents native limits as **approximate and per location**. This is **not** a strict global monthly spend cap.
- The current demo intentionally remains **disconnected** from the AI endpoint. Do not change that until the public Turnstile/verification gateway, global budget controls, safe usage limits, and anonymous-session abuse mitigation are implemented.
- Before external staging, verify the Workers AI model ID and request shape, smoke-test success/error schemas, confirm account spending controls, and audit privacy.
- Existing `/health` exposes no secret and confirms only that code responds, not that AI is active.

### Minimum security test checklist

1. No secret configured -> `503`; no AI invocation.
2. Wrong/missing token -> `401`; no AI invocation.
3. Payload longer than 2048 actual bytes -> `413`; no AI invocation.
4. Invalid JSON -> `400`; no AI invocation.
5. Invalid business/empty inquiry -> `400`; no AI invocation.
6. Exhausted limiter -> `429`; no AI invocation.
7. AI binding absent -> `503`; no AI invocation.
8. Allowed and authenticated request with configured model -> limited JSON with `sent:false` and `saved:false`.
9. Never render or log private user content in public demo.

## Milestone: private D1 workflow (Nov 10, 2026)
- Cloudflare D1 created: `echo-automation-staging`, isolated from all client/other Echo Craft databases.
- `migrations/0001_inquiries.sql` added and applied on staging.
- `POST /api/intake` (private token + rate limiter): real Workers AI analyzes a fictional inquiry, creates one pending D1 record, and returns an ID with `saved:true`, `sent:false`.
- `GET /api/inquiries`: authenticated list for one fixed staging tenant (30 most recent).
- `PATCH /api/inquiries/:id`: authenticated status transition to pending, contacted, or closed.
- `POST /api/inquiries`: authenticated non-AI manual test record insertion.
- Public Worker URLs and preview URLs are **disabled**. No staging secret is configured, so routes fail closed; an accessible owner dashboard is **not** ready yet.
- Database presently contains no real leads. Never enter names, phone numbers, patient details or live contacts into the staging demo.
- Next: test live Worker via private auth; add Cloudflare Access-protected owner interface; ensure stricter global cost enforcement and anti-abuse before public visitor intake.

## Phase 7 — Private owner workspace and strict AI budget (2026-11-10)

- Added `migrations/0002_ai_daily_usage.sql` to the staging D1 database. All AI analysis paths reserve a slot through an atomic D1 `UPDATE ... WHERE used < 10 RETURNING used`, with a **10 attempted inferences / UTC day** hard cap for this Worker. It is not an account-wide Cloudflare billing limit and other account workloads are unaffected.
- Added native `ECHO_RATE_LIMITER` binding (5 requests/minute, approximate per Cloudflare location), while retaining the D1 budget guard.
- The staging Worker continues with public Workers URL and preview URLs disabled. `STAGING_API_TOKEN` setup through the connector was blocked; no insecure bypass was implemented.
- Added `echo-owner/public/index.html`: actual D1-backed inbox with Pending / Contacted / Closed buttons and no fake data fallback.
- Added `echo-owner/functions/api/inquiries/index.js` and `echo-owner/functions/api/inquiries/[id].js` for tenant-scoped reads/writes.
- Added `echo-owner/functions/_middleware.js` to validate Cloudflare Access JWT **cryptographically** (audience, issuer, expiration and RS256 signature) and block cross-site status changes.
- Created separate Cloudflare Pages project `echo-automation-owner-staging`, linked to this development branch. Production configuration holds the dedicated D1 binding and Access team/audience values.
- Created a restrictive Cloudflare Access application for `echo-automation-owner-staging.pages.dev`, with one owner-only identity policy matching existing private Studio access.
- Inserted one record into D1 with source `demo-seed` and a **FICTIONAL TEST** prefix. It is not a customer lead.
- The owner Pages build compiled Functions and deployed successfully. End-to-end authentication and owner status updates require a signed-in manual browser test before being described as verified.
- GitHub Actions backend tests pass after a test fixture syntax repair.

**Security boundary:** owner Pages is not a public lead intake endpoint. The open demonstration stays a simulation. No real person/contact details or live notifications in this staging database. Do not merge into main or connect public AI until the private login, JWT verification, API writes and payment safeguards are verified in-browser.

## Phase 8 — Real AI in private owner workspace

The owner-only Pages site now includes a private `/api/pilot-intake` action, authenticated by the existing Cloudflare Access app and signed JWT middleware. Cloudflare Pages has both `AI` and `ECHO_DB` bindings configured through `echo-owner/wrangler.toml`; Cloudflare confirmed a successful deploy with both bindings.

An owner can enter **fictional data only**, check the test-data confirmation, and run Workers AI (@cf/google/gemma-4-26b-a4b-it) for a service inquiry. Each attempt reserves a slot in the D1 `ai_daily_usage` ledger before the model is called, shared with the other staging Worker, with 10 attempted AI inferences per UTC day. Structured output is validated and inserted into the tenant-scoped inbox as a pending record. No email, booking or customer reply is sent.

The prior public `echo-automation-demo-staging.pages.dev` remains a no-data rule-based simulation, **not** connected to the private owner APIs. The separate staging Worker remains nonpublic; no browser API token is exposed. End-to-end real inference from a signed-in browser remains to be confirmed by the owner. The latest automated tests are under verification.

Next after owner validation: gather feedback on AI response quality; add a consentful client-facing data collection design, privacy retention, abuse protection and monitored notification integration before public release.

## Phase 9 — Two-turn real AI customer conversation (protected pilot)

The separate owner-only Pages project includes a black-and-gold simulated customer-side chat embedded above the existing owner queue, still behind Cloudflare Access. This **is actual AI** for two turns rather than hard-coded decision rules:

1. An owner acting as a **fictional customer** describes a service problem and confirms it contains no real personal information.
2. AI classifies it and asks exactly one relevant issue-specific follow-up question. D1 stores a conversation draft in `demo_conversations` (not a lead).
3. The owner answers the question. A second AI inference generates structured category, priority, summary, recommended owner action and a draft reply. The record remains in `awaiting_confirmation` and does **not** create an owner inquiry yet.
4. The user explicitly clicks **Approve and add to owner inbox**. D1 transactionally inserts a `conversation-pilot` inquiry and marks the draft completed. The UI reloads the real D1 inbox. No emails, calls or appointments are sent/booked.
5. A completed conversation can be restarted. Each AI inference reserves one of the **10 shared staging attempts per UTC day**; confirmation consumes no AI tokens.

Backend: `echo-owner/functions/api/conversation.js`; UI: `echo-owner/public/customer-chat.js`; migration: `migrations/0003_demo_conversations.sql`, applied in D1. Backend automated tests cover two-turn journey, no insertion before confirmation, daily limit, duplicate confirm and model failure.

The public demo at `echo-automation-demo-staging.pages.dev` remains unchanged and rules-based. The owner dashboard is private, not an end-user accessible production service. Do not input real names, emails, addresses or service requests. No automatic cleanup of chat drafts is implemented yet; set a retention policy before any live rollout.

## Phase 10 — Actionable owner handoff and emergency safeguards

- New shared module `echo-owner/functions/_lib/intake-policy.js` enforces safer **fictional** intake behavior, independent of model-generated text.
- Completed conversations now replace vague owner guidance and trailing troubleshooting questions with a meaningful owner action and honest customer acknowledgment. The customer reply is a **draft**, not a sent message; it makes no claims about appointments.
- Explicit gas leak/odor, sparking, smoke, fire or live-electrical danger stops routine AI intake and displays safety advice, without invoking AI or creating an owner inquiry. Danger first disclosed in the second conversational turn is also intercepted **before** another inference. A nonfunctioning gas stove without indications of a leak is not automatically classified as an emergency.
- The same hazard policy applies to the original single-step private pilot, which returns a safety warning without spending AI usage.
- Applied `migrations/0004_inquiry_owner_details.sql` to dedicated staging D1. New inquiries store `summary` and `owner_action` in addition to their customer message and suggested reply. The private owner API and dashboard display those details. Older test records remain readable even without these columns populated.
- Automated tests cover friendly completed replies, concrete owner next steps, common danger patterns, zero-AI-call safety stops and new hazards disclosed during follow-up.

Still a locked-down fictional test only. These are rule-based safeguards, not emergency monitoring or professional triage. Do not make the chat publicly available or claim emergency response, contact notifications or booked appointments. Existing in-progress conversations predate the fix; start a fresh fictional test to see new behavior.

## Phase 11 — Owner in-app notification workflow (Nov 10, 2026)

- Fixed the conversation completion UI: after D1 confirms submission, the review heading now reads **INQUIRY SUBMITTED — AWAITING OWNER FOLLOW-UP** rather than incorrectly saying "NOT SUBMITTED".
- Migrated `inquiries.owner_seen_at` in private staging D1. Preexisting five fictional inquiries were marked seen during rollout; newly inserted inquiries default to unseen.
- The authenticated owner GET `/api/inquiries` includes this field. The private dashboard shows an unread-alert banner and highlights new inquiries, refreshing while the tab is visible once per minute.
- Clicking **Acknowledge new inquiry** sends a separate authorized `PATCH /api/inquiries/:id` with `{ "acknowledge": true }`, sets an acknowledgment timestamp, and **does not** change Pending/Contacted/Closed workflow status. Mixed acknowledgment+status payloads are rejected.
- Seeded **one FICTIONAL ALERT TEST** home-services record with source `alert-demo`, unseen. No AI inference or external message was sent. Owner can use this to check the notification.
- Added automated tests verifying the independent alert and status behaviors; latest GitHub Actions workflow passed.
- This is an **in-app alert while the private owner site is open**. It does not send a push notification, email, SMS, or communicate with any customer. Never describe it as an externally delivered notification. Separate authenticated delivery credentials, explicit owner recipient approval, send logs, retries and privacy review are needed before implementing external owner notifications.
- Keep staging separate from the Echo Craft Studio production website; no merge to main.
