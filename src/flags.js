/* Kentekenjacht · vlaggen, getekend als SVG op 30x20
 * Classic script (geen ES-module): alle bestanden delen één globale scope.
 * Laadvolgorde staat in index.html. */

/* ================= flags (drawn, 30x20) ================= */
const hs = c => c.map((x,i)=>`<rect y="${(i*20/c.length).toFixed(3)}" width="30" height="${(20/c.length+.05).toFixed(3)}" fill="${x}"/>`).join('');
const vs = c => c.map((x,i)=>`<rect x="${i*10}" width="10.05" height="20" fill="${x}"/>`).join('');
const nordic = (bg,cr,inner) => `<rect width="30" height="20" fill="${bg}"/><rect x="8" width="5" height="20" fill="${cr}"/><rect y="7.5" width="30" height="5" fill="${cr}"/>` + (inner?`<rect x="9.4" width="2.2" height="20" fill="${inner}"/><rect y="8.9" width="30" height="2.2" fill="${inner}"/>`:'');
const FLAG = {
  NL: hs(['#AE1C28','#FFFFFF','#21468B']),
  BE: vs(['#1B1B1B','#FDDA24','#EF3340']),
  DE: hs(['#1B1B1B','#DD0000','#FFCE00']),
  FR: vs(['#002395','#FFFFFF','#ED2939']),
  UK: `<rect width="30" height="20" fill="#012169"/><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.4"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#C8102E" stroke-width="3.4"/>`,
  LU: hs(['#ED2939','#FFFFFF','#00A1DE']),
  IT: vs(['#009246','#FFFFFF','#CE2B37']),
  ES: `<rect width="30" height="20" fill="#C60B1E"/><rect y="5" width="30" height="10" fill="#FFC400"/>`,
  PT: `<rect width="30" height="20" fill="#DA291C"/><rect width="12" height="20" fill="#046A38"/><circle cx="12" cy="10" r="4" fill="none" stroke="#FFD100" stroke-width="1.6"/><rect x="10.6" y="8.4" width="2.8" height="3.4" rx=".6" fill="#fff" stroke="#DA291C" stroke-width=".6"/>`,
  AT: hs(['#C8102E','#FFFFFF','#C8102E']),
  CH: `<rect width="30" height="20" fill="#DA291C"/><rect x="13" y="4" width="4" height="12" fill="#fff"/><rect x="9" y="8" width="12" height="4" fill="#fff"/>`,
  DK: nordic('#C8102E','#FFFFFF'),
  SE: nordic('#006AA7','#FECC00'),
  NO: nordic('#BA0C2F','#FFFFFF','#00205B'),
  PL: hs(['#FFFFFF','#DC143C']),
  CZ: hs(['#FFFFFF','#D7141A'])+`<path d="M0 0L15 10L0 20Z" fill="#11457E"/>`,
  IE: vs(['#169B62','#FFFFFF','#FF883E']),
  GR: Array.from({length:9},(_,i)=>`<rect y="${(i*20/9).toFixed(3)}" width="30" height="2.27" fill="${i%2?'#FFFFFF':'#0D5EAF'}"/>`).join('')+`<rect width="11.1" height="11.1" fill="#0D5EAF"/><rect x="4.44" width="2.22" height="11.1" fill="#fff"/><rect y="4.44" width="11.1" height="2.22" fill="#fff"/>`,
  FI: nordic('#FFFFFF','#002F6C'),
  HU: hs(['#CE2939','#FFFFFF','#477050'])
};
function starPts(cx,cy,r,k=.4){ let p=[]; for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5, rr=i%2?r*k:r; p.push((cx+rr*Math.cos(a)).toFixed(2)+','+(cy+rr*Math.sin(a)).toFixed(2));} return p.join(' '); }
Object.assign(FLAG, {
  US: Array.from({length:13},(_,i)=>`<rect y="${(i*20/13).toFixed(3)}" width="30" height="1.6" fill="${i%2?'#FFFFFF':'#B22234'}"/>`).join('')+`<rect width="12" height="10.77" fill="#3C3B6E"/>`+[2,5,8].map(y=>[2,4.7,7.4,10.1].map(x=>`<circle cx="${x}" cy="${y}" r=".6" fill="#fff"/>`).join('')).join(''),
  CA: `<rect width="30" height="20" fill="#fff"/><rect width="7.5" height="20" fill="#D80621"/><rect x="22.5" width="7.5" height="20" fill="#D80621"/><polygon points="15,3.5 16.3,6.5 18,5.8 17.4,9.4 20,8.2 19.5,10.2 21,10.8 17.6,13.4 18,14.8 15.4,14.3 15.4,17 14.6,17 14.6,14.3 12,14.8 12.4,13.4 9,10.8 10.5,10.2 10,8.2 12.6,9.4 12,5.8 13.7,6.5" fill="#D80621"/>`,
  MX: vs(['#006847','#FFFFFF','#CE1126'])+`<circle cx="15" cy="10" r="2.6" fill="#8C5A2B"/>`,
  BR: `<rect width="30" height="20" fill="#009C3B"/><polygon points="15,2 28,10 15,18 2,10" fill="#FFDF00"/><circle cx="15" cy="10" r="4.6" fill="#002776"/><path d="M10.6 9.2Q15 7.6 19.5 11" stroke="#fff" stroke-width=".9" fill="none"/>`,
  AR: hs(['#74ACDF','#FFFFFF','#74ACDF'])+`<circle cx="15" cy="10" r="2" fill="#F6B40E"/>`,
  JP: `<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#BC002D"/>`,
  CN: `<rect width="30" height="20" fill="#DE2910"/><polygon points="${starPts(5,5,3)}" fill="#FFDE00"/>`+[[10,2],[12,4],[12,7],[10,9]].map(([x,y])=>`<polygon points="${starPts(x,y,1)}" fill="#FFDE00"/>`).join(''),
  KR: `<rect width="30" height="20" fill="#fff"/><path d="M9.5 10a5.5 5.5 0 0 1 11 0z" fill="#C60C30"/><path d="M9.5 10a5.5 5.5 0 0 0 11 0z" fill="#003478"/>`+[[5,4,33],[25,16,33],[25,4,-33],[5,16,-33]].map(([x,y,r])=>`<g transform="rotate(${r} ${x} ${y})" fill="#111"><rect x="${x-2.5}" y="${y-2}" width="5" height=".9"/><rect x="${x-2.5}" y="${y-.45}" width="5" height=".9"/><rect x="${x-2.5}" y="${y+1.1}" width="5" height=".9"/></g>`).join(''),
  AU: `<rect width="30" height="20" fill="#012169"/><g transform="scale(.5)">${FLAG.UK}</g><polygon points="${starPts(7.5,15,2.2,.45)}" fill="#fff"/>`+[[22,4],[25.5,9],[22,16.5],[19,9.5]].map(([x,y])=>`<polygon points="${starPts(x,y,1.1,.45)}" fill="#fff"/>`).join(''),
  TR: `<rect width="30" height="20" fill="#E30A17"/><circle cx="11" cy="10" r="5" fill="#fff"/><circle cx="12.3" cy="10" r="4" fill="#E30A17"/><polygon points="${starPts(17.6,10,2.3)}" fill="#fff"/>`,
  IN: hs(['#FF9933','#FFFFFF','#138808'])+`<circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" stroke-width=".6"/>`,
  RU: hs(['#FFFFFF','#0039A6','#D52B1E']),
  AE: hs(['#00732F','#FFFFFF','#111111'])+`<rect width="7.5" height="20" fill="#FF0000"/>`,
  MA: `<rect width="30" height="20" fill="#C1272D"/><polygon points="${starPts(15,10.5,5,.38)}" fill="none" stroke="#006233" stroke-width=".9"/>`
});
const flag = (id, cls='flag') => `<svg class="${cls}" viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${FLAG[id]}</svg>`;
const miniFlag = (id,x,y,w,h) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 30 20" preserveAspectRatio="none">${FLAG[id]}<rect width="30" height="20" fill="none" stroke="#111" stroke-width="1.2"/></svg>`;

Object.assign(FLAG, {
  EE: hs(['#0072CE','#1B1B1B','#FFFFFF']),
  LV: `<rect width="30" height="20" fill="#9E3039"/><rect y="8" width="30" height="4" fill="#fff"/>`,
  LT: hs(['#FDB913','#006A44','#C1272D']),
  SK: hs(['#FFFFFF','#0B4EA2','#EE1C25'])+`<path d="M7 4.5h8v6q0 4-4 5.5q-4-1.5-4-5.5z" fill="#EE1C25" stroke="#fff" stroke-width=".8"/><path d="M11 6v7M9 8h4M8.4 10h5.2" stroke="#fff" stroke-width=".9"/><path d="M7.6 12.6q1.6-1.6 3.4-.6q1.8-1 3.4.6q-1.4 2.4-3.4 3q-2-.6-3.4-3z" fill="#0B4EA2"/>`,
  SI: hs(['#FFFFFF','#005DA4','#ED1C24'])+`<path d="M6 2.5h6v4.5q0 3-3 4q-3-1-3-4z" fill="#005DA4" stroke="#ED1C24" stroke-width=".6"/><path d="M6.6 8.4l1.4-2 1 1.2 1-1.6 1.4 2.4z" fill="#fff"/>`,
  HR: hs(['#FF0000','#FFFFFF','#171796'])+`<rect x="12" y="5" width="6" height="7.5" fill="#fff" stroke="#171796" stroke-width=".4"/>`+[0,1,2,3,4].map(r=>[0,1,2,3].map(c=>(r+c)%2?'':`<rect x="${12+c*1.5}" y="${5+r*1.5}" width="1.5" height="1.5" fill="#FF0000"/>`).join('')).join(''),
  RO: vs(['#002B7F','#FCD116','#CE1126']),
  BG: hs(['#FFFFFF','#00966E','#D62612']),
  RS: hs(['#C6363C','#0C4076','#FFFFFF'])+`<path d="M7 5h6v5q0 3.5-3 5q-3-1.5-3-5z" fill="#C6363C" stroke="#fff" stroke-width=".6"/><path d="M10 6v8M7.6 9.5h4.8" stroke="#fff" stroke-width="1"/>`
});
