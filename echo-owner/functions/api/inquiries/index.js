// Echo owner queue — D1-backed, with Access JWT middleware inherited from /functions.
export async function onRequestGet({env}){
  if(!env.ECHO_DB)return Response.json({error:"Owner database not configured"},{status:503});
  try {
    const result=await env.ECHO_DB.prepare(
      "SELECT id,tenant_id,source,message,category,priority,suggested_reply,summary,owner_action,status,created_at,updated_at,owner_seen_at FROM inquiries WHERE tenant_id=? ORDER BY created_at DESC LIMIT 30"
    ).bind("home-demo").all();
    return Response.json({inquiries:result.results||[]});
  } catch {
    return Response.json({error:"Unable to load inquiries"},{status:503});
  }
}
