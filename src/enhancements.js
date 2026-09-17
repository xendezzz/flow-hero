function RunableNavbar(){
 const [open,setOpen]=M.useState(false);
 const sections=["Capabilities","Solutions","Resources"];
 return o.jsxs("header",{className:"site-header runable-header",children:[
  o.jsxs("div",{className:"header-inner runable-nav",children:[
   o.jsx("a",{href:"https://runable.com",className:"brand-home runable-mark","aria-label":"Runable home",children:o.jsx(Bo,{size:"lg",hideLabel:!0})}),
   o.jsxs("nav",{"aria-label":"Main navigation",className:"desktop-navigation runable-links",children:[
    sections.map(label=>o.jsxs("details",{className:"header-dropdown",name:"header-navigation",children:[
     o.jsxs("summary",{children:[label,o.jsx(q1,{size:13,"aria-hidden":"true"})]}),
     o.jsx("div",{className:"header-dropdown-links",children:ch.find(item=>item.title===label)?.links.map(([text,href])=>o.jsx("a",{href:href.startsWith("https")?href:`https://runable.com${href}`,children:text},href))})
    ]},label)),
    o.jsx("a",{className:"nav-pill",href:"https://runable.com/community",children:"Community"}),
    o.jsx("a",{className:"nav-pill",href:$e.pricing,children:"Pricing"})
   ]}),
   o.jsxs("div",{className:"header-actions",children:[
    o.jsx("a",{className:"login-link nav-pill",href:$e.login,children:"Login"}),
    o.jsx(rt,{children:"Get Flow free"}),
    o.jsx("button",{type:"button",className:"menu-button runable-menu","aria-expanded":open,"aria-controls":"mobile-menu","aria-label":open?"Close navigation":"Open navigation",onClick:()=>setOpen(value=>!value),children:open?o.jsx(Sd,{size:21}):o.jsx(jd,{size:21})})
   ]})
  ]}),
  open&&o.jsxs("nav",{id:"mobile-menu","aria-label":"Mobile navigation",className:"mobile-navigation runable-mobile-nav",children:[
   o.jsx("a",{href:"#dictation-demo",onClick:()=>setOpen(false),children:"See Flow in action"}),
   o.jsx("a",{href:"https://runable.com/capabilities",children:"Capabilities"}),
   o.jsx("a",{href:"https://runable.com/solutions",children:"Solutions"}),
   o.jsx("a",{href:"https://runable.com/resources",children:"Resources"}),
   o.jsx("a",{href:"https://runable.com/community",children:"Community"}),
   o.jsx("a",{href:$e.pricing,children:"Pricing"}),
   o.jsx("a",{href:$e.login,children:"Login"})
  ]})
 ]})
}

function BT(){return o.jsx(RunableNavbar,{})}

function FlowFiller({progress:t,children:s,width:a}){
 const maxWidth=Q(t,[.28,.4],[a,0]),opacity=Q(t,[.27,.39],[1,0]),strike=Q(t,[.25,.38],[0,1]);
 return o.jsx(K.span,{className:"fb-filler",style:{maxWidth,opacity},children:o.jsxs("span",{children:[s,o.jsx(K.i,{style:{scaleX:strike}})]})})
}

function Iv({progress:t,reduced:s}){
 const [stage,setStage]=M.useState(t.get()>=.7?2:t.get()>=.3?1:0);
 ni(t,"change",value=>setStage(value>=.7?2:value>=.3?1:0));
 const paperOpacity=Q(t,[.27,.4,.61,.76],[0,.72,.72,1]),chromeHeight=Q(t,[.61,.76],[0,74]),fontSize=Q(t,[.27,.4,.61,.76],[39,31,31,23]),paperWidth=Q(t,[.27,.4,.61,.76],[830,760,760,680]),paperRadius=Q(t,[.27,.4,.61,.76],[65,34,34,14]),padding=Q(t,[.27,.4,.61,.76],[12,22,22,30]);
 const wave=Q(t,[0,.1,.2,.35,.5,.65,.75,1],[.3,1,.45,.8,.35,.7,.12,.12]),orbitOpacity=Q(t,[0,.62],[.45,0]);
 const title0=Q(t,[0,.24,.36],[1,1,0]),title1=Q(t,[.22,.36,.62,.76],[0,1,1,0]),title2=Q(t,[.62,.76,1],[0,1,1]);
 const title0Y=Q(t,[0,.36],[0,-22]),title1Y=Q(t,[.22,.36,.76],[22,0,-22]),title2Y=Q(t,[.62,.76],[22,0]);
 return o.jsxs("div",{className:"fb-voice-scene premium-voice-scene","data-stage":stage,children:[
  o.jsxs(K.div,{className:"fb-voice-orbits",style:{opacity:s?0:orbitOpacity},"aria-hidden":"true",children:[o.jsx("i",{}),o.jsx("i",{})]}),
  !s&&[0,1,2,3].map(index=>o.jsx(uA,{progress:t,index},index)),
  o.jsxs("div",{className:"premium-voice-titles",children:[
   o.jsxs(K.h2,{style:{opacity:s?stage===0?1:0:title0,y:s?0:title0Y},children:["Say it ",o.jsx("em",{children:"naturally."})]}),
   o.jsxs(K.h2,{style:{opacity:s?stage===1?1:0:title1,y:s?0:title1Y},children:["A little ",o.jsx("em",{children:"cleanup."})]}),
   o.jsxs(K.h2,{style:{opacity:s?stage===2?1:0:title2,y:s?0:title2Y},children:["Ready to ",o.jsx("em",{children:"send."})]})
  ]}),
  o.jsxs(K.div,{className:"fb-voice-paper",style:{width:paperWidth},"aria-hidden":"true",children:[
   o.jsx(K.div,{className:"fb-paper-bg",style:{opacity:paperOpacity,borderRadius:paperRadius}}),
   o.jsxs(K.div,{className:"fb-paper-chrome",style:{height:chromeHeight,opacity:paperOpacity},children:[o.jsxs("span",{children:[o.jsx(ws,{}),"New email ",o.jsx("small",{children:"Draft"})]}),o.jsx("p",{children:"To: Sarah"})]}),
   o.jsxs(K.p,{className:"fb-voice-words",style:{fontSize,padding},children:["Hi Sarah,",o.jsx(FlowFiller,{progress:t,width:90,children:" um,"})," are you free for lunch tomorrow? Let’s meet at",o.jsx(FlowFiller,{progress:t,width:310,children:" twelve, actually,"})," ",o.jsx("span",{className:"fb-correction",children:"one."})]}),
   o.jsxs(K.div,{className:"fb-paper-status",style:{opacity:paperOpacity,height:Q(t,[.52,.72],[0,38])},children:[o.jsx(Te,{size:13}),"Review, then send."]})
  ]}),
  o.jsxs("div",{className:"fb-recorder","aria-hidden":"true",children:[o.jsx(wt,{}),o.jsx("span",{className:"fb-live-wave",children:[9,19,30,16,25,34,20,12,26,18,31,14,23,10,21].map((height,index)=>o.jsx(K.i,{style:{height,scaleY:s?.12:wave}},index))}),o.jsx("span",{children:["Listening","Cleaning up","Done"][stage]}),o.jsx("kbd",{children:stage===2?o.jsx(Te,{size:15}):"fn"})]}),
  o.jsxs("div",{className:"fb-voice-progress","aria-hidden":"true",children:[o.jsx("span",{children:["Speak","Clean up","Ready"][stage]}),o.jsx("i",{children:o.jsx(K.b,{style:{scaleX:t}})}),o.jsxs("span",{children:["0",stage+1," / 03"]})]}),
  o.jsx("small",{className:"fb-demo-note",children:"Illustrated demo · no microphone access"})
 ]})
}

function fA(){
 const ref=M.useRef(null),{scrollYProgress}=Fn({target:ref,offset:["start 88px","end end"]});
 M.useEffect(()=>{
  const node=ref.current;if(!node)return;
  let timer=0,lockUntil=0;
  const settle=()=>{
   if(Date.now()<lockUntil)return;
   const progress=scrollYProgress.get();if(progress<=.06||progress>=.96)return;
   const stops=[.12,.49,.87],target=stops.reduce((best,value)=>Math.abs(value-progress)<Math.abs(best-progress)?value:best,stops[0]);
   if(Math.abs(target-progress)<.012)return;
   const top=node.getBoundingClientRect().top+window.scrollY,start=top-88,range=Math.max(1,node.offsetHeight-window.innerHeight+88);
   lockUntil=Date.now()+900;window.scrollTo({top:start+target*range,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  };
  const queue=()=>{if(Date.now()<lockUntil)return;clearTimeout(timer);timer=window.setTimeout(settle,220)};
  window.addEventListener('scroll',queue,{passive:true});
  window.addEventListener('scrollend',settle,{passive:true});
  return()=>{window.removeEventListener('scroll',queue);window.removeEventListener('scrollend',settle);clearTimeout(timer)};
 },[scrollYProgress]);
 return o.jsx("div",{className:"fb-voice-track premium-voice-track",ref,children:o.jsx("div",{className:"fb-voice-sticky",children:o.jsx(Iv,{progress:scrollYProgress,reduced:!1})})})
}
