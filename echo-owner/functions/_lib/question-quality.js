// Deterministic quality safeguard for the private fictional pilot.
// This can replace a low-value model question, but is NOT model success.
export function refineQuestion(message,proposed){
 const original=String(message||"").toLowerCase();
 const question=String(proposed||"").trim();
 const q=question.toLowerCase();
 const leakUnderSink=/\b(?:sink|cabinet)\b/.test(original)&&/\b(?:under|underneath|beneath|below)\b/.test(original)&&/\b(?:drip|leak|water)\b/.test(original);
 const sourceGuess=/\b(?:faucet|tap)\b/.test(q)&&/\b(?:pipe|drain|underneath|under the sink|under the cabinet)\b/.test(q);
 // This is not always factually redundant, but it often asks a non-expert to
 // diagnose which component failed. Prefer an observable urgency signal.
 if(leakUnderSink&&sourceGuess){
   return {question:"Is water still collecting or spreading on the floor, or is it staying contained?",origin:"rule_override",reason:"Replaced component-identification question with observable water-spread triage."};
 }
 return {question,origin:"model",reason:null};
}
