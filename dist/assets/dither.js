// Background-only ordered dithering. One buffer pixel = two CSS pixels.
const BAYER_8 = new Uint8Array([
  0,48,12,60,3,51,15,63, 32,16,44,28,35,19,47,31,
  8,56,4,52,11,59,7,55, 40,24,36,20,43,27,39,23,
  2,50,14,62,1,49,13,61, 34,18,46,30,33,17,45,29,
  10,58,6,54,9,57,5,53, 42,26,38,22,41,25,37,21
]);
const PIXEL_SIZE = 2, COLOR_LEVELS = 10;
function quantizeBackground(data, width, height) {
  for (let y=0; y<height; y++) for(let x=0; x<width; x++) {
    const at=(y*width+x)*4, threshold=(BAYER_8[(y%8)*8+x%8]+.5)/64;
    for(let channel=0;channel<3;channel++) {
      const scaled=data[at+channel]/255*(COLOR_LEVELS-1);
      data[at+channel]=Math.round(Math.min(COLOR_LEVELS-1,Math.floor(scaled+threshold))*255/(COLOR_LEVELS-1));
    }
  }
}
const active = new Map();
const texture = new Image(); texture.src='/assets/gradient.png';
function mountBackground(host, hero) {
  const canvas=document.createElement('canvas'); canvas.className='bayer-background';
  canvas.setAttribute('aria-hidden','true'); canvas.dataset.bayer='8x8';
  canvas.dataset.pixelSize=PIXEL_SIZE;canvas.dataset.colorLevels=COLOR_LEVELS;
  const ctx=canvas.getContext('2d',{alpha:false});
  const buffer=document.createElement('canvas');
  const paint=buffer.getContext('2d',{willReadFrequently:true,alpha:false});
  if(!ctx||!paint)return;
  host.appendChild(canvas);
  let width=0,height=0,visible=false,last=-Infinity,raf=0;
  function resize(){
    width=Math.ceil(host.clientWidth/PIXEL_SIZE);height=Math.ceil(host.clientHeight/PIXEL_SIZE);
    canvas.width=buffer.width=Math.max(1,width);canvas.height=buffer.height=Math.max(1,height);
    canvas.style.width=width*PIXEL_SIZE+'px';canvas.style.height=height*PIXEL_SIZE+'px';last=-Infinity;
  }
  function radial(cx,cy,rx,ry,color){
    paint.save();paint.translate(cx,cy);paint.scale(rx,ry);
    const g=paint.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,color);g.addColorStop(1,'transparent');
    paint.fillStyle=g;paint.fillRect(-1,-1,2,2);paint.restore();
  }
  function draw(now){
    const reduced=host.closest('[data-reduced="true"]')||matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(visible&&!document.hidden&&width&&height&&(now-last>50)&&((hero&&!reduced)||last===-Infinity)&&(!hero||(texture.complete&&texture.naturalWidth))){
      last=now;const t=reduced?0:now/1000;
      paint.fillStyle=hero?'#ffffff':'#f6f5f8';paint.fillRect(0,0,width,height);
      if(hero&&texture.complete&&texture.naturalWidth){
        paint.save();paint.filter='blur(13px)';paint.translate(width/2,height/2);
        paint.rotate(Math.sin(t*.18)*.065);paint.scale(1.14+Math.sin(t*.22)*.04,1.13);
        paint.drawImage(texture,-width*.5+Math.sin(t*.2)*width*.025,-height*.5,width,height);paint.restore();
        // Composite the original white center and upper fade before quantization.
        paint.save();paint.translate(width/2,height*.25);paint.scale(width*.6,height*.9);
        const center=paint.createRadialGradient(0,0,0,0,0,1);
        center.addColorStop(0,'white');center.addColorStop(.52,'white');center.addColorStop(.75,'rgba(255,255,255,.92)');center.addColorStop(1,'transparent');
        paint.fillStyle=center;paint.fillRect(-2,-2,4,4);paint.restore();
        const fade=paint.createLinearGradient(0,0,0,height*.58);fade.addColorStop(0,'white');fade.addColorStop(1,'transparent');paint.fillStyle=fade;paint.fillRect(0,0,width,height);
      }else if(!hero){
        radial(0,height*.6,width*.6,height*.8,'rgba(244,214,240,.50)');
        radial(width,height*.8,width*.6,height*.8,'rgba(248,249,197,.50)');
      }
      const image=paint.getImageData(0,0,width,height);quantizeBackground(image.data,width,height);ctx.putImageData(image,0,0);
      host.classList.add('has-bayer-background');
    }
    raf=requestAnimationFrame(draw);
  }
  const size=new ResizeObserver(resize);size.observe(host);resize();
  const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)last=-Infinity;});visibility.observe(host);
  raf=requestAnimationFrame(draw);
  active.set(host,()=>{cancelAnimationFrame(raf);size.disconnect();visibility.disconnect();canvas.remove();});
}
function syncBackgrounds(){
  for(const [host,dispose] of active)if(!host.isConnected){dispose();active.delete(host);}
  document.querySelectorAll('.spectrum-field,.fb-voice-scene').forEach(host=>{if(!active.has(host))mountBackground(host,host.classList.contains('spectrum-field'));});
}
new MutationObserver(syncBackgrounds).observe(document.getElementById('root'),{childList:true,subtree:true});
syncBackgrounds();
