// Bouwt src/data/maps.js uit Natural Earth (world-atlas).
// Nieuw land? Voeg de code + ISO-nummer toe aan ISO hieronder en run: npm run maps
import fs from 'fs';
import {feature} from 'topojson-client';
import {geoNaturalEarth1, geoConicConformal, geoPath} from 'd3-geo';
const ISO={NL:528,BE:56,DE:276,FR:250,UK:826,LU:442,IT:380,ES:724,PT:620,AT:40,CH:756,DK:208,SE:752,NO:578,PL:616,CZ:203,IE:372,GR:300,FI:246,HU:348,US:840,CA:124,MX:484,BR:76,AR:32,JP:392,CN:156,KR:410,AU:36,TR:792,IN:356,RU:643,AE:784,MA:504,EE:233,LV:428,LT:440,SK:703,SI:705,HR:191,RO:642,BG:100,RS:688};
const BY={}; for(const [k,v] of Object.entries(ISO)) BY[String(v).padStart(3,'0')]=k;
const r = s => s ? s.replace(/(\d+\.\d)\d+/g,'$1') : '';
function build(file, proj, W, H, filter){
  const topo=JSON.parse(fs.readFileSync(new URL('../node_modules/world-atlas/'+file, import.meta.url)));
  const fc=feature(topo, topo.objects.countries);
  const path=geoPath(proj);
  const ours={}, rest=[];
  for(const f of fc.features){
    if(f.properties.name==='Antarctica') continue;
    if(filter && !filter(f, path)) continue;
    const d=r(path(f)); if(!d) continue;
    const k=BY[f.id];
    if(k) ours[k]=d; else rest.push(d);
  }
  const cent={}; for(const f of fc.features){ const k=BY[f.id]; if(k){ const c=path.centroid(f); if(!isNaN(c[0])) cent[k]=c.map(v=>Math.round(v)); } }
  return {W,H,ours,rest:rest.join(''),cent};
}
const W1=1000,H1=500;
const world=build('countries-110m.json', geoNaturalEarth1().fitExtent([[6,6],[W1-6,H1-6]],{type:'Sphere'}), W1,H1);
const W2=640,H2=600;
const eu=geoConicConformal().rotate([-12,0]).center([0,52]).parallels([40,65]).scale(1050).translate([W2/2,H2/2]).clipExtent([[0,0],[W2,H2]]);
const europe=build('countries-50m.json', eu, W2,H2, (f,p)=>{const b=p.bounds(f); return isFinite(b[0][0]) && b[1][0]>0 && b[0][0]<W2 && b[1][1]>0 && b[0][1]<H2;});
const out='const MAPS='+JSON.stringify({world,europe})+';';
fs.writeFileSync(new URL('../src/data/maps.js', import.meta.url), '/* GEGENEREERD door scripts/build-maps.mjs — niet met de hand bewerken. */\n'+out+'\n');
console.log((out.length/1024).toFixed(0)+'KB', Object.keys(world.ours).length, Object.keys(europe.ours).sort().join(','));
