// Reusable deterministic safeguards for Echo's fictional home-services staging pilot.
// Never use the model alone to determine emergency risk or promise business actions.
export function detectHazard(input) {
  const text = String(input || "").toLowerCase();
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
export function finalizeAnalysis(analysis, initialMessage, answer) {
  const issue = clean(analysis.summary || initialMessage,180);
  const category = clean(analysis.category,70) || "Home service";
  const hazard = detectHazard(initialMessage + " " + (answer || ""));
  if(hazard) return {
    ...analysis,
    category,priority:"review promptly",
    owner_action:hazard.ownerAction,
    response_draft:hazard.message,
    safety_warning:hazard.message
  };
  // An intake is already complete at this point. Do not ask the customer to
  // repeat questions or imply a booking/contact was made.
  const reply = "Thank you for the additional information about your " + category.toLowerCase() +
    " request. Our team can review the details and follow up about next steps and availability. No appointment has been confirmed.";
  const ownerAction = "Review the " + category.toLowerCase() + " inquiry (" + issue +
    "), assess urgency and contact the customer through an approved channel to discuss availability.";
  return {
    ...analysis,category,
    owner_action:clean(ownerAction,250),
    response_draft:clean(reply,250)
  };
}
