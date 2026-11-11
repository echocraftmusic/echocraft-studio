import test from "node:test";
import assert from "node:assert/strict";
import {detectHazard,finalizeAnalysis} from "../echo-owner/functions/_lib/intake-policy.js";
import {onRequestPost as conversation} from "../echo-owner/functions/api/conversation.js";
import {onRequestPost as single} from "../echo-owner/functions/api/pilot-intake.js";

const normal={category:"Plumbing",priority:"normal",summary:"Leak under kitchen sink",owner_action:"review",
  response_draft:"Do you see any puddles? Can you answer one more question?"};

test("completed conversation replaces unanswered follow-up with customer acknowledgment",()=>{
  const result=finalizeAnalysis(normal,"Kitchen sink leaking under the cabinet.","Coming from underneath.");
  assert.match(result.response_draft,/team can review/i);
  assert.match(result.response_draft,/no appointment has been confirmed/i);
  assert.doesNotMatch(result.response_draft,/\?/);
  assert.match(result.owner_action,/Unresolved:|Owner review:/i);
  assert.match(result.owner_action,/Owner review/i);
  assert.doesNotMatch(result.owner_action,/contact the customer/i);
  assert.match(result.customer_facts,/Kitchen sink leaking/);
  assert.match(result.customer_facts,/Coming from underneath/);
  assert.ok(result.owner_action.length<=250);
  assert.ok(result.response_draft.length<=250);
});
test("urgent gas leak, electrical arcing and fire are flagged; routine broken stove is not",()=>{
  assert.equal(detectHazard("I smell gas near my stove.")?.kind,"gas");
  assert.equal(detectHazard("There is a natural gas leak.")?.kind,"gas");
  assert.equal(detectHazard("Sparks are coming from an outlet.")?.kind,"electrical_or_fire");
  assert.equal(detectHazard("Smoke coming from the wiring.")?.kind,"electrical_or_fire");
  assert.equal(detectHazard("The gas stove is not working."),null);
  assert.equal(detectHazard("My gas stove will not ignite, but I don't smell gas and there is no hissing."),null);
  assert.equal(detectHazard("I don't smell gas, but the gas line is hissing.")?.kind,"gas");
  assert.equal(detectHazard("There is no gas leak; I just need an oven repair."),null);
  assert.equal(detectHazard("The kitchen sink is dripping."),null);
});
const call=(handler,env,body)=>handler({request:new Request("https://echo-automation-owner-staging.pages.dev/api/test",{
  method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)
}),env});
test("conversation safety-stop skips AI, D1 reservations, and owner records",async()=>{
  let called=0;
  const env={AI:{async run(){called++;throw Error("AI should not be invoked")}},
    ECHO_DB:{prepare(){called++;throw Error("DB should not be invoked")}}};
  const res=await call(conversation,env,{action:"start",fictional:true,message:"I smell gas and hear a hissing sound near the stove."});
  assert.equal(res.status,200);
  const data=await res.json();
  assert.equal(data.step,"safety");
  assert.equal(data.saved_inquiry,false);
  assert.match(data.safety_warning,/leave the building/i);
  assert.equal(called,0);
});
test("single-step intake stops dangerous fictional request before AI and storage",async()=>{
  let called=0;
  const env={AI:{async run(){called++;throw Error("unexpected AI")}},ECHO_DB:{prepare(){called++;throw Error("unexpected DB")}}};
  const res=await call(single,env,{fictional:true,inquiry:"I smell gas near the furnace and hear hissing."});
  assert.equal(res.status,422);
  assert.equal((await res.json()).code,"SAFETY_HAZARD");
  assert.equal(called,0);
});
