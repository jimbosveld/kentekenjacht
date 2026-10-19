/* Kentekenjacht · de 5 autotypes (niet gekoppeld aan landen)
 * Classic script (geen ES-module): alle bestanden delen één globale scope.
 * Laadvolgorde staat in index.html. */

const CARS=['#E8574A','#3C7DD9','#F2A93B','#4BAE6A','#8E6BD8','#E86F9A','#2BB3A6','#F0D24A'];
function shade(hex, a){
  const n=parseInt(hex.slice(1),16), t=a<0?0:255, p=Math.abs(a);
  const c=[n>>16, n>>8&255, n&255].map(v=>Math.round(v+(t-v)*p));
  return '#'+c.map(v=>v.toString(16).padStart(2,'0')).join('');
}
const OL='#1B1F3B', GLASS='url(#kjGlass)', TIRE='#24262F', PLAST='url(#kjPlast)', CHROME='url(#kjChrome)', RED='#E8333A', AMB='#FFB238';
const tire = (x,y,w,h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(18,w/4)}" fill="${TIRE}"/><path d="M${x+8} ${y+h*.35}h${w-16}M${x+8} ${y+h*.6}h${w-16}" stroke="#3B3F4C" stroke-width="5"/>`;
const glint = (x1,y1,x2,y2,w=9) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#fff" stroke-width="${w}" stroke-linecap="round" opacity=".75"/>`;
const CARTYPES = {
  hatch:{ pl:{cx:300, cy:248, s:1}, draw:(c,d,l)=>`
    ${tire(78,312,84,66)}${tire(438,312,84,66)}
    <path d="M128 172L168 66Q176 48 196 48L404 48Q424 48 432 66L472 172Z" fill="${c}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="268" y="54" width="64" height="8" rx="4" fill="${RED}"/>
    <path d="M162 158L196 78Q200 70 210 70L390 70Q400 70 404 78L438 158Z" fill="${GLASS}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
    ${glint(222,84,198,136)}${glint(246,84,232,112,6)}
    <path d="M300 150L238 118" stroke="${OL}" stroke-width="4" stroke-linecap="round"/><circle cx="300" cy="150" r="5" fill="${OL}"/>
    <rect x="30" y="156" width="540" height="190" rx="50" fill="${c}" stroke="${OL}" stroke-width="5"/>
    <rect x="66" y="166" width="468" height="11" rx="5.5" fill="${l}" opacity=".7"/>
    <path d="M44 190Q44 174 62 172L140 172L130 232L58 232Q44 232 44 218Z" fill="${RED}" stroke="${OL}" stroke-width="4"/><path d="M60 182h40v16h-44z" fill="#FF9A9A"/><path d="M108 182h24l-3 16h-21z" fill="${AMB}"/>
    <path d="M556 190Q556 174 538 172L460 172L470 232L542 232Q556 232 556 218Z" fill="${RED}" stroke="${OL}" stroke-width="4"/><path d="M540 182h-40v16h44z" fill="#FF9A9A"/><path d="M492 182h-24l3 16h21z" fill="${AMB}"/>
    <circle cx="300" cy="176" r="9" fill="${CHROME}" stroke="${OL}" stroke-width="3"/>
    <rect x="36" y="292" width="528" height="54" rx="24" fill="${PLAST}" stroke="${OL}" stroke-width="5"/>
    <rect x="62" y="314" width="44" height="9" rx="4" fill="#D0383E"/><rect x="494" y="314" width="44" height="9" rx="4" fill="#D0383E"/>
    <rect x="448" y="338" width="42" height="17" rx="8" fill="#8A93A3" stroke="${OL}" stroke-width="3"/>`},
  suv:{ pl:{cx:300, cy:250, s:.98}, draw:(c,d,l)=>`
    ${tire(66,318,100,66)}${tire(434,318,100,66)}
    <rect x="150" y="24" width="300" height="12" rx="6" fill="#4A4F5C" stroke="${OL}" stroke-width="3"/>
    <path d="M114 176L136 52Q140 36 158 36L442 36Q460 36 464 52L486 176Z" fill="${c}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M148 162L166 62L434 62L452 162Z" fill="${GLASS}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
    ${glint(196,74,180,140)}${glint(222,74,212,104,6)}
    <rect x="22" y="148" width="556" height="204" rx="34" fill="${c}" stroke="${OL}" stroke-width="5"/>
    <rect x="98" y="166" width="404" height="166" rx="20" fill="none" stroke="${d}" stroke-width="4"/>
    <rect x="50" y="158" width="500" height="10" rx="5" fill="${l}" opacity=".6"/>
    <rect x="34" y="166" width="50" height="104" rx="14" fill="${RED}" stroke="${OL}" stroke-width="4"/><rect x="42" y="176" width="34" height="26" rx="6" fill="#FF9A9A"/><rect x="42" y="236" width="34" height="22" rx="6" fill="${AMB}"/>
    <rect x="516" y="166" width="50" height="104" rx="14" fill="${RED}" stroke="${OL}" stroke-width="4"/><rect x="524" y="176" width="34" height="26" rx="6" fill="#FF9A9A"/><rect x="524" y="236" width="34" height="22" rx="6" fill="${AMB}"/>
    <rect x="270" y="176" width="60" height="12" rx="6" fill="${CHROME}" stroke="${OL}" stroke-width="3"/>
    <rect x="26" y="296" width="548" height="58" rx="16" fill="#2F333D" stroke="${OL}" stroke-width="5"/>
    <rect x="196" y="330" width="208" height="18" rx="6" fill="#B9C0CA" stroke="${OL}" stroke-width="3"/>
    <rect x="287" y="348" width="26" height="20" rx="4" fill="#5B606C" stroke="${OL}" stroke-width="3"/>`},
  van:{ pl:{cx:300, cy:252, s:.95}, draw:(c,d,l)=>`
    ${tire(84,318,82,62)}${tire(434,318,82,62)}
    <rect x="40" y="36" width="520" height="312" rx="40" fill="${c}" stroke="${OL}" stroke-width="5"/>
    <rect x="62" y="44" width="476" height="10" rx="5" fill="${l}" opacity=".6"/>
    <rect x="262" y="40" width="76" height="9" rx="4.5" fill="${RED}"/>
    <rect x="74" y="64" width="210" height="106" rx="14" fill="${GLASS}" stroke="${OL}" stroke-width="4"/><rect x="316" y="64" width="210" height="106" rx="14" fill="${GLASS}" stroke="${OL}" stroke-width="4"/>
    ${glint(110,78,92,150)}${glint(352,78,334,150)}
    <rect x="40" y="186" width="520" height="18" fill="${d}"/>
    <path d="M300 40V296" stroke="${OL}" stroke-width="4"/>
    <rect x="270" y="212" width="22" height="10" rx="4" fill="${CHROME}" stroke="${OL}" stroke-width="2.5"/><rect x="308" y="212" width="22" height="10" rx="4" fill="${CHROME}" stroke="${OL}" stroke-width="2.5"/>
    <rect x="46" y="178" width="36" height="112" rx="10" fill="${RED}" stroke="${OL}" stroke-width="4"/><rect x="52" y="186" width="24" height="24" rx="5" fill="${AMB}"/>
    <rect x="518" y="178" width="36" height="112" rx="10" fill="${RED}" stroke="${OL}" stroke-width="4"/><rect x="524" y="186" width="24" height="24" rx="5" fill="${AMB}"/>
    <rect x="34" y="296" width="532" height="52" rx="14" fill="${PLAST}" stroke="${OL}" stroke-width="5"/>
    <rect x="214" y="330" width="172" height="14" rx="5" fill="#8A93A3" stroke="${OL}" stroke-width="3"/>`},
  sport:{ pl:{cx:300, cy:258, s:.84}, draw:(c,d,l)=>`
    ${tire(64,296,116,70)}${tire(420,296,116,70)}
    <path d="M178 172L214 98Q222 84 240 84L360 84Q378 84 386 98L422 172Z" fill="${c}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M202 162L230 104L370 104L398 162Z" fill="${GLASS}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
    ${glint(250,112,230,152,7)}
    <path d="M20 262Q20 172 112 160L488 160Q580 172 580 262L580 300Q580 322 558 322L42 322Q20 322 20 300Z" fill="${c}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="264" y="161" width="22" height="130" fill="#fff" opacity=".85"/><rect x="314" y="161" width="22" height="130" fill="#fff" opacity=".85"/><rect x="268" y="86" width="16" height="16" fill="#fff" opacity=".85"/><rect x="316" y="86" width="16" height="16" fill="#fff" opacity=".85"/>
    <rect x="56" y="180" width="488" height="10" rx="5" fill="${l}" opacity=".6"/>
    <rect x="124" y="148" width="14" height="24" fill="${d}" stroke="${OL}" stroke-width="3"/><rect x="462" y="148" width="14" height="24" fill="${d}" stroke="${OL}" stroke-width="3"/>
    <rect x="58" y="134" width="484" height="18" rx="9" fill="${d}" stroke="${OL}" stroke-width="4"/>
    <rect x="52" y="198" width="190" height="18" rx="9" fill="${RED}" stroke="${OL}" stroke-width="3.5"/><rect x="358" y="198" width="190" height="18" rx="9" fill="${RED}" stroke="${OL}" stroke-width="3.5"/>
    <rect x="240" y="204" width="120" height="6" rx="3" fill="${RED}"/>
    <rect x="104" y="292" width="392" height="30" rx="8" fill="#2A2D36" stroke="${OL}" stroke-width="4"/>
    <path d="M190 296v22M240 296v22M360 296v22M410 296v22" stroke="#4A4F5C" stroke-width="4"/>
    <circle cx="140" cy="310" r="13" fill="#8A93A3" stroke="${OL}" stroke-width="3"/><circle cx="140" cy="310" r="6" fill="${TIRE}"/>
    <circle cx="460" cy="310" r="13" fill="#8A93A3" stroke="${OL}" stroke-width="3"/><circle cx="460" cy="310" r="6" fill="${TIRE}"/>`},
  classic:{ pl:{cx:300, cy:270, s:.8}, draw:(c,d,l)=>`
    ${tire(94,318,72,58)}${tire(434,318,72,58)}
    <ellipse cx="118" cy="292" rx="78" ry="62" fill="${d}" stroke="${OL}" stroke-width="5"/><ellipse cx="482" cy="292" rx="78" ry="62" fill="${d}" stroke="${OL}" stroke-width="5"/>
    <path d="M70 314Q66 116 300 104Q534 116 530 314Z" fill="${c}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M150 150Q190 118 300 114" stroke="${l}" stroke-width="10" stroke-linecap="round" fill="none" opacity=".7"/>
    <ellipse cx="254" cy="160" rx="42" ry="28" fill="${GLASS}" stroke="${OL}" stroke-width="4"/><ellipse cx="346" cy="160" rx="42" ry="28" fill="${GLASS}" stroke="${OL}" stroke-width="4"/>
    ${glint(240,148,232,170,6)}${glint(332,148,324,170,6)}
    <path d="M270 200v18M282 200v18M294 200v18M306 200v18M318 200v18M330 200v18" stroke="${d}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="84" cy="262" rx="18" ry="28" fill="${RED}" stroke="${OL}" stroke-width="4"/><ellipse cx="84" cy="254" rx="8" ry="10" fill="#FF9A9A"/>
    <ellipse cx="516" cy="262" rx="18" ry="28" fill="${RED}" stroke="${OL}" stroke-width="4"/><ellipse cx="516" cy="254" rx="8" ry="10" fill="#FF9A9A"/>
    <rect x="36" y="312" width="528" height="22" rx="11" fill="${CHROME}" stroke="${OL}" stroke-width="4"/>
    <rect x="120" y="300" width="16" height="40" rx="6" fill="${CHROME}" stroke="${OL}" stroke-width="3"/><rect x="464" y="300" width="16" height="40" rx="6" fill="${CHROME}" stroke="${OL}" stroke-width="3"/>
    <rect x="176" y="336" width="34" height="14" rx="7" fill="#8A93A3" stroke="${OL}" stroke-width="3"/><rect x="390" y="336" width="34" height="14" rx="7" fill="#8A93A3" stroke="${OL}" stroke-width="3"/>`}
};
const CARKEYS = Object.keys(CARTYPES);
// shared gradients for glass, chrome, bumpers and the ground shadow; injected once so dev/plates.html gets them too
document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
  <linearGradient id="kjGlass" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#EEF9FD"/><stop offset=".5" stop-color="#BCE0F1"/><stop offset=".52" stop-color="#A9D3E9"/><stop offset="1" stop-color="#7FB4D2"/></linearGradient>
  <linearGradient id="kjChrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FAFBFC"/><stop offset=".45" stop-color="#C3C9D2"/><stop offset=".55" stop-color="#9AA2AE"/><stop offset="1" stop-color="#E4E8EE"/></linearGradient>
  <linearGradient id="kjPlast" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4C5260"/><stop offset="1" stop-color="#2B2F39"/></linearGradient>
  <radialGradient id="kjShadow"><stop offset="0" stop-color="#1B1F3B" stop-opacity=".5"/><stop offset=".65" stop-color="#1B1F3B" stop-opacity=".2"/><stop offset="1" stop-color="#1B1F3B" stop-opacity="0"/></radialGradient>
</defs></svg>`);
let carN=0;
// lit from above: bright top edge, true colour mid-panel, darker underside; applied per panel via objectBoundingBox
const paint = (pid,c) => `<linearGradient id="${pid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(c,.38)}"/><stop offset=".3" stop-color="${shade(c,.08)}"/><stop offset=".7" stop-color="${c}"/><stop offset="1" stop-color="${shade(c,-.28)}"/></linearGradient>`;
function carSVG(id, g, hide, color, type='hatch'){
  const T=CARTYPES[type]||CARTYPES.hatch, p=T.pl, tall=C[id].tall; const pid='kjPaint'+(++carN);
  const w=(tall?236:408)*p.s, h=(tall?118:88)*p.s;
  const plate = `<svg x="${(p.cx-w/2).toFixed(1)}" y="${(p.cy-h/2).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" viewBox="${tall?'0 0 300 150':'0 0 520 112'}">${plateSVG(id,g)}</svg>`;
  return `<svg viewBox="0 0 600 400" role="img" aria-label="Achterkant van een auto met een kenteken">
  <defs>${paint(pid,color)}</defs>
  <ellipse cx="300" cy="382" rx="300" ry="20" fill="url(#kjShadow)"/>
  ${T.draw(`url(#${pid})`, shade(color,-.22), shade(color,.35))}
  ${plate}
  </svg>`;
}
