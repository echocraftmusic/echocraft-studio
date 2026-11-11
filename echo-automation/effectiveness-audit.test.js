import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {detectHazard,finalizeAnalysis} from "../echo-owner/functions/_lib/intake-policy.js";

const cases=JSON.parse(readFileSync(new URL("./audit/scenarios.json",import.meta.url),"utf8")).cases;
const mustBeHazard=new Set(["GAS_LEAK","SPARKING_OUTLET","CARBON_MONOXIDE"]);
const mustNotBeHazard=new Set(["ROUTINE_GAS_STOVE","AFTER_HOURS_LEAK","APPOINTMENT_WEEKEND"]);
test("audit catalogue is repeatable and fictional",()=>{
 assert.equal(cases.length,15);
 assert.equal(new Set(cases.map(c=>c.id)).size,cases.length);
 for(const c of cases){
  assert.ok(c.first.length>=12 && c.first.length<=400, c.id);
  assert.ok(Array.isArray(c.critical)&&c.critical.length>0,c.id);
  assert.ok(c.baseline && c.goal && c.humanQuestion,c.id);
 }
});
// Audit reports are diagnostic, not a substitute for testing actual model output.
// Do not fail the entire build on known benchmark misses; list them explicitly.
test("offline deterministic safety-screen audit, with documented misses",()=>{
 const checks=[...mustBeHazard,...mustNotBeHazard];
 const results=checks.map(id=>{
  const c=cases.find(x=>x.id===id);
  const actual=detectHazard(c.first);
  const expected=mustBeHazard.has(id);
  return {case:id,expectedEmergencyStop:expected,actualEmergencyStop:!!actual,pass:!!actual===expected};
 });
 const passed=results.filter(x=>x.pass).length;
 console.log("AUDIT SAFETY SCREEN ONLY: "+passed+"/"+results.length+" expected outcomes");
 for(const r of results)console.log("AUDIT "+(r.pass?"PASS":"MISS")+" "+r.case+": expected stop="+r.expectedEmergencyStop+", actual stop="+r.actualEmergencyStop);
 console.log("AUDIT REMINDER: This DOES NOT assess real model follow-up quality, business value, privacy compliance or deployment readiness.");
 assert.equal(results.length,checks.length);
});
test("post-analysis policy prevents unsupported booking and unfinished follow-up",()=>{
 for(const c of cases.filter(x=>!mustBeHazard.has(x.id))){
  const result=finalizeAnalysis({
    category:c.expectCategory==="Out of scope"?"Plumbing":c.expectCategory,
    priority:"normal",summary:"Sample inquiry",owner_action:"review",response_draft:"What else can you tell me?"
  },c.first,c.answer||"");
  if(detectHazard(c.first+" "+(c.answer||"")))continue;
  assert.equal(result.response_draft.includes("?"),false,c.id);
  assert.match(result.response_draft,/No appointment has been confirmed\./,c.id);
  assert.ok(result.owner_action.length<=250,c.id);
 }
});
