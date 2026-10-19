/* Kentekenjacht · opslag, geluid, stempels, schermen en spelverloop
 * Classic script (geen ES-module): alle bestanden delen één globale scope.
 * Laadvolgorde staat in index.html. */

/* ================= save ================= */
const KEY='kentekenjacht-v1';
const fresh = () => ({total:0, best:{1:0,2:0,3:0}, hits:{}, mute:false, unlockAll:false});
let S = (()=>{ try{ const j=JSON.parse(localStorage.getItem(KEY)||'null'); if(j) return Object.assign(fresh(), j); }catch(e){} return fresh(); })();
const store = () => { try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} };
const unlocked = l => l===1 || S.unlockAll || S.best[l-1]>=2;
const hits = id => S.hits[id]||0;
const stickerCount = () => ALL.filter(id=>hits(id)>=3).length;

/* ================= sound & voice ================= */
let AC=null;
function tone(f,d,type='triangle',t0=0,vol=.18){
  if(S.mute) return;
  try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)();
    const t=AC.currentTime+t0, o=AC.createOscillator(), g=AC.createGain();
    o.type=type; o.frequency.setValueAtTime(f,t); g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(.001,t+d);
    o.connect(g).connect(AC.destination); o.start(t); o.stop(t+d+.02);
  }catch(e){}
}
const sfx = {
  good(){ tone(660,.12); tone(880,.12,'triangle',.1); tone(1320,.22,'triangle',.2); },
  bad(){ tone(330,.2,'sine',0,.2); tone(247,.3,'sine',.17,.2); },
  toot(){ tone(392,.1,'square',0,.05); tone(392,.16,'square',.15,.05); },
  thump(){ tone(120,.16,'sine',0,.45); tone(65,.2,'triangle',.01,.35); },
  bonus(){ [523,659,784,1047].forEach((f,i)=>tone(f,.14,'triangle',i*.08)); },
  sticker(){ [1047,1319,1568,2093].forEach((f,i)=>tone(f,.1,'sine',i*.06,.12)); }
};

/* ================= confetti ================= */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function confetti(n=70){
  if(reduce) return; const cv=$('#fx'), ctx=cv.getContext('2d'); cv.width=innerWidth; cv.height=innerHeight;
  const cols=['#E2BE62','#C2372D','#2E7D4F','#2457A6','#6B3FA0'];
  const P=Array.from({length:n},()=>({x:cv.width/2+(Math.random()-.5)*160, y:cv.height*.45, vx:(Math.random()-.5)*14, vy:-Math.random()*14-6, s:6+Math.random()*7, c:pick(cols), a:Math.random()*6}));
  let f=0; (function step(){ ctx.clearRect(0,0,cv.width,cv.height);
    P.forEach(p=>{p.vy+=.45; p.x+=p.vx; p.y+=p.vy; p.a+=.2; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.a); ctx.fillStyle=p.c; ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2); ctx.restore();});
    if(++f<90) requestAnimationFrame(step); else ctx.clearRect(0,0,cv.width,cv.height); })();
}
function toast(html){
  // stack below toasts that are still showing, so a bonus and a sticker can appear together
  const below=document.querySelectorAll('.toast').length;
  const d=document.createElement('div'); d.className='toast'; d.innerHTML=html;
  if(below) d.style.top=`calc(env(safe-area-inset-top, 0px) + ${84+below*64}px)`;
  document.body.appendChild(d); setTimeout(()=>d.remove(),2300);
}

/* ================= passport stamps ================= */
const REG = {US:'am',CA:'am',MX:'am',BR:'am',AR:'am', JP:'as',CN:'as',KR:'as',IN:'as',RU:'as',TR:'as', AU:'oc', AE:'me', MA:'me'};
const INK = {eu:'#2457A6', am:'#C2372D', as:'#2E7D4F', oc:'#C9701E', me:'#6B3FA0'};
const TINT = {eu:'#DCE6F5', am:'#F6DCD8', as:'#DCEFE2', oc:'#F8E5CF', me:'#E8DDF3'};
const ICODE = {CH:'CH', US:'USA', CA:'CDN', MX:'MEX', BR:'BR', AR:'RA', JP:'J', CN:'CN', KR:'ROK', AU:'AUS', TR:'TR', IN:'IND', RU:'RUS', AE:'UAE', MA:'MA'};
const codeOf = id => C[id].code || ICODE[id] || id;
const TODAY = new Date().toLocaleDateString('nl-NL',{day:'2-digit', month:'short', year:'numeric'}).replace('.','').toUpperCase();
function stampSVG(id){
  const ink=INK[REG[id]||'eu'], nm=C[id].name.toUpperCase(), code=codeOf(id);
  const round=(id.charCodeAt(0)+id.charCodeAt(1))%2===0;
  const nmW = nm.length>11 ? ` textLength="${round?118:170}" lengthAdjust="spacingAndGlyphs"` : '';
  const t=(x,y,sz,txt,f,extra='')=>`<text x="${x}" y="${y}" font-size="${sz}" text-anchor="middle" fill="${ink}" font-family="${f}" ${extra}>${txt}</text>`;
  const BIG="'Baloo 2',sans-serif\" font-weight=\"800", TY="'Special Elite','Courier New',monospace";
  if(round) return `<svg viewBox="0 0 220 140" aria-hidden="true"><g filter="url(#ink)">
    <circle cx="110" cy="70" r="64" fill="none" stroke="${ink}" stroke-width="5"/><circle cx="110" cy="70" r="55" fill="none" stroke="${ink}" stroke-width="1.8"/>
    ${t(110,38,11,'AANKOMST',TY,'letter-spacing="3"')}${t(110,84,code.length>2?38:46,code,BIG)}${t(110,103,13,nm,BIG,nmW)}${t(110,117,9.5,TODAY,TY)}</g></svg>`;
  return `<svg viewBox="0 0 220 140" aria-hidden="true"><g filter="url(#ink)">
    <rect x="6" y="8" width="208" height="124" rx="16" fill="none" stroke="${ink}" stroke-width="6"/><rect x="17" y="19" width="186" height="102" rx="8" fill="none" stroke="${ink}" stroke-width="1.8"/>
    ${t(110,40,13,'✈ AANKOMST',TY,'letter-spacing="3"')}${t(110,83,code.length>2?40:48,code,BIG)}${t(110,102,15,nm,BIG,nmW)}${t(110,116,10,TODAY,TY)}</g></svg>`;
}
function showStamp(id){
  const st=$('#stage'); st.querySelectorAll('.stampfx').forEach(x=>x.remove());
  const d=document.createElement('div'); d.className='stampfx'; d.style.setProperty('--rot',(rint(26)-13)+'deg'); d.innerHTML=stampSVG(id);
  st.appendChild(d); sfx.thump();
}

/* ================= screens ================= */
function show(id){ ['home','game','end','book','mapscr'].forEach(s=>$('#'+s).hidden = s!==id); }
const TC = {1:'#C9701E', 2:'#2457A6', 3:'#2E7D4F'};

function renderHome(){
  $('#homecar').innerHTML = carSVG('NL',{t:'KJ-007-X'},false,'#E8574A','hatch');
  $('#potStars').innerHTML = `${S.total} ${STAR()}`;
  $('#potStickers').textContent = `${stickerCount()} van ${ALL.length}`;
  $('#levels').innerHTML = [1,2,3].map(l=>{
    const open=unlocked(l), L=LV[l];
    const stars=[0,1,2].map(i=>STAR(i<S.best[l]?'':'empty')).join('');
    return `<button type="button" class="ticket ${open?'':'locked'}" data-l="${l}" style="--tc:${TC[l]}" ${open?'':'aria-disabled="true"'}>
      <span class="stub">REIS ${l}</span>
      <span class="tbody"><span class="tname">${L.name}${open?'':'<span class="lock">Op slot</span>'}</span>
      <span class="tdesc">${open?L.desc:'Haal eerst 2 sterren bij '+LV[l-1].name}</span>
      <span class="best">${stars}</span></span></button>`;
  }).join('');
  const z=(s,n)=>(s+'<'.repeat(n)).slice(0,n);
  $('#mrz').textContent = z('P<NLDKENTEKENJACHT<<SPEURNEUS',44)+'\n'+z(`KJ${String(S.total).padStart(5,'0')}<${String(stickerCount()).padStart(2,'0')}NLD${S.best[1]}${S.best[2]}${S.best[3]}`,44);
  $('#muteBtn').textContent = S.mute ? 'Geluid uit' : 'Geluid aan';
  $('#unlockBtn').textContent = S.unlockAll ? 'Aan' : 'Uit';
  $('#unlockBtn').style.background = S.unlockAll ? 'var(--okSoft)' : '';
  show('home');
}

$('#levels').addEventListener('click', e=>{
  const b=e.target.closest('.ticket'); if(!b) return; const l=+b.dataset.l;
  if(!unlocked(l)){ sfx.bad(); b.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:300}); return; }
  startRound(l);
});
$('#muteBtn').onclick = ()=>{ S.mute=!S.mute; store(); renderHome(); };
$('#unlockBtn').onclick = ()=>{ S.unlockAll=!S.unlockAll; store(); renderHome(); };
$('#parentBtn').onclick = ()=>{ const o=$('#ouders'); o.hidden=!o.hidden; $('#parentBtn').setAttribute('aria-expanded', String(!o.hidden)); if(!o.hidden) o.scrollIntoView({behavior:'smooth', block:'nearest'}); };
document.querySelectorAll('[data-reset]').forEach(b=>{
  b.onclick = ()=>{
    if(!b.classList.contains('armed')){
      document.querySelectorAll('[data-reset].armed').forEach(x=>{ x.classList.remove('armed'); x.textContent='Wissen'; });
      b.classList.add('armed'); b.textContent='Zeker? Tik nog eens';
      clearTimeout(b._t); b._t=setTimeout(()=>{ b.classList.remove('armed'); b.textContent='Wissen'; }, 4000);
      return;
    }
    clearTimeout(b._t); b.classList.remove('armed'); b.textContent='Wissen';
    const k=b.dataset.reset;
    if(k==='stars' || k==='all'){ S.total=0; S.best={1:0,2:0,3:0}; }
    if(k==='stickers' || k==='all'){ S.hits={}; }
    if(k==='all'){ S.mute=false; S.unlockAll=false; }
    store(); renderHome();
    toast(k==='stars'?'Sterren gewist':k==='stickers'?'Postzegels gewist':'Alles staat weer op nul');
  };
});
$('#toBook').onclick = renderBook;
$('#bookHome').onclick = renderHome;
$('#homeBtn').onclick = ()=>{ clearTimeout(R&&R.timer); renderHome(); };
$('#endHome').onclick = renderHome;
$('#againBtn').onclick = ()=> startRound(R.lv);

/* ================= game ================= */
let R=null;
function carOrder(){ const a=shuffle(CARKEYS); let b=shuffle(CARKEYS); if(b[0]===a[a.length-1]) b.push(b.shift()); return [...a,...b]; }
function makeQs(pool, lv){
  if(lv===3){ const w=shuffle(WORLD).slice(0,6), e=shuffle(EU).slice(0,4); return shuffle([...w,...e]); }
  let out=[]; while(out.length<10){ let s=shuffle(pool); if(out.length && s[0]===out[out.length-1]) s.push(s.shift()); out=out.concat(s); }
  return out.slice(0,10);
}
function options(id, lv){
  const pool=LV[lv].pool, like=C[id].like.filter(x=>pool.includes(x));
  let d = lv===3 ? like.slice(0,3) : shuffle(like).slice(0,2);
  const rest=shuffle(pool.filter(x=>x!==id && !d.includes(x)));
  while(d.length<3) d.push(rest.shift());
  return shuffle([id,...d]);
}
function startRound(lv){
  R={lv, i:0, right:0, stars:0, streak:0, log:[], news:[], stamped:[], qs:makeQs(LV[lv].pool, lv), timer:0, cars:carOrder()};
  show('game'); setWeather(nextWeather()); nextQ();
}
function renderBar(){
  $('#dots').innerHTML = Array.from({length:10},(_,i)=>`<span class="dot ${R.log[i]===true?'r':R.log[i]===false?'w':i===R.i?'now':''}"></span>`).join('');
  $('#score').innerHTML = `${STAR()}<span>${R.stars}</span>`;
  const f=$('#flame'); f.hidden = R.streak<2; f.textContent = `🔥 ${R.streak}`;
}
function nextQ(){
  if(R.i>=10) return endRound();
  const id=R.qs[R.i]; R.cur=id; R.done=false;
  $('#stage').querySelectorAll('.stampfx').forEach(x=>x.remove());
  $('#stage').dataset.mood = R.i<3?'ochtend' : R.i<6?'dag' : R.i<8?'avond' : 'nacht';
  const car=$('#car'); car.className='car'; void car.offsetWidth;
  car.innerHTML = carSVG(id, C[id].gen(), false, pick(CARS), R.cars[R.i]); car.classList.add('enter');
  setTimeout(()=>sfx.toot(), 450);
  $('#say').className='say'; $('#sayText').innerHTML = R.lv===3 ? 'Waar in de wereld komt deze auto vandaan?' : 'Uit welk land komt deze auto?';
  $('#nextBtn').hidden=true;
  $('#answers').innerHTML = options(id,R.lv).map(o=>`<button type="button" class="chunky ans" data-id="${o}">${flag(o)}<span>${C[o].name}</span></button>`).join('');
  renderBar();
}
$('#answers').addEventListener('click', e=>{
  const b=e.target.closest('.ans'); if(!b || R.done) return; R.done=true;
  const id=R.cur, c=C[id], ok=b.dataset.id===id;
  document.querySelectorAll('.ans').forEach(x=>{ if(x.dataset.id===id) x.classList.add(ok?'right':'reveal'); else if(x!==b) x.classList.add('dim'); });
  if(ok){
    R.right++; R.streak++; R.stars++; S.total++; R.stamped.push(id);
    S.hits[id]=hits(id)+1; sfx.good(); setTimeout(()=>showStamp(id), 120);
    if(R.streak>=3 && R.streak%3===0){ R.stars++; S.total++; setTimeout(()=>{ sfx.bonus(); confetti(); toast(`🔥 ${R.streak} op rij! ${STAR()} bonus`); },600); }
    if(S.hits[id]===3){ R.news.push(id); setTimeout(()=>{ sfx.sticker(); toast(`${flag(id)} Nieuwe postzegel!`); }, R.streak%3===0?950:700); }
    $('#say').className='say good';
    $('#sayText').innerHTML = `Goed zo! ${c.name}.<small>${c.clue}</small>`;
    $('#score').classList.remove('bump'); void $('#score').offsetWidth; $('#score').classList.add('bump');
  } else {
    R.streak=0; b.classList.add('wrong'); sfx.bad();
    $('#say').className='say oops';
    $('#sayText').innerHTML = `Oei! Dit is ${c.name}.<small>Tip: ${c.clue}</small>`;
  }
  R.log[R.i]=ok; renderBar(); store();
  $('#nextBtn').hidden=false;
  const myI=R.i; if(ok) R.timer=setTimeout(()=>{ if(R.i===myI && R.done) goNext(); }, 1700);
});
function goNext(){
  clearTimeout(R.timer); $('#nextBtn').hidden=true;
  const car=$('#car'); car.classList.remove('enter'); car.classList.add('leave');
  panX += 700; $('#stage').style.setProperty('--pan', panX+'px');
  R.i++; setTimeout(nextQ, reduce?0:420);
}
$('#nextBtn').onclick = goNext;

function endRound(){
  const n = R.right>=9?3 : R.right>=7?2 : R.right>=5?1 : 0;
  const wasLocked = R.lv<3 && !unlocked(R.lv+1);
  S.best[R.lv]=Math.max(S.best[R.lv], n); store();
  $('#bigstars').innerHTML=[0,1,2].map(i=>STAR(i<n?'on':'off')).join('');
  document.querySelectorAll('#bigstars .star.on').forEach((s,i)=>s.style.animationDelay=(i*.25)+'s');
  $('#endTitle').textContent = ['Oefenen maakt kampioen!','Goed bezig!','Heel goed gedaan!','Super speurneus!'][n];
  $('#endSub').innerHTML = `${R.right} van de 10 goed · +${R.stars} ${STAR()} in je pot`;
  $('#roundStamps').innerHTML = R.stamped.map((id,i)=>`<div style="--r:${rint(24)-12}deg; animation-delay:${.5+i*.12}s">${stampSVG(id)}</div>`).join('');
  let news = R.news.map(id=>`<span class="pill">${flag(id)} ${C[id].name}</span>`).join('');
  if(wasLocked && unlocked(R.lv+1)) news = `<span class="pill gold">Nieuwe reis open: ${LV[R.lv+1].name}!</span>` + news;
  $('#endNews').innerHTML = news;
  $('#endMap').hidden = !R.news.length;
  show('end'); $('#end').scrollTop=0;
  if(n>0){ setTimeout(()=>{ confetti(120); sfx.bonus(); }, 300); }
}

function renderBook(){
  $('#bookCount').textContent = `${stickerCount()} / ${ALL.length}`;
  const cell = (id,i)=>{
    const h=Math.min(3,hits(id)), got=h>=3, reg=REG[id]||'eu';
    if(got) return `<div class="pz"><div class="frame" style="--r:${(i%3-1)*2.5}deg"><div class="art" style="--tint:${TINT[reg]}">${flag(id)}<b>${codeOf(id)}</b></div></div>
      <span class="pn">${C[id].name}</span><span class="clue">${C[id].clue}</span></div>`;
    return `<div class="pz no"><div class="frame">?</div><span class="pn">???</span><span class="pips">${[0,1,2].map(k=>`<i class="${k<h?'on':''}"></i>`).join('')}</span></div>`;
  };
  $('#grid').innerHTML = `<h3 class="grp">Europa</h3>`+EU.map(cell).join('')+`<h3 class="grp">De rest van de wereld</h3>`+WORLD.map(cell).join('');
  show('book'); $('#book').scrollTop=0;
}
