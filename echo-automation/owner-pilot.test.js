import test from "node:test";
import assert from "node:assert/strict";
import {onRequestPost} from "../echo-owner/functions/api/pilot-intake.js";

const URL="https://echo-automation-owner-staging.pages.dev/api/pilot-intake";
const request=(body)=>new Request(URL,{method:"POST",headers:{"content-type":"application/json"},
  body:JSON.stringify(body)});
function setup({limitReached=false,aiResponse,aiFailure=false}={}){
  const calls={model:0,records:[],limits:0,modelId:null};
  const env={
    ECHO_DB:{
      prepare(sql){
        return {bind(...args){return {
          async run(){
            if(sql.startsWith("INSERT INTO inquiries"))calls.records.push(args);
            return {meta:{changes:1}};
          },
          async first(){
            calls.limits++;
            return limitReached?null:{used:1};
          }
        }}};
      }
    },
    AI:{async run(modelId){
      calls.model++;calls.modelId=modelId;
      if(aiFailure)throw Error("failed");
      return aiResponse||{choices:[{message:{content:JSON.stringify({
        category:"Plumbing",priority:"normal",summary:"Sample sink leak",
        owner_action:"Review request",response_draft:"Thank you for contacting us."
      })}}]};
    }}
  };
  return {env,calls};
}
test("refuses real AI calls without fictional confirmation",async()=>{
  const {env,calls}=setup();
  const r=await onRequestPost({request:request({inquiry:"My sink is leaking at the cabinet.",fictional:false}),env});
  assert.equal(r.status,400);assert.equal(calls.model,0);assert.equal(calls.limits,0);
});
test("refuses missing AI binding",async()=>{
  const {env,calls}=setup();delete env.AI;
  const r=await onRequestPost({request:request({inquiry:"My sink is leaking at the cabinet.",fictional:true}),env});
  assert.equal(r.status,503);assert.equal(calls.limits,0);
});
test("enforces daily cap before billable inference",async()=>{
  const {env,calls}=setup({limitReached:true});
  const r=await onRequestPost({request:request({inquiry:"My sink is leaking at the cabinet.",fictional:true}),env});
  assert.equal(r.status,429);assert.equal(calls.model,0);assert.equal(calls.records.length,0);
});
test("real AI response saves pending fictional record",async()=>{
  const {env,calls}=setup();
  const r=await onRequestPost({request:request({inquiry:"My sink is leaking at the cabinet.",fictional:true}),env});
  assert.equal(r.status,201);
  const data=await r.json();
  assert.equal(data.saved,true);assert.equal(data.sent,false);assert.equal(data.status,"pending");
  assert.equal(calls.model,1);assert.equal(calls.modelId,"@cf/meta/llama-4-scout-17b-16e-instruct");assert.equal(calls.records.length,1);
  assert.equal(calls.records[0][1],"home-demo");assert.equal(calls.records[0][2],"private-ai-pilot");
});
test("model failure never saves and does not disclose internal errors",async()=>{
  const {env,calls}=setup({aiFailure:true});
  const r=await onRequestPost({request:request({inquiry:"My sink is leaking at the cabinet.",fictional:true}),env});
  assert.equal(r.status,502);assert.equal(calls.model,1);assert.equal(calls.records.length,0);
  assert.equal((await r.text()).includes("Error: failed"),false);
});

test("empty reasoning-only model reply is rejected before storage",async()=>{
  const {env,calls}=setup({aiResponse:{choices:[{finish_reason:"length",message:{content:"",reasoning_content:"internal thinking only"}}]}});
  const res=await onRequestPost({request:request({inquiry:"My fictional sink is leaking near the cabinet.",fictional:true}),env});
  assert.equal(res.status,502);
  assert.equal((await res.json()).code,"MODEL_INCOMPLETE");
  assert.equal(calls.records.length,0);
});
test("malformed model reply has a safe error and no record",async()=>{
  const {env,calls}=setup({aiResponse:{response:"not valid JSON"}});
  const res=await onRequestPost({request:request({inquiry:"My fictional sink is leaking near the cabinet.",fictional:true}),env});
  assert.equal(res.status,502);
  assert.equal((await res.json()).code,"MODEL_FORMAT");
  assert.equal(calls.records.length,0);
});
test("storage failure is distinguished from model output",async()=>{
  const {env}=setup();
  const original=env.ECHO_DB.prepare;
  env.ECHO_DB.prepare=(sql)=>{
    if(sql.startsWith("INSERT INTO inquiries"))return {bind:()=>({run:async()=>{throw Error("private DB error")}})};
    return original(sql);
  };
  const res=await onRequestPost({request:request({inquiry:"My fictional sink is leaking near the cabinet.",fictional:true}),env});
  assert.equal(res.status,503);
  assert.equal((await res.json()).code,"STORAGE_FAILED");
});
