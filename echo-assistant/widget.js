/* Echo Craft assistant widget — development-only; no remote calls or data collection. */
(() => {
  'use strict';
  if (document.getElementById('ec-echo-launcher')) return;
  const data = {
    websites: {title:'Website Design', message:'Echo Craft builds custom websites for growing businesses. Our proposed starting packages are $1,000 Essential, $2,000 Business and $3,000+ for advanced work; your quote depends on scope.', url:'../website-design.html', link:'Explore website design'},
    it: {title:'Business IT Solutions', message:'We help with business technology, troubleshooting, setup and practical IT solutions. Tell Echo Craft about your equipment and goals for a tailored assessment.', url:'../services.html', link:'Explore digital solutions'},
    automation: {title:'AI Automation', message:'Our automation demonstration shows how a business can organize customer inquiries and draft responses for owner review. The demo is a simulation, not a live production AI.', url:'../echo-demo/', link:'Try the workflow demo'},
    contact: {title:'Contact Echo Craft', message:'Ready to talk about a project? You can send an inquiry directly to Echo Craft Studio. Echo does not collect information in this demonstration.', url:'../index.html#contact', link:'Contact the studio'}
  };
  const root = document.createElement('aside');
  root.id = 'ec-echo-launcher';
  root.className = 'ec-echo';
  root.innerHTML = `<button type="button" class="ec-echo-toggle" aria-label="Open Echo assistant" aria-controls="ec-echo-panel" aria-expanded="false"><span class="ec-echo-avatar" aria-hidden="true">EC</span><span>Ask Echo</span><span aria-hidden="true">✦</span></button>
  <section class="ec-echo-panel" id="ec-echo-panel" role="dialog" aria-modal="false" aria-label="Echo Craft digital assistant" hidden>
  <header><span class="ec-echo-avatar" aria-hidden="true">EC</span><div><strong>Echo</strong><small>Echo Craft Digital Assistant · Guided Preview</small></div><button type="button" class="ec-echo-close" aria-label="Close Echo">×</button></header>
  <div class="ec-echo-content" aria-live="polite"><p class="ec-echo-message">Hi there! I'm Echo. What would you like to explore today?</p><div class="ec-echo-options"><button type="button" data-echo-topic="websites">Website design</button><button type="button" data-echo-topic="it">IT solutions</button><button type="button" data-echo-topic="automation">AI automation</button><button type="button" data-echo-topic="contact">Contact us</button></div><div class="ec-echo-response" hidden><h3></h3><p></p><a href="#"></a></div></div>
  <footer>Guided preview · No chat data collected or stored</footer></section>`;
  const style = document.createElement('style');
  style.textContent = `
  .ec-echo{position:fixed;right:clamp(12px,3vw,30px);bottom:20px;z-index:9000;font:14px/1.45 Inter,system-ui,sans-serif;color:#f7f3ed}
  .ec-echo *{box-sizing:border-box}.ec-echo button{font:inherit;cursor:pointer}
  .ec-echo-toggle{display:flex;align-items:center;gap:10px;background:linear-gradient(125deg,#111c2e,#0e1420);border:1px solid #bf9148;border-radius:999px;padding:9px 15px 9px 9px;color:#f3cd8c;box-shadow:0 10px 35px #0008;font-weight:700!important}
  .ec-echo-avatar{display:inline-grid;place-items:center;width:40px;height:40px;flex:none;border-radius:50%;background:radial-gradient(circle at 30% 20%,#63daff,#124264 60%,#0a1523);border:2px solid #d5b16e;color:white;font-size:13px;font-weight:900;box-shadow:inset 0 1px 5px #ffffff55,0 0 15px #39bfff44}
  .ec-echo-panel{position:absolute;bottom:70px;right:0;width:min(390px,calc(100vw - 24px));max-height:min(620px,calc(100dvh - 110px));overflow:auto;border:1px solid #ab8549;border-radius:22px;background:#101827;box-shadow:0 22px 65px #000b}
  .ec-echo-panel[hidden]{display:none}.ec-echo-panel header{display:flex;gap:10px;align-items:center;padding:16px;background:linear-gradient(90deg,#172d46,#101827);border-bottom:1px solid #31465a}
  .ec-echo-panel header div{flex:1;min-width:0}.ec-echo-panel header strong{display:block;font-size:18px}.ec-echo-panel header small{display:block;color:#b2c4d8;font-size:11px;line-height:1.4}
  .ec-echo-close{background:transparent;border:0;color:white;font-size:28px;padding:0 5px}.ec-echo-content{padding:19px}
  .ec-echo-message{background:#1c3045;border-radius:15px 15px 15px 3px;padding:14px;margin:0 0 16px;color:#edf6ff}
  .ec-echo-options{display:grid;grid-template-columns:1fr 1fr;gap:9px}.ec-echo-options button{background:#152338;color:#e6e9f0;border:1px solid #426180;padding:11px 6px;border-radius:12px}
  .ec-echo-options button:hover,.ec-echo-options button:focus-visible{border-color:#efd099;background:#243b55}.ec-echo-response{border-top:1px solid #3d4e60;margin-top:17px;padding-top:14px}
  .ec-echo-response h3{font-size:15px;margin:0 0 9px;color:#f5cf91}.ec-echo-response p{line-height:1.6;color:#dfebf6}.ec-echo-response a{display:inline-block;color:#0b0d12;background:#edc67b;padding:10px 13px;border-radius:10px;text-decoration:none;font-weight:700}
  .ec-echo-panel footer{border-top:1px solid #344352;color:#b1bfce;padding:11px 18px;font-size:11px}
  @media(max-width:500px){.ec-echo{bottom:12px;right:12px}.ec-echo-panel{bottom:64px}}
  @media(prefers-reduced-motion:no-preference){.ec-echo-toggle:hover{transform:translateY(-2px);transition:transform .2s}}
  `;
  document.head.append(style);
  document.body.append(root);
  const toggle=root.querySelector('.ec-echo-toggle'),panel=root.querySelector('.ec-echo-panel'),close=root.querySelector('.ec-echo-close');
  const setOpen=open => {panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));if(open)close.focus();else toggle.focus();};
  toggle.addEventListener('click',()=>setOpen(panel.hidden));
  close.addEventListener('click',()=>setOpen(false));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden)setOpen(false)});
  root.querySelectorAll('[data-echo-topic]').forEach(button=>button.addEventListener('click',()=>{
    const topic=data[button.dataset.echoTopic];if(!topic)return;
    const response=root.querySelector('.ec-echo-response');
    response.querySelector('h3').textContent=topic.title;
    response.querySelector('p').textContent=topic.message;
    const anchor=response.querySelector('a');anchor.href=topic.url;anchor.textContent=topic.link;
    response.hidden=false;
  }));
})();
