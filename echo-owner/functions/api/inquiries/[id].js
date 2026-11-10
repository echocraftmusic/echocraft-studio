// Echo owner status update — authenticated by parent Access JWT middleware.
export async function onRequestPatch({request,env,params}){
  if(!env.ECHO_DB)return Response.json({error:"Owner database not configured"},{status:503});
  const id=params.id;
  if(typeof id!=="string"||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))
    return Response.json({error:"Invalid ID"},{status:400});
  if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return Response.json({error:"Expected JSON"},{status:415});
  const raw=await request.text();
  if(new TextEncoder().encode(raw).length>200)return Response.json({error:"Request too large"},{status:413});
  let payload;
  try{payload=JSON.parse(raw)}catch{return Response.json({error:"Invalid JSON"},{status:400})}
  if(payload?.acknowledge===true && Object.keys(payload).length!==1)
    return Response.json({error:"Acknowledge and status update must be separate requests"},{status:400});
  if(payload?.acknowledge===true && Object.keys(payload).length===1){
    try{
      const result=await env.ECHO_DB.prepare(
        "UPDATE inquiries SET owner_seen_at=COALESCE(owner_seen_at,datetime('now')) WHERE id=? AND tenant_id=?"
      ).bind(id,"home-demo").run();
      if(!result.meta?.changes)return Response.json({error:"Inquiry not found"},{status:404});
      return Response.json({acknowledged:true,id,sent:false});
    }catch{return Response.json({error:"Unable to acknowledge inquiry"},{status:503})}
  }
  if(!payload||!["pending","contacted","closed"].includes(payload.status))
    return Response.json({error:"Invalid status"},{status:400});
  try{
    const result=await env.ECHO_DB.prepare(
      "UPDATE inquiries SET status=?,updated_at=datetime('now') WHERE id=? AND tenant_id=?"
    ).bind(payload.status,id,"home-demo").run();
    if(!result.meta?.changes)return Response.json({error:"Inquiry not found"},{status:404});
    return Response.json({updated:true,id,status:payload.status,sent:false});
  }catch{return Response.json({error:"Unable to update inquiry"},{status:503})}
}
