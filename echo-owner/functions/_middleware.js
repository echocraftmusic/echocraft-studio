/**
 * Echo Owner API authentication. Fail closed until Cloudflare Access app and env
 * ACCESS_TEAM_DOMAIN / ACCESS_AUD are configured. Do not deploy without
 * protecting the entire Pages project with an email-restricted Access policy.
 */
const text = (message,status) => new Response(JSON.stringify({error:message}),{
  status,headers:{"content-type":"application/json","cache-control":"no-store"}
});
function decodeBase64Url(text){
  return atob(text.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(text.length/4)*4,"="));
}
function decodeJson(text){
  const bytes=Uint8Array.from(decodeBase64Url(text),x=>x.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
async function accessIdentity(request,env){
  const domain=env.ACCESS_TEAM_DOMAIN;
  const aud=env.ACCESS_AUD;
  if(!domain||!aud||!domain.endsWith(".cloudflareaccess.com")||domain.includes("/"))throw Error("Owner login not configured");
  const jwt=request.headers.get("cf-access-jwt-assertion");
  if(!jwt||jwt.length>12000)throw Error("Access token missing");
  const parts=jwt.split(".");
  if(parts.length!==3)throw Error("Invalid token structure");
  const [head,claims]=parts.slice(0,2).map(decodeJson);
  if(head.alg!=="RS256"||typeof head.kid!=="string")throw Error("Invalid token algorithm");
  const now=Math.floor(Date.now()/1000);
  const issuer="https://"+domain;
  if(claims.iss!==issuer||!([claims.aud].flat().includes(aud))||
     typeof claims.exp!=="number"||claims.exp<=now||
     typeof claims.iat!=="number"||claims.iat>now+60||
     (typeof claims.nbf==="number"&&claims.nbf>now+60))throw Error("Invalid token claims");
  const res=await fetch(issuer+"/cdn-cgi/access/certs",{cf:{cacheTtl:300}});
  if(!res.ok)throw Error("Access keys unavailable");
  const certs=await res.json();
  const jwk=certs.keys?.find(x=>x.kid===head.kid&&x.kty==="RSA");
  if(!jwk)throw Error("Unknown token signing key");
  const key=await crypto.subtle.importKey("jwk",jwk,{name:"RSASSA-PKCS1-v1_5",hash:"SHA-256"},false,["verify"]);
  const signature=Uint8Array.from(decodeBase64Url(parts[2]),x=>x.charCodeAt(0));
  const data=new TextEncoder().encode(parts[0]+"."+parts[1]);
  if(!await crypto.subtle.verify("RSASSA-PKCS1-v1_5",key,signature,data))throw Error("Invalid signature");
  return claims;
}
export async function onRequest(context){
  try{
    await accessIdentity(context.request,context.env);
  }catch{
    return text("Owner authentication required.",401);
  }
  const request=context.request;
  if(!["GET","HEAD","OPTIONS"].includes(request.method)){
    const origin=request.headers.get("origin");
    if(!origin||origin!==new URL(request.url).origin)return text("Cross-site write blocked.",403);
  }
  const response=await context.next();
  const headers=new Headers(response.headers);
  headers.set("cache-control","no-store");
  headers.set("x-content-type-options","nosniff");
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
