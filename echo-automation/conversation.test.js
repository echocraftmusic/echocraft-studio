import test from "node:test";
import assert from "node:assert/strict";
import {onRequestPost} from "../echo-owner/functions/api/conversation.js";

function fixture({cap=10,modelFailure=false}={}){
  const state={calls:0,used:0,conversations:new Map(),inquiries:new Map()};
  const mock={
    ECHO_DB:{
      prepare(sql){
        return {
          bind(...args){
            return {
              async run(){
                if(sql.startsWith("INSERT OR IGNORE INTO ai_daily_usage"))return {meta:{changes:1}};
                if(sql.startsWith("INSERT INTO demo_conversations")){
                  const [id,tenant_id,initial_message,question,category,priority,status]=args;
                  state.conversations.set(id,{id,tenant_id,initial_message,question,category,priority,status});
                  return {meta:{changes:1}};
                }
                if(sql.startsWith("INSERT INTO inquiries")){
                  const draft=state.conversations.get(args[0]);
                  if(draft&&draft.status==="awaiting_confirmation")state.inquiries.set(args[0],{id:args[0],message:draft.initial_message+" | Follow-up: "+draft.answer,status:"pending"});
                  return {meta:{changes:draft&&draft.status==="awaiting_confirmation"?1:0}};
                }
                if(sql.startsWith("UPDATE demo_conversations SET status='completed'")){
                  const item=state.conversations.get(args[0]);if(item)item.status='completed';
                  return {meta:{changes:item?1:0}};
                }
                throw Error("Unexpected SQL run "+sql);
              },
              async first(){
                if(sql.startsWith("UPDATE ai_daily_usage")){if(state.used>=cap)return null;state.used++;return {used:state.used};}
                if(sql.startsWith("SELECT id,initial_message"))return state.conversations.get(args[0])||null;
                if(sql.startsWith("SELECT status FROM demo_conversations"))return state.conversations.get(args[0])||null;
                if(sql.startsWith("UPDATE demo_conversations SET answer=")){
                  const row=state.conversations.get(args[9]);
                  if(!row||row.status!=="awaiting_answer")return null;
                  Object.assign(row,{answer:args[0],category:args[1],priority:args[2],summary:args[3],
                    owner_action:args[4],response_draft:args[5],
                    customer_facts:args[6],open_questions:args[7],next_step:args[8],status:"awaiting_confirmation"});
                  return {id:row.id};
                }
                throw Error("Unexpected SQL first "+sql);
              }
            };
          }
        };
      },
      async batch(actions){return Promise.all(actions.map(action=>action.run()));}
    },
    AI:{
      async run(model,request){
        state.calls++;if(modelFailure)throw Error("private model failure");
        const isFirst=request.messages[0].content.includes("ask exactly ONE relevant follow-up");
        return {choices:[{finish_reason:"stop",message:{content:JSON.stringify(
          isFirst?{category:"Plumbing",priority:"normal",question:"How long has the leak been happening?"}:
          {category:"Plumbing",priority:"normal",summary:"Cabinet sink leak noticed this morning.",
            open_questions:"Whether the leak is ongoing or intermittent.",
            next_step:"Review whether the reported leak needs prompt attention before arranging service."})}}]};
      }
    }
  };
  return {env:mock,state};
}
function call(env,body){
  const request=new Request("https://echo-automation-owner-staging.pages.dev/api/conversation",{
    method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)
  });
  return onRequestPost({request,env});
}
test("full fictional customer dialogue saves only after confirmation",async()=>{
  const {env,state}=fixture();
  let res=await call(env,{action:"start",fictional:true,message:"Fictional sink leak in kitchen cabinet."});
  assert.equal(res.status,201);const first=await res.json();
  assert.equal(first.step,"followup");assert.equal(first.saved_inquiry,false);
  assert.match(first.question,/leak/);
  assert.equal(state.inquiries.size,0);
  res=await call(env,{action:"answer",id:first.id,message:"It started this morning."});
  assert.equal(res.status,200);const second=await res.json();
  assert.equal(second.step,"review");assert.equal(state.inquiries.size,0);
  assert.match(second.analysis.customer_facts,/Fictional sink leak/);
  assert.match(second.analysis.customer_facts,/It started this morning/);
  assert.match(second.analysis.open_questions,/ongoing or intermittent/);
  assert.match(second.analysis.next_step,/Review whether/);
  assert.doesNotMatch(second.analysis.owner_action,/contact the customer/i);
  assert.match(second.analysis.response_draft,/review/);
  res=await call(env,{action:"confirm",id:first.id,confirm:true});
  assert.equal(res.status,201);assert.equal((await res.json()).saved_inquiry,true);
  assert.equal(state.inquiries.size,1);assert.equal(state.calls,2);
  assert.equal(state.used,2);
  res=await call(env,{action:"confirm",id:first.id,confirm:true});
  assert.equal(res.status,409);assert.equal(state.inquiries.size,1);
  assert.equal(state.calls,2);
});
test("Workers AI direct structured-object response starts a valid conversation",async()=>{
  const {env,state}=fixture();
  const original=env.AI.run;
  env.AI.run=async(model,req)=>{
    state.calls++;
    return {response:{category:"plumbing issue",priority:"normal",question:"How long has the leak been happening?"},choices:[{finish_reason:"stop"}]};
  };
  const res=await call(env,{action:"start",fictional:true,message:"My fictional kitchen sink is leaking under the cabinet."});
  assert.equal(res.status,201);
  const result=await res.json();
  assert.equal(result.step,"followup");
  assert.equal(result.question,"How long has the leak been happening?");
  assert.equal(state.conversations.size,1);
  assert.equal(state.inquiries.size,0);
  assert.equal(state.used,1);
});
test("fictional confirmation required before spending AI allowance",async()=>{
  const {env,state}=fixture();
  const r=await call(env,{action:"start",message:"Kitchen sink leaking in my house."});
  assert.equal(r.status,400);assert.equal(state.calls,0);assert.equal(state.used,0);
});
test("AI daily cap blocks new conversations before inference",async()=>{
  const {env,state}=fixture({cap:0});
  const r=await call(env,{action:"start",fictional:true,message:"My fictional sink leaks on the floor."});
  assert.equal(r.status,429);assert.equal(state.calls,0);assert.equal(state.conversations.size,0);
});
test("model error does not create an owner inquiry",async()=>{
  const {env,state}=fixture({modelFailure:true});
  const r=await call(env,{action:"start",fictional:true,message:"My fictional sink leaks on the floor."});
  assert.equal(r.status,502);assert.equal(state.inquiries.size,0);assert.equal(state.used,1);
});
test("cannot confirm without first answering Echo",async()=>{
  const {env,state}=fixture();
  const first=await call(env,{action:"start",fictional:true,message:"My fictional sink leaks on the floor."});
  const data=await first.json();
  const r=await call(env,{action:"confirm",id:data.id,confirm:true});
  assert.equal(r.status,409);assert.equal(state.inquiries.size,0);
});

test("a new gas-leak disclosure in the follow-up ends the chat before another AI call",async()=>{
  const {env,state}=fixture();
  const first=await call(env,{action:"start",fictional:true,message:"My fictional stove is not working correctly."});
  assert.equal(first.status,201);
  const id=(await first.json()).id;
  const beforeCalls=state.calls,beforeUsed=state.used;
  const response=await call(env,{action:"answer",id,message:"Now I smell gas near the stove."});
  assert.equal(response.status,200);
  const data=await response.json();
  assert.equal(data.step,"safety");
  assert.match(data.safety_warning,/leave the building/i);
  assert.equal(data.saved_inquiry,false);
  assert.equal(state.calls,beforeCalls);
  assert.equal(state.used,beforeUsed);
  assert.equal(state.inquiries.size,0);
});

test("owner opts into no-credit rule-based recovery after failed second-stage AI",async()=>{
  const {env,state}=fixture();
  const start=await call(env,{action:"start",fictional:true,message:"The kitchen drain is making a gurgling noise."});
  assert.equal(start.status,201);
  const {id}=await start.json();
  env.AI.run=async()=>{state.calls++;throw Error("model returned unusable JSON")};
  const failed=await call(env,{action:"answer",id,message:"It happens before using the sink."});
  assert.equal(failed.status,502);
  const error=await failed.json();
  assert.equal(error.recoverable,true);
  assert.equal(state.conversations.get(id).status,"awaiting_answer");
  const before=state.calls,usedBefore=state.used;
  const recovered=await call(env,{action:"recover",id,message:"It happens before using the sink."});
  assert.equal(recovered.status,200);
  const data=await recovered.json();
  assert.equal(data.analysis_origin,"rules_fallback");
  assert.equal(data.model_succeeded,false);
  assert.match(data.analysis.summary,/RULE-BASED RECOVERY/);
  assert.equal(state.calls,before);
  assert.equal(state.used,usedBefore);
  assert.equal(state.inquiries.size,0);
  assert.equal(state.conversations.get(id).status,"awaiting_confirmation");
  const confirm=await call(env,{action:"confirm",id,confirm:true});
  assert.equal(confirm.status,201);
  assert.equal(state.inquiries.size,1);
  assert.match(state.conversations.get(id).summary,/RULE-BASED RECOVERY/);
});
test("cannot recover an already-completed conversation",async()=>{
  const {env,state}=fixture();
  const start=await call(env,{action:"start",fictional:true,message:"My fictional sink is dripping."});
  const {id}=await start.json();
  const first=await call(env,{action:"recover",id,message:"Only in the evening."});
  assert.equal(first.status,200);
  const second=await call(env,{action:"recover",id,message:"Only in the evening."});
  assert.equal(second.status,409);
  assert.equal(state.used,1);
  assert.equal(state.inquiries.size,0);
});
