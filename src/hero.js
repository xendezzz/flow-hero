function FnHoldCue(){
 const samples=[
  'You’re looking beautiful today. Yes, you.',
  'Looks like you need to work faster. Flow can help.',
  'Plot twist: that email just wrote itself.',
  'Your keyboard misses you. Flow doesn’t.',
  'Big idea. Zero typing. Excellent choice.',
  'Careful. This might become your new superpower.'
 ];
 const [active,setActive]=M.useState(false),[visible,setVisible]=M.useState(false),[text,setText]=M.useState('');
 const control=M.useRef(null),typing=M.useRef(0),dismiss=M.useRef(0),last=M.useRef(-1);
 const clear=()=>{clearInterval(typing.current);clearTimeout(dismiss.current)};
 const press=()=>{
  if(active)return;clear();setActive(true);setVisible(true);setText('');
  const hero=control.current?.closest('.fb-hero');if(hero)hero.dataset.fnActive='true';
  let next=Math.floor(Math.random()*samples.length);if(next===last.current)next=(next+1)%samples.length;last.current=next;
  const message=samples[next];let index=0;
  typing.current=window.setInterval(()=>{index+=1;setText(message.slice(0,index));if(index>=message.length){clearInterval(typing.current);dismiss.current=window.setTimeout(()=>setVisible(false),4800)}},48);
 };
 const release=()=>{setActive(false);const hero=control.current?.closest('.fb-hero');if(hero)delete hero.dataset.fnActive};
 M.useEffect(()=>()=>{clear();const hero=control.current?.closest('.fb-hero');if(hero)delete hero.dataset.fnActive},[]);
 return o.jsxs('div',{className:'fn-hold-experience',children:[
  visible&&o.jsxs('div',{className:'fn-typing-bubble',role:'status','aria-live':'polite',children:[o.jsx('span',{children:text}),o.jsx('i',{'aria-hidden':true})]}),
  o.jsxs('button',{ref:control,type:'button',className:'fn-hold-trigger'+(active?' is-active':''),'aria-label':'Press and hold the function key to try Flow',onPointerDown:e=>{if(e.pointerType!=='touch')e.currentTarget.setPointerCapture?.(e.pointerId);press()},onPointerUp:release,onPointerCancel:release,onPointerLeave:()=>{if(active)release()},onKeyDown:e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();press()}},onKeyUp:e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();release()}},children:[o.jsx('kbd',{children:'fn'}),o.jsx('span',{children:'Hold function key'})]})
 ]})
}

function FlowHeadline(){
 const {reduced}=Re();
 const [open,setOpen]=M.useState(false),[muted,setMuted]=M.useState(false),[blocked,setBlocked]=M.useState(false),[source,setSource]=M.useState(''),[time,setTime]=M.useState(0),[duration,setDuration]=M.useState(0),[paused,setPaused]=M.useState(false);
 const video=M.useRef(null),shell=M.useRef(null),closeTimer=M.useRef(null),preference=M.useRef(false),attempt=M.useRef(0);
 M.useEffect(()=>{let live=true;fetch('/assets/hero-video.json').then(r=>r.ok?r.json():null).then(config=>{if(live&&config?.src)setSource(config.src)}).catch(()=>{});return()=>{live=false;clearTimeout(closeTimer.current)}},[]);
 M.useEffect(()=>{
   const hero=shell.current?.closest('.fb-hero');if(!hero)return;
   const reset=()=>{hero.style.setProperty('--hero-x','0px');hero.style.setProperty('--hero-y','0px');hero.style.setProperty('--video-box-x','0px');hero.style.setProperty('--video-box-y','0px')};
   const move=e=>{if(reduced||e.pointerType==='touch')return reset();const box=hero.getBoundingClientRect(),px=e.clientX-box.left,py=e.clientY-box.top,x=Math.max(-1,Math.min(1,px/box.width*2-1)),y=Math.max(-1,Math.min(1,py/box.height*2-1));hero.style.setProperty('--hero-x',`${x*5.5}px`);hero.style.setProperty('--hero-y',`${y*5}px`);hero.style.setProperty('--video-box-x',`${x*3}px`);hero.style.setProperty('--video-box-y',`${y*2.5}px`)};
   hero.addEventListener('pointermove',move);hero.addEventListener('pointerleave',reset);
   return()=>{hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',reset)};
 },[reduced]);
 M.useEffect(()=>{
   const sections=[...document.querySelectorAll('.fb-free,.fb-closing')];
   const fields=sections.map(section=>{
     const field=document.createElement('video');field.className='section-dither-field';field.src='/assets/hero-gradient-loop.mp4?v=supplied-dither';field.autoplay=true;field.muted=true;field.loop=true;field.playsInline=true;field.setAttribute('aria-hidden','true');section.prepend(field);
     return field;
   });
   return()=>fields.forEach(field=>field.remove());
 },[reduced]);
 const start=async(expanded=open)=>{
   const el=video.current;if(!el||!source)return;const request=++attempt.current;
   el.muted=expanded?preference.current:true;setMuted(el.muted);
   try{await el.play();if(request===attempt.current)setBlocked(false)}catch{
     if(!el.isConnected||request!==attempt.current)return;el.muted=true;setMuted(true);setBlocked(true);
     try{await el.play()}catch{/* A click on the player can retry playback. */}
   }
 };
 M.useEffect(()=>{start(open);return()=>{attempt.current++}},[open,source]);
 M.useEffect(()=>()=>{video.current?.pause()},[]);
 const expand=()=>{clearTimeout(closeTimer.current);setOpen(true)};
 const resetTilt=()=>{const el=shell.current;if(el){el.style.setProperty('--video-rx','0deg');el.style.setProperty('--video-ry','0deg');el.style.setProperty('--video-x','0px');el.style.setProperty('--video-y','0px')}};
 const collapse=()=>{clearTimeout(closeTimer.current);setOpen(false);resetTilt()};
 const leave=()=>{resetTilt();closeTimer.current=setTimeout(()=>{if(!shell.current?.contains(document.activeElement))setOpen(false)},160)};
 const tilt=e=>{if(reduced||!open||e.pointerType==='touch')return;const el=shell.current,box=el.getBoundingClientRect();const x=Math.max(-.5,Math.min(.5,(e.clientX-box.left)/box.width-.5)),y=Math.max(-.5,Math.min(.5,(e.clientY-box.top)/box.height-.5));el.style.setProperty('--video-rx',`${-y*1.6}deg`);el.style.setProperty('--video-ry',`${x*1.6}deg`);el.style.setProperty('--video-x',`${x*2.5}px`);el.style.setProperty('--video-y',`${y*2.5}px`)};
 const sound=async e=>{e.stopPropagation();const el=video.current;if(!el)return;const next=!el.muted;preference.current=next;el.muted=next;setMuted(next);try{await el.play();setBlocked(false)}catch{el.muted=true;setMuted(true);setBlocked(true)}};
 const fullscreen=async e=>{e.stopPropagation();try{if(document.fullscreenElement)await document.exitFullscreen();else if(shell.current?.requestFullscreen)await shell.current.requestFullscreen();else video.current?.webkitEnterFullscreen?.()}catch{/* Keep playback available if fullscreen is blocked. */}};
 const stamp=n=>`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`;
 const soundIcon=o.jsxs('svg',{viewBox:'0 0 24 24',width:20,height:20,fill:'none',stroke:'currentColor',strokeWidth:1.8,'aria-hidden':true,children:[o.jsx('path',{d:'M11 5 6 9H3v6h3l5 4V5Z'}),o.jsx('path',{d:muted?'m16 9 5 6m0-6-5 6':'M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14'})]});
 const fullscreenIcon=o.jsxs('svg',{viewBox:'0 0 24 24',width:19,height:19,fill:'none',stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true,children:[o.jsx('path',{d:'M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5'})]});
 return o.jsxs('span',{className:'flow-headline'+(reduced?' still':''),children:[
   o.jsx('span',{children:'Start'}),
   o.jsx('span',{className:'flow-film'+(open?' is-open':''),onPointerEnter:expand,onPointerLeave:leave,onFocus:expand,onBlur:e=>{if(!e.currentTarget.contains(e.relatedTarget))collapse()},onKeyDown:e=>{if(e.key==='Escape'){e.preventDefault();e.currentTarget.querySelector('.flow-video-trigger')?.focus();collapse()}},children:
     o.jsxs('span',{ref:shell,className:'flow-player'+(open?' is-open':''),onPointerMove:tilt,children:[
       o.jsx('video',{src:'/assets/figma-flow/thermal-pill.mp4',className:'flow-film-color flow-thermal-asset',autoPlay:true,muted:true,loop:true,playsInline:true,preload:'auto','aria-hidden':true}),
       o.jsx('img',{src:'/assets/figma-flow/video-poster.png',alt:'Flow video preview',className:'flow-film-image'}),
       o.jsx('img',{src:'/assets/figma-flow/play-video.svg',alt:'',className:'flow-figma-play','aria-hidden':true}),
       source&&o.jsx('video',{ref:video,src:source,poster:'/assets/figma-flow/video-poster.png',className:'flow-hero-video',playsInline:true,autoPlay:true,muted:true,loop:true,preload:'auto',onTimeUpdate:e=>setTime(e.currentTarget.currentTime),onLoadedMetadata:e=>setDuration(e.currentTarget.duration),onPlay:()=>setPaused(false),onPause:()=>setPaused(true),'aria-label':'Flow introduction video'}),
       o.jsx('button',{type:'button',className:'flow-video-trigger','aria-label':open?'Play Flow introduction':'Expand Flow video preview','aria-expanded':open,onClick:()=>{expand();start(true)}}),
       open&&source&&o.jsxs('span',{className:'flow-video-controls',children:[
         o.jsx('button',{type:'button',className:'flow-play-toggle','aria-label':paused?'Play video':'Pause video',onClick:e=>{e.stopPropagation();if(video.current?.paused)start(true);else video.current?.pause()},children:paused?'▶':'Ⅱ'}),
         o.jsx('span',{className:'flow-video-time',children:stamp(time)}),
         o.jsx('input',{type:'range',className:'flow-video-progress',min:0,max:duration||1,step:.1,value:time,'aria-label':'Video playback position','aria-valuetext':`${stamp(time)} of ${stamp(duration)}`,onChange:e=>{const value=Number(e.target.value);if(video.current)video.current.currentTime=value;setTime(value)}}),
         o.jsx('span',{className:'flow-video-time',children:stamp(duration)}),
         o.jsx('button',{type:'button',className:'flow-fullscreen-toggle','aria-label':'View video fullscreen',onClick:fullscreen,children:fullscreenIcon}),
         o.jsx('button',{type:'button',className:'flow-sound-toggle','aria-label':muted?'Turn sound on':'Turn sound off','aria-pressed':muted,onClick:sound,children:soundIcon}),
         blocked&&o.jsx('span',{className:'flow-sound-hint',children:'Tap to turn sound on'})]}),
       open&&o.jsx('button',{type:'button',className:'flow-video-close','aria-label':'Close video preview',onClick:collapse,children:'×'})
     ]})}),
   o.jsx('span',{children:'talking.'})]});
}
