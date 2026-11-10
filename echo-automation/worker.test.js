import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.js';

const ORIGIN = 'https://echo-staging.example.invalid';
const BASE = 'https://private-test.invalid';
const GOOD_TOKEN = 'local-test-secret-not-for-production';

function createEnv(overrides = {}) {
  const calls = { ai: 0, limit: 0 };
  const env = {
    STAGING_API_TOKEN: GOOD_TOKEN,
    ALLOWED_ORIGIN: ORIGIN,
    AI_MODEL: 'mock-model',
    ECHO_RATE_LIMITER: {
      async limit() { calls.limit++; return { success: true }; }
    },
    AI: {
      async run() {
        calls.ai++;
        return { response: JSON.stringify({
          category: 'Plumbing', priority: 'normal', summary: 'Sink leaking',
          owner_action: 'Review availability', response_draft: 'Thanks for reaching out.'
        }) };
      }
    }, ...overrides
  };
  return { env, calls };
}

function request({ body = { industry: 'home', inquiry: 'Sink is leaking.' }, token = GOOD_TOKEN,
                   origin = ORIGIN, method = 'POST', path = '/api/analyze',
                   contentType = 'application/json' } = {}) {
  const headers = {};
  if (token !== null) headers.Authorization = `Bearer ${token}`;
  if (origin !== null) headers.Origin = origin;
  if (contentType !== null) headers['Content-Type'] = contentType;
  return new Request(BASE + path, {
    method, headers, ...(['POST', 'PUT', 'PATCH'].includes(method) ? {
      body: typeof body === 'string' ? body : JSON.stringify(body)
    } : {})
  });
}
async function statusAndNoAI(name, args, envOverrides, expected) {
  const {env,calls} = createEnv(envOverrides);
  const res = await worker.fetch(request(args),env);
  assert.equal(res.status,expected, name);
  assert.equal(calls.ai,0,`${name}: no inference must be charged`);
}

test('health is harmless', async () => {
  const {env,calls} = createEnv();
  const res = await worker.fetch(request({method:'GET',path:'/health'}),env);
  assert.equal(res.status,200); assert.equal((await res.json()).ok,true);
  assert.equal(calls.ai,0);
});
test('no config: fail closed', async () => {
  await statusAndNoAI('no token',{},{STAGING_API_TOKEN:undefined},503);
  await statusAndNoAI('no limiter',{},{ECHO_RATE_LIMITER:undefined},503);
});
test('authentication required', async () => {
  await statusAndNoAI('wrong token',{token:'invalid'}, {},401);
  await statusAndNoAI('missing token',{token:null}, {},401);
});
test('origin mismatch is blocked', async () => {
  await statusAndNoAI('untrusted origin',{origin:'https://evil.invalid'}, {},403);
});
test('disallowed content types', async () => {
  await statusAndNoAI('plain',{contentType:'text/plain'}, {},415);
});
test('malformed and blank requests are rejected', async () => {
  await statusAndNoAI('invalid json',{body:'not-json'}, {},400);
  await statusAndNoAI('blank',{body:{industry:'home',inquiry:''}}, {},400);
  await statusAndNoAI('unknown industry',{body:{industry:'anything',inquiry:'Hello'}}, {},400);
  await statusAndNoAI('long inquiry',{body:{industry:'home',inquiry:'x'.repeat(601)}}, {},400);
});
test('oversized streamed request rejected without charging AI', async () => {
  await statusAndNoAI('oversized',{body:JSON.stringify({industry:'home',inquiry:'a'.repeat(4000)})}, {},413);
});
test('rate limit blocks inference', async () => {
  await statusAndNoAI('throttled',{},{
    ECHO_RATE_LIMITER:{async limit(){return {success:false}}}
  },429);
});
test('AI binding is necessary', async () => {
  await statusAndNoAI('no AI',{}, {AI:undefined},503);
});
test('success is structured, no outgoing side effects', async () => {
  const {env,calls} = createEnv();
  const res = await worker.fetch(request(),env);
  assert.equal(res.status,200);
  assert.equal(calls.ai,1);
  assert.deepEqual({
    simulated:(await res.clone().json()).simulated,
    sent:(await res.clone().json()).sent,
    saved:(await res.clone().json()).saved
  },{simulated:false,sent:false,saved:false});
  assert.equal(res.headers.get('access-control-allow-origin'), ORIGIN);
});
test('bad AI output fails safely', async () => {
  const {env} = createEnv({AI:{async run(){return {response:'not valid json'}}}});
  const res = await worker.fetch(request(),env);
  assert.equal(res.status,502);
  assert.equal((await res.text()).includes('not valid json'),false);
});
test('unsupported methods and CORS preflight', async () => {
  const {env,calls}=createEnv();
  const options=new Request(BASE+'/api/analyze',{method:'OPTIONS',headers:{Origin:ORIGIN}});
  assert.equal((await worker.fetch(options,env)).status,204);
  assert.equal((await worker.fetch(request({method:'GET'}),env)).status,405);
  assert.equal(calls.ai,0);
});


test('D1 inquiry routes fail closed without database and credentials', async () => {
  const {env,calls}=createEnv({ECHO_DB:undefined});
  const res=await worker.fetch(request({path:'/api/inquiries',method:'GET'}),env);
  assert.equal(res.status,503);
  assert.equal(calls.ai,0);
});
test('D1 inquiry routes reject invalid auth', async () => {
  const {env,calls}=createEnv({ECHO_DB:{}});
  const res=await worker.fetch(request({path:'/api/inquiries',method:'GET',token:'wrong'}),env);
  assert.equal(res.status,401);
  assert.equal(calls.ai,0);
});
test('D1 stores fictional request and allows owner status updates', async () => {
  const rows=[];
  const db={prepare(sql){return {bind(...args){return {
    async run(){
      if(sql.startsWith('INSERT')) {rows.push({id:args[0],tenant_id:args[1],source:args[2],message:args[3],category:args[4],priority:args[5],suggested_reply:args[6],status:args[7]});return {meta:{changes:1}};}
      if(sql.startsWith('UPDATE')) {const row=rows.find(x=>x.id===args[1]);if(row)row.status=args[0];return {meta:{changes:row?1:0}};}
      throw Error('unexpected SQL');
    },
    async all(){return {results:rows}}
  }};}}};
  const {env,calls}=createEnv({ECHO_DB:db});
  const body={message:'My sample sink leaks.',category:'Plumbing',priority:'normal',suggested_reply:'We will review the request.'};
  const save=await worker.fetch(request({path:'/api/inquiries',body}),env);
  assert.equal(save.status,201);const saved=await save.json();assert.equal(saved.saved,true);assert.equal(saved.sent,false);
  const list=await worker.fetch(request({path:'/api/inquiries',method:'GET'}),env);
  assert.equal(list.status,200);assert.equal((await list.json()).inquiries.length,1);
  const patch=await worker.fetch(request({path:'/api/inquiries/'+saved.id,method:'PATCH',body:{status:'contacted'}}),env);
  assert.equal(patch.status,200);assert.equal((await patch.json()).updated,true);
  assert.equal(rows[0].status,'contacted');assert.equal(calls.ai,0);
});

test('authenticated AI intake creates a pending D1 record',async()=>{
  const rows=[];
  const ECHO_DB={prepare(){return {bind(...args){return {async run(){rows.push(args);return {meta:{changes:1}}}}}}}};
  const {env,calls}=createEnv({ECHO_DB});
  const res=await worker.fetch(request({path:'/api/intake'}),env);
  assert.equal(res.status,201);
  const body=await res.json();
  assert.equal(body.saved,true);assert.equal(body.sent,false);assert.equal(body.status,'pending');
  assert.equal(calls.ai,1);assert.equal(rows.length,1);
  assert.equal(rows[0][1],'home-demo');
  assert.equal(rows[0][7],'pending');
});
