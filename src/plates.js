/* Kentekenjacht · kentekens tekenen (Europees formaat 520x112, Amerikaans/Japans 300x150)
 * Classic script (geen ES-module): alle bestanden delen één globale scope.
 * Laadvolgorde staat in index.html. */

/* width estimate for condensed plate font, so text always fits */
function est(t,size){ let w=0; for(const ch of t){ w += ch===' '?.26 : ch==='-'?.3 : (ch==='1'||ch==='I')?.3 : (ch==='M'||ch==='W')?.6 : .47; } return w*size; }
function txt(s,x,size,y,w,fg,anchor){ return `<text x="${x.toFixed(1)}" y="${y}" font-size="${size}" textLength="${w.toFixed(1)}" lengthAdjust="spacingAndGlyphs" text-anchor="${anchor}" fill="${fg}" font-family="'Barlow Condensed','Arial Narrow',sans-serif" font-weight="600">${s}</text>`; }

function plateSVG(id, g, hide){
  const c=C[id]; if(c.draw) return c.draw(g);
  let o=''; let lx=14, rx=506;
  o+=`<rect x="4" y="4" width="512" height="104" rx="12" fill="${c.bg}" stroke="${c.frame||'#111'}" stroke-width="${c.frameW||4}"/>`;
  if(c.band==='eu'){
    o+=`<rect x="8" y="8" width="50" height="96" rx="7" fill="#0A3A9E"/>`;
    for(let i=0;i<12;i++){const a=i*Math.PI/6; o+=`<circle cx="${(33+14*Math.cos(a)).toFixed(1)}" cy="${(38+14*Math.sin(a)).toFixed(1)}" r="2.3" fill="#FFDD00"/>`;}
    const fs = c.code.length>2?21:c.code.length===2?27:33;
    o+=`<text x="33" y="94" font-size="${fs}" text-anchor="middle" fill="#fff" font-family="'Barlow Condensed',sans-serif" font-weight="600">${c.code}</text>`;
    lx=66;
  } else if(c.band==='uk'){
    o+=miniFlag('UK',13,16,40,26)+`<text x="33" y="94" font-size="28" text-anchor="middle" fill="#111" font-family="'Barlow Condensed',sans-serif" font-weight="600">UK</text>`; lx=66;
  } else if(c.band==='no'){
    o+=`<rect x="8" y="8" width="50" height="96" rx="7" fill="#0A3A9E"/>`+miniFlag('NO',13,18,40,28)+`<text x="33" y="94" font-size="32" text-anchor="middle" fill="#fff" font-family="'Barlow Condensed',sans-serif" font-weight="600">N</text>`; lx=66;
  }
  if(c.band==='rs'){
    o+=`<rect x="8" y="8" width="50" height="96" rx="7" fill="#0A3A9E"/><text x="33" y="94" font-size="22" text-anchor="middle" fill="#fff" font-family="'Barlow Condensed',sans-serif" font-weight="600">SRB</text>`;
    o+=`<text x="72" y="52" font-size="20" text-anchor="middle" fill="#111" font-family="'Barlow Condensed',sans-serif" font-weight="600">${g.city[0]}</text><text x="72" y="78" font-size="20" text-anchor="middle" fill="#111" font-family="'Barlow Condensed',sans-serif" font-weight="600">${g.city[1]}</text>`;
    o+=`<text x="496" y="98" font-size="18" text-anchor="middle" fill="#111" font-family="'Barlow Condensed',sans-serif" font-weight="600">26</text>`;
    lx=84; rx=484;
  }
  if(c.arms==='lt'){ o+=`<path d="M70 32h26v24q0 16-13 22q-13-6-13-22z" fill="#C1272D" stroke="#111" stroke-width="2"/><path d="M75 58l5-9h4l3-6 3 1-2 5h3l1 9h-3l-1-5h-6l-3 6h-3z" fill="#fff"/>`; lx=100; }
  if(c.ch){
    o+=`<path d="M16 30h36v26q0 18-18 26q-18-8-18-26z" fill="#DA291C" stroke="#111" stroke-width="2.5"/><rect x="31" y="40" width="6" height="26" fill="#fff"/><rect x="21" y="50" width="26" height="6" fill="#fff"/>`;
    o+=`<path d="M468 30h36v26q0 18-18 26q-18-8-18-26z" fill="#fff" stroke="#111" stroke-width="2.5"/><path d="M468 30h36L468 74z" fill="#1F6FC5"/><path d="M468 30h36v26q0 18-18 26q-18-8-18-26z" fill="none" stroke="#111" stroke-width="2.5"/>`;
    lx=60; rx=462;
  }
  if(c.right==='fr'){ o+=`<rect x="462" y="8" width="50" height="96" rx="7" fill="#0A3A9E"/><rect x="474" y="16" width="26" height="26" rx="5" fill="#fff"/><circle cx="487" cy="29" r="8" fill="#E1000F"/><text x="487" y="94" font-size="27" text-anchor="middle" fill="#fff" font-family="'Barlow Condensed',sans-serif" font-weight="600">${g.side}</text>`; rx=456; }
  if(c.right==='it'){ o+=`<rect x="464" y="8" width="48" height="96" rx="7" fill="#0A3A9E"/><circle cx="488" cy="38" r="15" fill="none" stroke="#FFDD00" stroke-width="3"/><text x="488" y="45" font-size="19" text-anchor="middle" fill="#FFDD00" font-family="'Barlow Condensed',sans-serif" font-weight="600">${g.side}</text>${g.prov?`<text x="488" y="92" font-size="24" text-anchor="middle" fill="#FFDD00" font-family="'Barlow Condensed',sans-serif" font-weight="600">${g.prov}</text>`:''}`; rx=458; }
  if(c.stripes){ o+=`<rect x="${lx-2}" y="9" width="${rx-lx+8}" height="9" fill="#D0102B"/><rect x="${lx-2}" y="94" width="${rx-lx+8}" height="9" fill="#D0102B"/>`; }

  let size=78, y=86;
  if(g.top){ size=62; y=97; o+=`<text x="${(lx+rx)/2}" y="27" font-size="15" text-anchor="middle" fill="#111" letter-spacing="1.5" font-family="'Baloo 2',sans-serif" font-weight="700">${g.top}</text>`; }
  const avail = rx-lx-16, mid=(lx+rx)/2;
  if(Array.isArray(g.t)){
    let wl=est(g.t[0],size), wr=est(g.t[1],size), gap=46;
    const s=Math.min(1, avail/(wl+gap+wr)); wl*=s; wr*=s; gap*=s;
    const start=mid-(wl+gap+wr)/2, m=start+wl+gap/2;
    o+=txt(g.t[0],start,size,y,wl,c.fg,'start')+txt(g.t[1],start+wl+gap,size,y,wr,c.fg,'start');
    if(c.deco==='seals') o+=`<circle cx="${m}" cy="38" r="13" fill="#3FA9F5" stroke="#111" stroke-width="2.5"/><circle cx="${m}" cy="38" r="5" fill="#fff"/><circle cx="${m}" cy="75" r="13" fill="#E8E8E8" stroke="#111" stroke-width="2.5"/><path d="M${m-5} 70h10v6q0 6-5 8q-5-2-5-8z" fill="#111"/>`;
    if(c.deco==='shield') o+=`<path d="M${m-13} 34h26v24q0 16-13 22q-13-6-13-22z" fill="#D0102B"/><rect x="${m-13}" y="49" width="26" height="10" fill="#fff"/><path d="M${m-13} 34h26v24q0 16-13 22q-13-6-13-22z" fill="none" stroke="#111" stroke-width="2.5"/>`;
    const SH=`M${m-13} 34h26v24q0 16-13 22q-13-6-13-22z`;
    if(c.deco==='sk') o+=`<path d="${SH}" fill="#EE1C25"/><path d="M${m} 40v24M${m-6} 47h12M${m-8} 55h16" stroke="#fff" stroke-width="3"/><path d="M${m-12} 68q6-7 12-2q6-5 12 2q-5 9-12 10q-7-1-12-10z" fill="#0B4EA2"/><path d="${SH}" fill="none" stroke="#111" stroke-width="2.5"/>`;
    if(c.deco==='si') o+=`<path d="${SH}" fill="#2E8B3E"/><path d="M${m-8} 64l4-14h3v-4h2v4h3l4 14z" fill="#fff"/><path d="${SH}" fill="none" stroke="#111" stroke-width="2.5"/>`;
    if(c.deco==='hr') o+=`<clipPath id="hrclip"><path d="${SH}"/></clipPath><g clip-path="url(#hrclip)"><rect x="${m-13}" y="34" width="26" height="46" fill="#fff"/>${[0,1,2,3,4,5,6,7,8].map(r=>[0,1,2,3,4].map(k=>(r+k)%2?'':`<rect x="${m-13+k*5.2}" y="${34+r*5.2}" width="5.2" height="5.2" fill="#E2231A"/>`).join('')).join('')}</g><path d="${SH}" fill="none" stroke="#111" stroke-width="2.5"/>`;
    if(c.deco==='rs') o+=`<path d="${SH}" fill="#C6363C"/><path d="M${m} 38v34M${m-10} 52h20" stroke="#fff" stroke-width="4"/><path d="${SH}" fill="none" stroke="#111" stroke-width="2.5"/><text x="${m}" y="102" font-size="10" text-anchor="middle" fill="#111" font-family="sans-serif" font-weight="700">${g.cyr}</text>`;
    if(c.deco==='hu') o+=`<path d="M${m-8} 30l3-6 5 4 5-4 3 6z" fill="#F2C230" stroke="#111" stroke-width="1.5"/><path d="M${m-13} 32h26v24q0 16-13 22q-13-6-13-22z" fill="#fff"/><rect x="${m-13}" y="32" width="6.5" height="40" fill="#CE2939"/><rect x="${m}" y="32" width="13" height="40" fill="#CE2939"/><path d="M${m} 72q6-10 13-6v-4h-13z" fill="#477050"/><path d="M${m+6.5} 38v22M${m+2.5} 43h8M${m+3.5} 49h6" stroke="#fff" stroke-width="2"/><path d="M${m-13} 32h26v24q0 16-13 22q-13-6-13-22z" fill="none" stroke="#111" stroke-width="2.5"/>`;
  } else {
    const w=Math.min(est(g.t,size), avail);
    o+=txt(g.t,mid,size,y,w,c.fg,'middle');
  }
  return o;
}
