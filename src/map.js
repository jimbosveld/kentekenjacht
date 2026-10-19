/* Kentekenjacht · wereldkaart-scherm
 * Classic script (geen ES-module): alle bestanden delen één globale scope.
 * Laadvolgorde staat in index.html. */

/* ================= world map ================= */
let MAPVIEW='world', MAPSEL=null;
const SMALL = {world:['KR','AE'], europe:['LU']};
function mapState(id){ const h=hits(id); return h>=3?'got':h>=1?'seen':'todo'; }
function mapSVG(view){
  const m=MAPS[view], fresh=new Set(ALL.filter(id=>mapState(id)==='got' && !(S.mapSeen||[]).includes(id)));
  const pat=Object.keys(INK).map(r=>`<pattern id="h-${r}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="${TINT[r]}"/><rect width="2.6" height="7" fill="${INK[r]}"/></pattern>`).join('');
  const fillOf=(id,st)=>{ const r=REG[id]||'eu'; return st==='got'?INK[r]:st==='seen'?`url(#h-${r})`:''; };
  let o=`<svg viewBox="${vbRect().join(' ')}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Wereldkaart met jouw landen"><defs>${pat}</defs><path class="land" d="${m.rest}"/>`;
  for(const [id,d] of Object.entries(m.ours)){
    const st=mapState(id), f=fillOf(id,st);
    o+=`<path class="cty ${st}${fresh.has(id)?' fresh':''}${MAPSEL===id?' sel':''}" data-id="${id}" d="${d}" ${f?`style="fill:${f}"`:''}><title>${st==='todo'?'Nog te ontdekken':C[id].name}</title></path>`;
  }
  for(const id of SMALL[view]){ const c=m.cent[id]; if(!c) continue; const st=mapState(id), f=fillOf(id,st);
    o+=`<circle class="cty dotm ${st}${MAPSEL===id?' sel':''}" data-id="${id}" cx="${c[0]}" cy="${c[1]}" r="${view==='world'?6:9}" ${f?`style="fill:${f}"`:''}/>`; }
  if(view==='world'){
    const pts=['PT','IE','FI','GR','ES','PL','NO'].map(k=>m.cent[k]).filter(Boolean);
    const x0=Math.min(...pts.map(p=>p[0]))-14, x1=Math.max(...pts.map(p=>p[0]))+14, y0=Math.min(...pts.map(p=>p[1]))-16, y1=Math.max(...pts.map(p=>p[1]))+14;
    o+=`<g class="eujump" data-jump="europe"><rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" rx="8"/><text x="${(x0+x1)/2}" y="${y0-6}" text-anchor="middle">Europa ›</text></g>`;
  }
  return o+'</svg>';
}
function mapInfo(id){
  if(!id) return `<span class="label">Tik op een land</span>`;
  const st=mapState(id), h=Math.min(3,hits(id));
  if(st==='todo') return `<span class="mflag q">?</span><span><b>Nog te ontdekken</b><small>Dit land zit in het spel. Raad het goed om het in te kleuren!</small></span>`;
  return `${flag(id,'mflag')}<span><b>${C[id].name}</b><small>${st==='got'?'Postzegel verdiend · '+C[id].clue:h+' van 3 keer goed. Nog '+(3-h)+' en hij wordt helemaal gekleurd.'}</small></span>`;
}
/* ---- zoom & pan: the view is a centre point plus a width in map units; height follows the box shape ---- */
const VIEW0 = {world:{cx:530, cy:182, zoom:2}, europe:{cx:320, cy:300, zoom:1}};
const MAXZOOM = 6;
let VB=null;
function boxAspect(){ const r=$('#mapbox').getBoundingClientRect(); return r.width && r.height ? r.width/r.height : 2; }
const fullW = (m,a) => Math.max(m.W, m.H*a);
function resetView(){ const m=MAPS[MAPVIEW], v=VIEW0[MAPVIEW]; VB={view:MAPVIEW, cx:v.cx, cy:v.cy, w:fullW(m,boxAspect())/v.zoom}; }
function vbRect(){
  if(!VB || VB.view!==MAPVIEW) resetView();
  const m=MAPS[MAPVIEW], a=boxAspect(), full=fullW(m,a);
  VB.w = Math.min(full, Math.max(full/MAXZOOM, VB.w));
  const w=VB.w, h=w/a;
  VB.cx = w>=m.W ? m.W/2 : Math.min(m.W-w/2, Math.max(w/2, VB.cx));
  VB.cy = h>=m.H ? m.H/2 : Math.min(m.H-h/2, Math.max(h/2, VB.cy));
  return [VB.cx-w/2, VB.cy-h/2, w, h].map(v=>+v.toFixed(2));
}
function applyView(){ const s=$('#mapbox svg'); if(s) s.setAttribute('viewBox', vbRect().join(' ')); }
function unitsPerPx(){ return VB.w / $('#mapbox svg').getBoundingClientRect().width; }
function zoomAt(f, px, py){ // f>1 zooms in; (px,py) stays put on screen
  const r=$('#mapbox svg').getBoundingClientRect(), [x0,y0]=vbRect(), k=unitsPerPx();
  const ux=x0+(px-r.left)*k, uy=y0+(py-r.top)*k, before=VB.w;
  VB.w/=f; vbRect(); const g=VB.w/before;
  VB.cx = ux + (VB.cx-ux)*g; VB.cy = uy + (VB.cy-uy)*g; applyView();
}
function zoomCenter(f){ const r=$('#mapbox svg').getBoundingClientRect(); zoomAt(f, r.left+r.width/2, r.top+r.height/2); }

const PTR=new Map(); let dragged=false, moved=0, pinch=0;
$('#mapbox').addEventListener('pointerdown', e=>{
  if(e.target.closest('.zoom')) return;
  PTR.set(e.pointerId, {x:e.clientX, y:e.clientY}); moved=0; if(PTR.size===1) dragged=false;
  if(PTR.size===2){ const [a,b]=[...PTR.values()]; pinch=Math.hypot(a.x-b.x, a.y-b.y); }
});
window.addEventListener('pointermove', e=>{
  const p=PTR.get(e.pointerId); if(!p || !VB) return;
  const dx=e.clientX-p.x, dy=e.clientY-p.y;
  if(PTR.size===1){
    moved+=Math.abs(dx)+Math.abs(dy);
    if(moved>8){ dragged=true; const k=unitsPerPx(); VB.cx-=dx*k; VB.cy-=dy*k; applyView(); }
  }
  p.x=e.clientX; p.y=e.clientY;
  if(PTR.size===2){
    const [a,b]=[...PTR.values()], d=Math.hypot(a.x-b.x, a.y-b.y);
    if(pinch){ zoomAt(d/pinch, (a.x+b.x)/2, (a.y+b.y)/2); dragged=true; }
    pinch=d;
  }
});
const ptrEnd = e => { PTR.delete(e.pointerId); if(PTR.size<2) pinch=0; };
window.addEventListener('pointerup', ptrEnd);
window.addEventListener('pointercancel', ptrEnd);
$('#mapbox').addEventListener('wheel', e=>{ e.preventDefault(); zoomAt(Math.exp(-e.deltaY*.002), e.clientX, e.clientY); }, {passive:false});
new ResizeObserver(applyView).observe($('#mapbox'));

function renderMap(){
  $('#mapCount').textContent = `${stickerCount()} / ${ALL.length}`;
  document.querySelectorAll('#mapscr .seg button').forEach(b=>b.classList.toggle('on', b.dataset.v===MAPVIEW));
  show('mapscr');
  $('#mapbox').innerHTML = mapSVG(MAPVIEW) + `<div class="zoom"><button class="chunky" type="button" data-zoom="in" aria-label="Inzoomen">+</button><button class="chunky" type="button" data-zoom="out" aria-label="Uitzoomen">−</button></div>`;
  $('#mapinfo').innerHTML = mapInfo(MAPSEL);
  S.mapSeen = ALL.filter(id=>mapState(id)==='got'); store();
}
function openMap(){ MAPVIEW='world'; MAPSEL=null; VB=null; renderMap(); $('#mapscr').scrollTop=0; }
$('#mapbox').addEventListener('click', e=>{
  if(dragged){ dragged=false; return; }
  const z=e.target.closest('[data-zoom]'); if(z){ zoomCenter(z.dataset.zoom==='in'?1.6:1/1.6); return; }
  const j=e.target.closest('[data-jump]'); if(j){ MAPVIEW=j.dataset.jump; renderMap(); return; }
  const c=e.target.closest('[data-id]'); MAPSEL = c ? c.dataset.id : null; renderMap();
});
document.querySelectorAll('#mapscr .seg button').forEach(b=> b.onclick=()=>{ MAPVIEW=b.dataset.v; renderMap(); });
$('#mapHome').onclick = renderHome;
$('#toMap').onclick = openMap;
$('#endMap').onclick = openMap;
