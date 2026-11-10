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
