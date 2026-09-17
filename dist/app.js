const hero=document.querySelector('.hero');
const canvas=document.querySelector('.wash');
const ctx=canvas.getContext('2d');
canvas.width=960;canvas.height=569;
const texture=new Image();texture.src='assets/gradient.png';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const startWord=document.querySelector('.word-start');
const talking=document.querySelector('.word-talking');
const slot=document.querySelector('.pill-slot');
const poster=document.querySelector('.poster');
const pill=document.querySelector('.video-pill');
let origin=performance.now(),raf=0,ready=false;
function ease(t){return 1-Math.pow(1-Math.max(0,Math.min(1,t)),3)}
function draw(t){
 ctx.clearRect(0,0,960,569);
 // Use the original Figma texture; only its sampling coordinates move.
 for(let y=0;y<569;y+=3){
  const sy=(y+121)/740.5*texture.height;
  const wave=reduced.matches?0:Math.sin(y*.011+t*.6)*24+Math.sin(y*.022-t*.37)*14;
  ctx.drawImage(texture,0,sy,texture.width,4/740.5*texture.height,-34+wave,y,1028,4);
 }
}
function render(now){
 const t=(now-origin)/1000;
 if(ready)draw(t);
 const phase=reduced.matches?4:t%14;
 let w=0,alpha=0;
 if(phase>=.45&&phase<1.2)w=142*ease((phase-.45)/.75);
 else if(phase>=1.2&&phase<2)w=142;
 else if(phase>=2&&phase<2.8)w=142+112*ease((phase-2)/.8);
 else if(phase>=2.8&&phase<12.4){w=254;alpha=ease((phase-2.8)/.55)}
 else if(phase>=12.4){w=254*(1-ease((phase-12.4)/1.1));alpha=1-ease((phase-12.4)/.35)}
 const shift=w*.61;
 startWord.style.transform=`translateX(${-shift/19.2}%)`;
 talking.style.transform=`translateX(${shift/19.2}%)`;
 slot.style.width=`${w/19.2}%`;
 poster.style.opacity=alpha;
 pill.tabIndex=alpha>.9?0:-1;
 const bob=reduced.matches?0:Math.sin(t*.75)*4;
 document.querySelector('.key').style.transform=`translateY(${bob}px)`;
 if(!reduced.matches&&!document.hidden)raf=requestAnimationFrame(render);
}
texture.onload=()=>{ready=true;cancelAnimationFrame(raf);render(performance.now())};
function restart(){origin=performance.now();cancelAnimationFrame(raf);render(origin)}
document.querySelector('.cue').addEventListener('click',restart);
pill.addEventListener('click',()=>{const expanded=slot.classList.toggle('expanded');pill.setAttribute('aria-expanded',expanded);pill.setAttribute('aria-label',expanded?'Close Flow preview':'Expand Flow preview')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){slot.classList.remove('expanded');pill.setAttribute('aria-expanded','false');pill.setAttribute('aria-label','Expand Flow preview');document.querySelectorAll('details[open]').forEach(d=>d.open=false)}});
document.addEventListener('click',e=>{document.querySelectorAll('details[open]').forEach(d=>{if(!d.contains(e.target))d.open=false})});
document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);if(!document.hidden)render(performance.now())});
reduced.addEventListener('change',restart);
