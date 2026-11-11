# Phase 12 — Retrospective of two REAL Workers AI conversations

**Recorded:** 2026-11-11 (review of fictional owner-staging conversations created 2026-11-10). **No new AI calls were made for this retrospective.** Source: protected D1 table `demo_conversations`; identifiers omitted. These are two runs of **the same scenario**, not two independent scenario types.

## Conversation A — Before final-response policy fix

- Fictional initial request: "My kitchen sink is dripping under the cabinet, and I'd like someone to take a look."
- Echo's model question: "Is the drip coming from the faucet itself or from underneath, like from the pipes or connections?"
- Customer's response: "It looks like it's coming from underneath".
- Model-derived final category: `plumbing issue`. Priority: `normal`. Summary: `Kitchen sink dripping from underneath`.
- The stored owner action was only `review`.
- Stored drafted reply asked additional questions: "could you please check if the drip is steady or intermittent and if you've noticed any water damage or leaks under the cabinet?"
- **Assessment:** The question was mostly redundant with "under the cabinet" in the initial message. It did not meaningfully improve the owner summary. Owner action lacked specificity. Follow-up was left incomplete despite the two-turn format. Echo offered **no demonstrated advantage** over capturing the original free-text description.

## Conversation B — After final-response policy fix

- Same fictional initial request.
- Echo's model question: "Is the drip coming from the faucet itself or from underneath, like from a pipe or drain?"
- Customer answered: "only see it from underneath".
- Model-derived final category: `plumbing`. Priority: `normal`. Summary: `Kitchen sink dripping from underneath near pipe or drain`.
- The final owner action says to review the inquiry, assess urgency, and contact the customer through an approved channel about availability.
- The final draft politely acknowledges the request and explicitly says no appointment was confirmed.
- **Assessment:** The question again largely repeats known information. "Near pipe or drain" is a possibility suggested by Echo, **not verified by the answer**; it may overstate the evidence. The polished owner action and acknowledgment were generated or overwritten by deterministic `finalizeAnalysis` code, so they are **not evidence of better AI reasoning**. Moreover, this staging conversation deliberately collects **no contact information**, so the recommendation to "contact the customer" cannot yet be performed from the dashboard as-is.

## Comparison to the non-AI baseline

A correctly built contact form could have captured "sink dripping under cabinet" in one message, saved it, and notified an owner without any model inference. Neither model question added reliable distinguishing information in these two completed conversations. No actual reduction in owner time or missed leads has been measured.

**Provisional result: FAIL for demonstrable incremental clarification on this one repeated scenario.** This is **not** a claim that Echo fails all plumbing or home-service scenarios, and **not** an overall model accuracy percentage.

## Required next experiments

1. Run the **UNCERTAIN_DRAIN** fictional scripted case through the existing private owner site; measure whether the follow-up surfaces an unknown fixture or trigger (e.g., after dishwasher use).
2. Run the **AFTER_HOURS_LEAK** fictional case; verify urgency characterization, no promise of availability, and owner action.
3. Run each test at least twice on separate opportunities to assess consistency; record model calls against the existing per-UTC-day limit, and log outcomes without selecting only successful examples.
4. Compare to a pre-defined smart form that captures service, issue, urgency and preferred time. Owner must time both variants and indicate whether the AI output is genuinely more actionable.
5. Repair: question generation should be scored for **information gain** (never ask what the first message already establishes). Add an owner instruction that distinguishes **known evidence** from unverified guesses. Avoid asserting "contact customer" is executable until a consent-based contact channel exists.

**Important:** An owner-only, two-step pilot with no real contact details cannot demonstrate autonomous customer follow-up or appointment booking. No public deployment or premium-price claims are authorized.

## Third live AI attempt — uncertain kitchen gurgling (2026-11-11)

The owner tried **UNCERTAIN_DRAIN** with fictional message "There's a weird gurgling sound in my kitchen and sometimes a bad smell. I'm not sure what's wrong." The real model asked: "Can you tell me more about when the gurgling sound and bad smell occur, such as during or after using the sink?" This was **useful** because timing was not present in the initial message. The owner typed "its before we use the sink" (different from the scripted answer; do not misattribute). The second-stage model failed and the UI reported it could not prepare a complete draft. Protected D1 shows the conversation still **awaiting_answer**, with `answer=NULL`, and the daily AI usage ledger at three attempts (including this initial question and the failed completion). The generic catch previously hid exact model failure cause, so it is **unknown** whether the cause was response shape, invalid model output or an AI provider error. **Do not claim a confirmed root cause.** No owner inquiry was saved.

**Outcome: Partial information gain in the first turn; end-to-end completion FAILED.** This is important counterevidence against charging premium prices today.

### Remediation (not an AI-quality success)

Added an explicit authenticated **Recover without AI (rule-based draft)** button after a second-turn `MODEL_ERROR`. The recovery endpoint reads the original question and owner-supplied fictional answer, generates a clearly marked, conservative intake draft, and requires owner approval to submit. It does **not** call Workers AI or consume another inference. The saved summary begins `[RULE-BASED RECOVERY]`; the UI clearly states the model failed. Two new tests exercise this path. The flow's normal two-turn AI remains unchanged for ongoing effectiveness tests. The previous in-browser session may need restarting if the page is refreshed or its one-hour conversation TTL has expired; the system does not silently reconstruct it.

**Next engineering need:** safe error-category diagnostics (without logging conversation PII), and quality improvements to avoid excessive prompt complexity/strict-response failures. A robust fallback protects operations but does not establish AI effectiveness.
