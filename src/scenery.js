/* Kentekenjacht · landschap (parallax-silhouetten) en weer (regen, sneeuw, mist)
 * Classic script (geen ES-module): alle bestanden delen één globale scope.
 * Laadvolgorde staat in index.html. */
/* ================= scenery: seamless silhouette tiles, built once as CSS masks ================= */
const svgURL = (w,h,body) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${body}</svg>`)}")`;
// whole-number sine frequencies make the right edge meet the left edge, so the tile repeats without a seam
const ridgeY = (x,w,base,waves) => waves.reduce((y,[a,f,p])=>y+a*Math.sin(x/w*2*Math.PI*f+p), base);
function ridge(w,h,base,waves){
  let d=`M0 ${h}`; for(let x=0;x<=w;x+=8) d+=`L${x} ${ridgeY(x,w,base,waves).toFixed(1)}`;
  return `<path d='${d}L${w} ${h}Z'/>`;
}
const tree = (x,g,r) => `<rect x='${x-3}' y='${g-r-14}' width='6' height='${r+14}'/><circle cx='${x}' cy='${g-r-14}' r='${r}'/><circle cx='${x-r*.55}' cy='${g-r*.8-14}' r='${r*.7}'/><circle cx='${x+r*.55}' cy='${g-r*.75-14}' r='${r*.72}'/>`;
const poplar = (x,g,h) => `<rect x='${x-2}' y='${g-12}' width='4' height='12'/><ellipse cx='${x}' cy='${g-12-h/2}' rx='${h*.17}' ry='${h/2}'/>`;
function gable(x,g,w,h,win){ // Dutch stepped gable; windows go to the night-light layer
  const y=g-h, s=w*.16, st=w/6;
  win.push(`<rect x='${x+w*.2}' y='${y+h*.25}' width='${w*.2}' height='${h*.22}'/><rect x='${x+w*.6}' y='${y+h*.25}' width='${w*.2}' height='${h*.22}'/><rect x='${x+w*.4}' y='${y-s*1.6}' width='${w*.2}' height='${s*1.1}'/>`);
  return `<path d='M${x} ${g}V${y-s}h${st}v${-s}h${st}v${-s}h${2*st}v${s}h${st}v${s}h${st}V${g}Z'/>`;
}
function mill(x,g,win){
  const t=g-130, hub=t-8;
  win.push(`<rect x='${x-6}' y='${g-74}' width='12' height='18'/>`);
  let o=`<path d='M${x-36} ${g}L${x-18} ${t}H${x+18}L${x+36} ${g}Z'/><path d='M${x-24} ${t+2}Q${x} ${t-30} ${x+24} ${t+2}Z'/><rect x='${x-46}' y='${g-52}' width='92' height='7'/>`;
  for(const a of [25,115,205,295]) o+=`<g transform='rotate(${a} ${x} ${hub})'><rect x='${x-3}' y='${hub-92}' width='6' height='92'/><rect x='${x+3}' y='${hub-86}' width='16' height='66'/></g>`;
  return o+`<circle cx='${x}' cy='${hub}' r='7'/>`;
}
function lamppost(x,g,win){
  win.push(`<circle cx='${x+14}' cy='${g-100}' r='6'/>`);
  return `<rect x='${x-2.5}' y='${g-110}' width='5' height='110'/><path d='M${x} ${g-108}q2-6 14-6v4h-12z'/><rect x='${x+8}' y='${g-104}' width='12' height='5'/>`;
}
function church(x,g,win){
  win.push(`<circle cx='${x}' cy='${g-96}' r='7'/><path d='M${x+38} ${g-14}v-22a6 6 0 0 1 12 0v22zM${x+72} ${g-14}v-22a6 6 0 0 1 12 0v22z'/>`);
  return `<rect x='${x-18}' y='${g-122}' width='36' height='122'/><path d='M${x-22} ${g-120}L${x} ${g-200}L${x+22} ${g-120}Z'/><rect x='${x-1.5}' y='${g-216}' width='3' height='18'/><rect x='${x-6}' y='${g-210}' width='12' height='3'/>`
    + `<path d='M${x+18} ${g}V${g-58}L${x+64} ${g-92}L${x+112} ${g-58}V${g}Z'/>`;
}
function stolp(x,g,w,h,win){ // pyramid-roofed farmhouse
  win.push(`<rect x='${x+w*.2}' y='${g-h*.32}' width='${w*.14}' height='${h*.16}'/><rect x='${x+w*.66}' y='${g-h*.32}' width='${w*.14}' height='${h*.16}'/>`);
  return `<path d='M${x} ${g}V${g-h*.42}L${x+w*.5} ${g-h}L${x+w} ${g-h*.42}V${g}Z'/>`;
}
function rng(seed){ return ()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; }; }
function buildScenery(){
  const st=$('#stage'), win=[];
  const far = ridge(2400,200,105,[[34,3,0],[16,7,1.2],[7,17,.4]]);
  const mw=[[12,3,.5],[6,7,2],[4,11,1]], MW=1800, r=rng(7);
  let mid = ridge(MW,200,150,mw);
  for(let x=50; x<MW-50; x+=40+r()*120){ const g=ridgeY(x,MW,150,mw)+8; mid += r()<.6 ? tree(x,g,13+r()*7) : poplar(x,g,38+r()*14); if(r()<.3){ x+=18; mid+=poplar(x,ridgeY(x,MW,150,mw)+8,34+r()*10); } }
  const g=228;
  const near = `<rect y='${g-2}' width='2600' height='${240-g+2}'/>`
    + gable(40,g,52,70,win)+gable(92,g,46,84,win)+gable(138,g,56,62,win)
    + tree(240,g,22)+poplar(290,g,70)+poplar(312,g,60)+lamppost(380,g,win)
    + mill(560,g,win)+tree(700,g,26)+tree(745,g,18)+lamppost(850,g,win)
    + gable(930,g,50,80,win)+gable(980,g,58,66,win)+gable(1038,g,48,90,win)
    + `<rect x='1100' y='${g-16}' width='120' height='16' rx='8'/>`+tree(1262,g,24)+poplar(1318,g,64)+lamppost(1380,g,win)
    + church(1520,g,win)+tree(1690,g,20)+stolp(1760,g,150,110,win)+poplar(1940,g,66)+poplar(1962,g,56)
    + lamppost(2020,g,win)+gable(2090,g,50,74,win)+gable(2140,g,54,88,win)+gable(2194,g,46,68,win)+gable(2240,g,56,80,win)
    + tree(2380,g,22)+`<rect x='2420' y='${g-14}' width='90' height='14' rx='7'/>`+tree(2540,g,17);
  st.style.setProperty('--m-far', svgURL(2400,200,far));
  st.style.setProperty('--m-mid', svgURL(MW,200,mid));
  st.style.setProperty('--m-near', svgURL(2600,240,near));
  st.style.setProperty('--m-win', svgURL(2600,240,win.join('')));
}
let panX=0;
buildScenery();

/* ================= weather: one kind per trip, particles on the stage canvas ================= */
const WX = {kind:'helder', P:[], splash:[], raf:0, cv:$('#wx'), ctx:null, w:0, h:0, last:0};
WX.ctx = WX.cv.getContext('2d');
let wxBag=[];
const nextWeather = () => { if(!wxBag.length) wxBag=shuffle(['helder','regen','sneeuw','mist','helder']); return wxBag.pop(); };
function wxSize(){
  const r=WX.cv.getBoundingClientRect(), d=Math.min(2, devicePixelRatio||1);
  WX.w=r.width; WX.h=r.height; WX.cv.width=Math.round(r.width*d); WX.cv.height=Math.round(r.height*d);
  WX.ctx.setTransform(d,0,0,d,0,0);
}
function wxSeed(){
  const {w,h,kind}=WX, area=w*h, rnd=Math.random;
  WX.splash=[];
  if(kind==='regen') WX.P = Array.from({length:Math.round(area/2600)}, ()=>({x:rnd()*w, y:rnd()*h, v:.85+rnd()*.5, l:10+rnd()*12, g:h*(.76+rnd()*.24)}));
  else if(kind==='sneeuw') WX.P = Array.from({length:Math.round(area/4200)}, ()=>({x:rnd()*w, y:rnd()*h, r:1.2+rnd()*2.6, v:.25+rnd()*.35, ph:rnd()*6.3}));
  else if(kind==='mist') WX.P = Array.from({length:7}, (_,i)=>({x:rnd()*w, y:h*(.5+rnd()*.4), r:w*(.25+rnd()*.2), v:(.2+rnd()*.5)*(i%2?1:-1)}));
  else WX.P=[];
}
function setWeather(kind){
  WX.kind=kind; $('#stage').dataset.wx=kind;
  cancelAnimationFrame(WX.raf); WX.raf=0;
  wxSize(); wxSeed(); WX.ctx.clearRect(0,0,WX.w,WX.h);
  if(kind!=='helder' && !reduce){ WX.last=0; WX.raf=requestAnimationFrame(wxStep); }
}
new ResizeObserver(()=>{ if(!WX.raf) return; wxSize(); wxSeed(); }).observe(WX.cv);
function wxStep(t){
  if($('#game').hidden){ WX.raf=0; return; }
  const dt=Math.min(50, WX.last?t-WX.last:16.7)/16.7; WX.last=t;
  const {ctx,w,h,P}=WX, night=$('#stage').dataset.mood==='nacht';
  ctx.clearRect(0,0,w,h);
  if(WX.kind==='regen'){
    ctx.strokeStyle = night?'rgba(170,190,230,.45)':'rgba(230,238,250,.6)'; ctx.lineWidth=1.4; ctx.beginPath();
    for(const p of P){
      p.y+=p.v*16*dt; p.x-=p.v*2.4*dt;
      if(p.y>p.g){ if(WX.splash.length<40) WX.splash.push({x:p.x, y:p.g, f:0}); p.y=-p.l-Math.random()*h*.3; p.x=Math.random()*(w+60); }
      ctx.moveTo(p.x,p.y); ctx.lineTo(p.x+p.l*.15, p.y-p.l);
    }
    ctx.stroke();
    ctx.lineWidth=1.2; ctx.strokeStyle = night?'rgba(170,190,230,.5)':'rgba(230,238,250,.7)';
    WX.splash = WX.splash.filter(s=>{ s.f+=dt; if(s.f>9) return false; ctx.globalAlpha=1-s.f/9; ctx.beginPath(); ctx.ellipse(s.x,s.y,2+s.f*.9,.8+s.f*.3,0,0,Math.PI*2); ctx.stroke(); return true; });
    ctx.globalAlpha=1;
  } else if(WX.kind==='sneeuw'){
    ctx.fillStyle = night?'rgba(225,232,250,.85)':'rgba(255,255,255,.92)'; ctx.beginPath();
    for(const p of P){
      p.ph+=.03*dt; p.y+=p.v*3*dt; p.x+=Math.sin(p.ph)*.6*dt;
      if(p.y>h+4){ p.y=-4; p.x=Math.random()*w; }
      ctx.moveTo(p.x+p.r,p.y); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    }
    ctx.fill();
  } else if(WX.kind==='mist'){
    const c = night?'150,162,195':'255,255,255';
    for(const p of P){
      p.x+=p.v*.5*dt; if(p.x>w+p.r) p.x=-p.r; if(p.x<-p.r) p.x=w+p.r;
      const gr=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      gr.addColorStop(0,`rgba(${c},.32)`); gr.addColorStop(1,`rgba(${c},0)`);
      ctx.fillStyle=gr; ctx.fillRect(p.x-p.r,p.y-p.r,p.r*2,p.r*2);
    }
  }
  WX.raf=requestAnimationFrame(wxStep);
}
