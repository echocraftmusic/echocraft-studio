import test from "node:test";
import assert from "node:assert/strict";
import {onRequestPatch} from "../echo-owner/functions/api/inquiries/[id].js";
import {onRequestGet} from "../echo-owner/functions/api/inquiries/index.js";
const id="b6b0a5ef-d17f-4b1f-a7e2-e70a3e2f728c";
function fixture(){
 const state={seen:null,status:"pending",writes:[],records:[{
   id,tenant_id:"home-demo",source:"conversation-pilot",
   message:"Fictional sink leak",category:"Plumbing",priority:"normal",
   suggested_reply:"Thanks",status:"pending",owner_seen_at:null
 }]};
 const env={ECHO_DB:{prepare(sql){return {bind(...args){return {
   async all(){return {results:state.records}},
   async run(){
     state.writes.push({sql,args});
     if(sql.startsWith("UPDATE inquiries SET owner_seen_at")){
       if(args[0]!==id||args[1]!=="home-demo")return {meta:{changes:0}};
       state.seen=state.seen||"2026-11-10 20:00:00";
       state.records[0].owner_seen_at=state.seen;
       return {meta:{changes:1}};
     }
     if(sql.startsWith("UPDATE inquiries SET status")){
       state.status=args[0];state.records[0].status=args[0];
       return {meta:{changes:1}};
     }
     throw Error("Unexpected SQL");
   }
 };}};}}};
 return {env,state};
}
const patch=(env,body)=>onRequestPatch({
 request:new Request("https://example.invalid/api/inquiries/"+id,{
 method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify(body)}),
 env,params:{id}
});
test("owner sees unread flag, acknowledges without affecting workflow status",async()=>{
 const {env,state}=fixture();
 let r=await onRequestGet({env});
 assert.equal(r.status,200);
 assert.equal((await r.json()).inquiries[0].owner_seen_at,null);
 r=await patch(env,{acknowledge:true});
 assert.equal(r.status,200);
 assert.equal((await r.json()).acknowledged,true);
 assert.equal(state.status,"pending");
 assert.equal(state.writes.length,1);
 assert.match(state.writes[0].sql,/COALESCE\(owner_seen_at/);
 r=await onRequestGet({env});
 assert.ok((await r.json()).inquiries[0].owner_seen_at);
});
test("owner can change lead status separately from alert acknowledgment",async()=>{
 const {env,state}=fixture();
 const r=await patch(env,{status:"contacted"});
 assert.equal(r.status,200);
 assert.equal(state.status,"contacted");
 assert.equal(state.seen,null);
});
test("invalid acknowledgment request does not mutate D1",async()=>{
 const {env,state}=fixture();
 const r=await patch(env,{acknowledge:true,status:"closed"});
 assert.equal(r.status,400);
 assert.equal(state.writes.length,0);
});
