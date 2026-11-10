// Echo private fictional customer-conversation pilot. No real PII.
(()=>{'use strict';
const $=id=>document.getElementById(id);
const transcript=$('conversation');
const firstMessage="My kitchen sink is dripping under the cabinet, and I'd like someone to take a look.";
let stage='start',conversationId=null,busy=false;
const welcome="Welcome to ABC Home Services. What's happening, and what kind of service do you need?";
const progress=t=>{$('chat-progress').textContent=t;};
function say(speaker,message){
  const bubble=document.createElement('div');
  bubble.className='chat-bubble '+(speaker==='Echo'?'echo':'customer');
  const label=document.createElement('span');label.className='who';label.textContent=speaker==='Echo'?'ECHO · SAMPLE BUSINESS ASSISTANT':'FICTIONAL CUSTOMER';
  bubble.append(label,document.createTextNode(message));
  transcript.append(bubble);bubble.scrollIntoView({block:'nearest',behavior:'smooth'});
}
function render(){
  $('chat-entry').hidden=stage==='review'||stage==='complete'||stage==='safety';
  $('chat-approval').hidden=stage!=='review'&&stage!=='complete'&&stage!=='safety';
  $('chat-confirm').hidden=stage==='complete'||stage==='safety';
  $('chat-cancel').textContent=stage==='complete'||stage==='safety'?'Start another conversation':'Discard this conversation';
  $('chat-send').textContent=stage==='start'?'Send to Echo':'Answer Echo';
  $('chat-send').disabled=busy;
  $('chat-confirm').disabled=busy;
  $('chat-reset').disabled=busy;
  $('chat-cancel').disabled=busy;
  $('chat-message').disabled=busy;
}
async function post(action,data){
  const res=await fetch('/api/conversation',{
    method:'POST',credentials:'same-origin',cache:'no-store',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({action,...data})
  });
  let json;
  try{json=await res.json()}catch{throw Error('Unable to read the secure service response.');}
  if(!res.ok)throw Error(json.error||'Secure service temporarily unavailable ('+res.status+').');
  return json;
}
function review(a){
  const root=$('chat-preview');root.replaceChildren();root.hidden=false;
  const title=document.createElement('h3');title.textContent='DRAFT FOR OWNER APPROVAL — NOT SUBMITTED';root.append(title);
  for(const [label,value] of [
    ['Category',a.category],['Priority',a.priority],['Request summary',a.summary],
    ['Recommended owner action',a.owner_action],['Suggested customer reply — NOT SENT',a.response_draft]
  ]){
    const p=document.createElement('p');
    const strong=document.createElement('strong');strong.textContent=label+': ';
    p.append(strong,document.createTextNode(value));root.append(p);
  }
}
function reset(){
  stage='start';conversationId=null;
  transcript.replaceChildren();say('Echo',welcome);
  $('chat-message').value=firstMessage;
  $('chat-fictional').checked=false;$('chat-preview').replaceChildren();$('chat-preview').hidden=true;
  progress('Ready to begin. Private fictional data only.');
  render();
}
$('chat-send').addEventListener('click',async()=>{
  if(busy||!['start','answer'].includes(stage))return;
  if(!$('chat-fictional').checked){progress('Please confirm this conversation contains no real personal information.');return;}
  const message=$('chat-message').value.trim();
  if(message.length<(stage==='start'?12:3)||message.length>400){progress('Please enter a fictional response within the character limit.');return;}
  busy=true;render();
  const action=stage;
  progress(action==='start'?'Echo is reading your request and choosing a follow-up question…':'Echo is preparing the full inquiry for your approval…');
  try {
    const result=await post(action,action==='start'?{message,fictional:true}:{id:conversationId,message});
    say('Customer',message);$('chat-message').value='';
    if(action==='start'&&result.step==='safety'){
      stage='safety';
      say('Echo',result.safety_warning);
      progress('Safety warning: routine AI intake stopped. No appointment requested, no owner inquiry saved, and no AI inference used.');
    }else if(action==='start'){
      conversationId=result.id;stage='answer';say('Echo',result.question);
      $('chat-message').placeholder='Answer the follow-up question without personal details.';
      progress('Echo asked one relevant follow-up. Your answer will complete the draft; it does not yet create a lead.');
    }else{
      stage='review';review(result.analysis);
      say('Echo','Thank you. I prepared a service inquiry and a draft reply. Please review them before submitting.');
      progress('Draft ready for owner approval. No customer has been contacted.');
    }
  }catch(error){progress(error.message);}
  finally{busy=false;render();}
});
$('chat-confirm').addEventListener('click',async()=>{
  if(busy||stage!=='review')return;busy=true;render();
  progress('Saving your approved fictional inquiry to the owner dashboard…');
  try {
    const result=await post('confirm',{id:conversationId,confirm:true});
    if(!result.saved_inquiry)throw Error('Submission was not confirmed.');
    stage='complete';
    say('Echo','Your fictional inquiry is now in the business owner review queue. No message was sent and no appointment was booked.');
    progress('Success: submitted to Cloudflare D1 as Pending. Open the inquiry queue below to inspect it.');
    $('filter').value='all';
    $('refresh').click();
  }catch(error){progress(error.message);}
  finally{busy=false;render();}
});
$('chat-cancel').addEventListener('click',reset);
$('chat-reset').addEventListener('click',reset);
render();
})();
