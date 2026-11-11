// Reusable deterministic safeguards for Echo's fictional home-services staging pilot.
// Never use the model alone to determine emergency risk or promise business actions.
export function detectHazard(input) {
  const raw = String(input || "").toLowerCase();
  // A user explicitly denying a gas smell or leak should not be treated as
  // reporting one. Other positive evidence (e.g. a hissing gas line, flames)
  // must still trigger the alert. This limited rule is not emergency triage.
  const text = raw
    .replace(/\b(?:don't|dont|do not|can't|cannot|never|not|no)\s+(?:currently\s+)?(?:smell|detect|notice)\s+(?:any\s+)?(?:gas|propane|natural gas)\b/g," absence noted ")
    .replace(/\b(?:no|not|without)\s+(?:any\s+)?(?:gas leak|gas smell|gas odor|hissing)\b/g," negated-symptom ");
  const gas = /\b(smell|odor|odour|leak|hissing|fumes?)\b.{0,48}\b(gas|propane|natural gas)\b|\b(gas|propane|natural gas)\b.{0,48}\b(smell|odor|odour|leak|hissing|fumes?)\b|\brotten eggs?\b/.test(text);
  const electrical = /\b(sparks?|arcing|electrical fire|electric shock|exposed live wire|burning outlet|smoking outlet)\b/.test(text);
  const fire = /\b(flames?|house fire|smoke coming from|smoke pouring|carbon monoxide alarm)\b/.test(text);
  if (gas) return {
    kind: "gas",priority: "review promptly",
    message: "If you suspect a gas leak, leave the building immediately. From a safe location, call emergency services or your gas utility's emergency number. Do not use switches, flames, or appliances inside. This chat cannot provide emergency assistance.",
    ownerAction: "Potential gas leak flagged. Do not offer routine scheduling as an emergency response; review the report separately and follow emergency procedures."
  };
  if (electrical || fire) return {
    kind: "electrical_or_fire",priority: "review promptly",
    message: "If there is active sparking, fire, smoke, or an immediate electrical danger, move to safety and contact emergency services from a safe location. Do not touch affected equipment. This chat cannot provide emergency assistance.",
    ownerAction: "Possible fire or electrical hazard flagged. Do not treat as a standard appointment request; review and follow emergency procedures."
  };
  return null;
}
function clean(value, max = 180) {
  return String(value || "").replace(/[\s\u0000-\u001f]+/g," ").trim().slice(0,max);
}
// Evidence-based owner handoff. "Customer reported" reflects user statements,
// NOT a verified diagnosis or a claim that the business has contacted anyone.
export function finalizeAnalysis(analysis, initialMessage, answer) {
  const category=clean(analysis.category,70)||"Home service";
  const customerFacts=clean(initialMessage,400)+" | Customer clarification: "+clean(answer,400);
  const hazard=detectHazard(initialMessage+" "+(answer||""));
  if(hazard)return {
    ...analysis,category,priority:"review promptly",
    customer_facts:customerFacts,
    open_questions:"Safety details require direct emergency assessment; chat intake stopped.",
    next_step:"Emergency safety stop: do not treat this as routine scheduling.",
    owner_action:hazard.ownerAction,response_draft:hazard.message,
    safety_warning:hazard.message
  };
  // Do not let AI-generated descriptions replace the actual evidence.
  const unknowns=clean(analysis.open_questions,180)||"Specific cause and urgency have not been verified.";
  const step=clean(analysis.next_step,180)||
    "Review the customer report, clarify what is unresolved, and decide whether this is an appropriate service request.";
  // The owner cannot contact the person from this fictional staging test:
  // no contact method is collected or authorized.
  const ownerAction=clean("Unresolved: "+unknowns+" | Owner review: "+step,250);
  const reply="Thank you for the additional information about your "+
    category.toLowerCase()+" request. Our team can review the details and follow up about next steps and availability. No appointment has been confirmed.";
  return {
    ...analysis,category,customer_facts:customerFacts,
    open_questions:unknowns,next_step:step,
    owner_action:ownerAction,response_draft:clean(reply,250)
  };
}
