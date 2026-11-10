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
                  const row=state.conversations.get(args[6]);
                  if(!row||row.status!=="awaiting_answer")return null;
                  Object.assign(row,{answer:args[0],category:args[1],priority:args[2],summary:args[3],
                    owner_action:args[4],response_draft:args[5],status:"awaiting_confirmation"});
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
            owner_action:"Review possible service availability.",
            response_draft:"Thank you for reaching out. We'll review the request and follow up."})}}]};
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
