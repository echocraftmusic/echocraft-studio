import test from "node:test";
import assert from "node:assert/strict";
import {refineQuestion} from "../echo-owner/functions/_lib/question-quality.js";
import {onRequestPost} from "../echo-owner/functions/api/conversation.js";

test("under-cabinet leak model source-guess question is replaced transparently",()=>{
 const r=refineQuestion(
  "It's late, and water is dripping steadily from the cabinet underneath my kitchen sink. Can someone help tomorrow?",
  "Is the dripping water coming from the faucet or one of the pipes under the sink?");
 assert.equal(r.origin,"rule_override");
 assert.match(r.question,/collecting or spreading/i);
 assert.doesNotMatch(r.question,/faucet/i);
});
test("unrelated, useful model follow-up is preserved",()=>{
 const r=refineQuestion("Our AC is blowing hot air.", "How long has it been happening?");
 assert.deepEqual({origin:r.origin,question:r.question},{origin:"model",question:"How long has it been happening?"});
});
test("another sink question about water spread is not overridden",()=>{
 const r=refineQuestion("Water leaks beneath the sink.", "Is water spreading onto the floor?");
 assert.equal(r.origin,"model");
});
test("AI daily cap on second turn offers no-credit recovery, but never calls AI",async()=>{
 let used=0,called=0;
 const id="11111111-2222-4333-8444-555555555555";
 const env={AI:{async run(){called++;throw Error("No AI should run");}},
 ECHO_DB:{prepare(sql){return {bind(){return {
 async run(){return {meta:{changes:1}};},
 async first(){
  if(sql.startsWith("SELECT id,initial_message"))return {id,initial_message:"Fictional kitchen sink leaking below cabinet",question:"How long?",category:"Plumbing",priority:"normal",status:"awaiting_answer"};
  if(sql.startsWith("UPDATE ai_daily_usage"))return null;
  throw Error("Unexpected query "+sql);
 }
 };}};}}};
 const res=await onRequestPost({env,request:new Request("https://staging.example/api/conversation",{
  method:"POST",headers:{"content-type":"application/json"},
  body:JSON.stringify({action:"answer",id,message:"Water is spreading across the floor."})
 })});
 assert.equal(res.status,429);
 const data=await res.json();
 assert.equal(data.recoverable,true);
 assert.equal(data.code,"DAILY_LIMIT");
 assert.equal(called,0);
});
