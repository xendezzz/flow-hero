function FlowHeadline(){
 const {reduced}=Re();
 const [open,setOpen]=M.useState(false),[muted,setMuted]=M.useState(false),[blocked,setBlocked]=M.useState(false),[source,setSource]=M.useState('');
 const video=M.useRef(null),shell=M.useRef(null),closeTimer=M.useRef(null),preference=M.useRef(false);
 M.useEffect(()=>{let live=true;fetch('/assets/hero-video.json').then(r=>r.ok?r.json():null).then(config=>{if(live&&config?.src)setSource(config.src)}).catch(()=>{});return()=>{live=false;clearTimeout(closeTimer.current)}},[]);
 const start=async()=>{
   const el=video.current;if(!el||!source)return;
   el.muted=preference.current;setMuted(el.muted);
   try{await el.play();setBlocked(false)}catch{
     if(!el.isConnected)return;el.muted=true;setMuted(true);setBlocked(true);
     try{await el.play()}catch{/* A click on the player can retry playback. */}
   }
 };
 M.useEffect(()=>{if(open)start();else video.current?.pause()},[open,source]);
 const expand=()=>{clearTimeout(closeTimer.current);setOpen(true)};
 const resetTilt=()=>{const el=shell.current;if(el){el.style.setProperty('--video-rx','0deg');el.style.setProperty('--video-ry','0deg');el.style.setProperty('--video-x','0px');el.style.setProperty('--video-y','0px')}};
 const collapse=()=>{clearTimeout(closeTimer.current);setOpen(false);resetTilt()};
 const leave=()=>{resetTilt();closeTimer.current=setTimeout(()=>{if(!shell.current?.contains(document.activeElement))setOpen(false)},160)};
 const tilt=e=>{if(reduced||!open||e.pointerType==='touch')return;const el=shell.current,box=el.getBoundingClientRect();const x=Math.max(-.5,Math.min(.5,(e.clientX-box.left)/box.width-.5)),y=Math.max(-.5,Math.min(.5,(e.clientY-box.top)/box.height-.5));el.style.setProperty('--video-rx',`${-y*2.4}deg`);el.style.setProperty('--video-ry',`${x*2.4}deg`);el.style.setProperty('--video-x',`${x*4}px`);el.style.setProperty('--video-y',`${y*4}px`)};
 const sound=async e=>{e.stopPropagation();const el=video.current;if(!el)return;const next=!el.muted;preference.current=next;el.muted=next;setMuted(next);try{await el.play();setBlocked(false)}catch{el.muted=true;setMuted(true);setBlocked(true)}};
 const soundIcon=o.jsxs('svg',{viewBox:'0 0 24 24',width:20,height:20,fill:'none',stroke:'currentColor',strokeWidth:1.8,'aria-hidden':true,children:[o.jsx('path',{d:'M11 5 6 9H3v6h3l5 4V5Z'}),o.jsx('path',{d:muted?'m16 9 5 6m0-6-5 6':'M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14'})]});
 return o.jsxs('span',{className:'flow-headline'+(reduced?' still':''),children:[
   o.jsx('span',{children:'Start'}),
   o.jsx('span',{className:'flow-film'+(open?' is-open':''),onPointerEnter:expand,onPointerLeave:leave,onFocus:expand,onBlur:e=>{if(!e.currentTarget.contains(e.relatedTarget))collapse()},onKeyDown:e=>{if(e.key==='Escape'){e.preventDefault();e.currentTarget.querySelector('.flow-video-trigger')?.focus();collapse()}},children:
     o.jsxs('span',{ref:shell,className:'flow-player'+(open?' is-open':''),onPointerMove:tilt,children:[
       o.jsx('span',{className:'flow-film-color','aria-hidden':true}),
       o.jsx('img',{src:'/assets/poster.png',alt:'Flow video preview',className:'flow-film-image'}),
       source&&o.jsx('video',{ref:video,src:source,poster:'/assets/poster.png',className:'flow-hero-video',playsInline:true,loop:true,preload:'metadata','aria-label':'Flow introduction video'}),
       o.jsx('button',{type:'button',className:'flow-video-trigger','aria-label':open?'Play Flow introduction':'Expand Flow video preview','aria-expanded':open,onClick:()=>{expand();start()}}),
       open&&source&&o.jsxs('span',{className:'flow-video-controls',children:[
         o.jsx('button',{type:'button',className:'flow-sound-toggle','aria-label':muted?'Turn sound on':'Turn sound off','aria-pressed':muted,onClick:sound,children:soundIcon}),
         blocked&&o.jsx('span',{className:'flow-sound-hint',children:'Tap to turn sound on'})]}),
       open&&o.jsx('button',{type:'button',className:'flow-video-close','aria-label':'Close video preview',onClick:collapse,children:'×'})
     ]})}),
   o.jsx('span',{children:'talking.'})]});
}
