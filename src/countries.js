/* Kentekenjacht · landen: kentekenpatroon, tip, lijkt-op-lijst, levels
 * Classic script (geen ES-module): alle bestanden delen één globale scope.
 * Laadvolgorde staat in index.html. */

/* ================= countries & plate templates ================= */
const C = {
  NL:{name:'Nederland', bg:'#F6C400', fg:'#111', band:'eu', code:'NL', like:['LU','UK','BE'],
      gen:()=>({t:pat(pick(['LL-DDD-L','D-LLL-DD','LLL-DD-L','DD-LLL-D','L-DDD-LL','LL-DD-LL']),'BDFGHJKLNPRSTVXZ')}),
      clue:'Geel, met streepjes tussen de groepjes letters en cijfers.'},
  BE:{name:'België', bg:'#FFFFFF', fg:'#B3121D', band:'eu', code:'B', like:['DK','FR','NL'],
      gen:()=>({t:(1+rint(2))+'-'+pat('LLL-DDD')}),
      clue:'Rode letters op wit! En vooraan een cijfer: 1-ABC-123.'},
  DE:{name:'Duitsland', bg:'#FFFFFF', fg:'#111', band:'eu', code:'D', deco:'seals', like:['AT','PL','CZ'],
      gen:()=>({t:[pick(['B','M','HH','K','F','S','DO','HB','KA','N']), pat(pick(['LL DDDD','L DDD','LL DDD']))]}),
      clue:'Twee ronde stempeltjes in het midden. Vooraan staat de stad: B is Berlijn.'},
  FR:{name:'Frankrijk', bg:'#FFFFFF', fg:'#111', band:'eu', code:'F', right:'fr', like:['IT','PT','ES'],
      gen:()=>({t:pat('LL-DDD-LL'), side:pick(['75','13','69','33','59','67','06','44','29','31'])}),
      clue:'Blauw aan béide kanten. Rechts staat het nummer van de streek.'},
  UK:{name:'Groot-Brittannië', bg:'#F6C400', fg:'#111', band:'uk', code:'UK', like:['NL','LU','IE'],
      gen:()=>({t:pat('LLDD LLL')}),
      clue:'Achterop geel, met cijfers in het midden: AB12 CDE.'},
  LU:{name:'Luxemburg', bg:'#F6C400', fg:'#111', band:'eu', code:'L', like:['NL','UK','BE'],
      gen:()=>({t:pat(pick(['LL DDDD','L DDDD']))}),
      clue:'Geel, net als Nederland, maar zonder streepjes: AB 1234.'},
  IT:{name:'Italië', bg:'#FFFFFF', fg:'#111', band:'eu', code:'I', right:'it', like:['FR','PT','ES'],
      gen:()=>({t:pat('LL DDDLL'), side:String(10+rint(17)), prov:rint(2)?pick(['MI','TO','NA','BO','FI','VE']):''}),
      clue:'Ook blauw aan béide kanten, maar rechts zit een geel rondje. AB 123CD, zonder streepjes.'},
  ES:{name:'Spanje', bg:'#FFFFFF', fg:'#111', band:'eu', code:'E', like:['PT','IT','FR'],
      gen:()=>({t:pat('DDDD LLL','BCDFGHJKLMNPRSTVWXYZ')}),
      clue:'Eerst vier cijfers, dan drie letters: 1234 ABC.'},
  PT:{name:'Portugal', bg:'#FFFFFF', fg:'#111', band:'eu', code:'P', like:['ES','FR','IT'],
      gen:()=>({t:pat('LL-DD-LL')}),
      clue:'P in de blauwe strook. Letters, cijfers, letters, met streepjes: AB-12-CD.'},
  AT:{name:'Oostenrijk', bg:'#FFFFFF', fg:'#111', band:'eu', code:'A', deco:'shield', stripes:true, like:['DE','DK','CH'],
      gen:()=>({t:[pick(['W','G','L','S','I','K']), pat(pick(['DDDD L','DDD LL','DDDD LL']))]}),
      clue:'Rode strepen boven en onder, en een klein rood-wit schildje.'},
  CH:{name:'Zwitserland', bg:'#FFFFFF', fg:'#111', band:null, ch:true, like:['AT','DK','DE'],
      gen:()=>({t:pick(['ZH','BE','GE','VD','LU','BS','AG','TI'])+' '+pat('D'.repeat(3+rint(4))).replace(/^0/,'4')}),
      clue:'Geen blauwe strook, maar een rood schildje met een wit kruis.'},
  DK:{name:'Denemarken', bg:'#FFFFFF', fg:'#111', band:'eu', code:'DK', frame:'#C8102E', frameW:9, like:['BE','AT','NO'],
      gen:()=>({t:pat('LL DD DDD')}),
      clue:'Een rode rand rondom de hele plaat.'},
  SE:{name:'Zweden', bg:'#FFFFFF', fg:'#111', band:'eu', code:'S', like:['FI','NO','DK'],
      gen:()=>({t:pat(pick(['LLL DDD','LLL DDL']))}),
      clue:'Drie letters, een spatie, dan twee cijfers en nog iets: ABC 12D.'},
  NO:{name:'Noorwegen', bg:'#FFFFFF', fg:'#111', band:'no', code:'N', like:['SE','FI','DK'],
      gen:()=>({t:pat('LL DDDDD')}),
      clue:'In de blauwe strook staat geen sterrenkring, maar een vlaggetje met een kruis en een N.'},
  PL:{name:'Polen', bg:'#FFFFFF', fg:'#111', band:'eu', code:'PL', like:['CZ','DE','HU'],
      gen:()=>({t:pat(pick(['LL DDDDD','LLL DDLL','LL DDDLL']))}),
      clue:'Twee of drie letters, dan een spatie en een lange rij: WA 12345.'},
  CZ:{name:'Tsjechië', bg:'#FFFFFF', fg:'#111', band:'eu', code:'CZ', like:['PL','HU','DE'],
      gen:()=>({t:pat('DLD DDDD').replace(/^0/,'1')}),
      clue:'Het begint met cijfer-letter-cijfer: 1AB 2345.'},
  IE:{name:'Ierland', bg:'#FFFFFF', fg:'#111', band:'eu', code:'IRL', like:['UK','FI','GR'],
      gen:()=>{const k=pick([['D','BAILE ÁTHA CLIATH'],['C','CORCAIGH'],['G','GAILLIMH'],['KY','CIARRAÍ'],['L','LUIMNEACH']]);
               return {t:pick(['231','232','241','242','251','252','261'])+'-'+k[0]+'-'+(10+rint(9000)), top:k[1]};},
      clue:'Bovenaan staat een plaatsnaam in het Iers, en vooraan het jaar.'},
  GR:{name:'Griekenland', bg:'#FFFFFF', fg:'#111', band:'eu', code:'GR', like:['CZ','HU','FI'],
      gen:()=>({t:pat('LLL-DDDD','ABEHIKMNPTXYZ')}),
      clue:'Drie letters, streepje, vier cijfers: ABE-1234.'},
  FI:{name:'Finland', bg:'#FFFFFF', fg:'#111', band:'eu', code:'FIN', like:['SE','NO','GR'],
      gen:()=>({t:pat('LLL-DDD')}),
      clue:'FIN in de blauwe strook, en drie letters - streepje - drie cijfers: ABC-123.'},
  HU:{name:'Hongarije', bg:'#FFFFFF', fg:'#111', band:'eu', code:'H', deco:'hu', like:['CZ','PL','GR'],
      gen:()=>{const v='AEU', k='BCDFGHKLMNPRSTVZ', two=rint(2)?pick(v)+pick(v):pick(k)+pick(k); return {t:[two, pat('LL-DDD')]};},
      clue:'Een klein wapenschild met een kroontje tussen de letters: AA ∇ AB-123.'}
};

/* ---- world plates: own drawing per country ---- */
const PF="'Barlow Condensed','Arial Narrow',sans-serif", CJK="'Hiragino Sans','Noto Sans CJK JP','Noto Sans JP','Yu Gothic','Microsoft YaHei','Apple SD Gothic Neo',sans-serif", RD="'Baloo 2',sans-serif";
function T(s,x,y,size,fill,o={}){ const w=o.w!==undefined?o.w:est(s,size); return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${o.a||'middle'}" font-family="${o.f||PF}" font-weight="${o.wt||600}" ${w?`textLength="${w.toFixed(1)}" lengthAdjust="spacingAndGlyphs"`:''} ${o.ls?`letter-spacing="${o.ls}"`:''}>${s}</text>`; }
const fitW = (s,size,max) => Math.min(est(s,size),max);
const box = (w,h,bg,stroke='#111',sw=4,rx=12) => `<rect x="${sw/2+1}" y="${sw/2+1}" width="${w-sw-2}" height="${h-sw-2}" rx="${rx}" fill="${bg}" stroke="${stroke}" stroke-width="${sw}"/>`;
const ARL='ABEKMHOPCTYX', HANGUL=['가','나','다','라','마','거','너','더','러','머','버','서','어','저','고','노','도','로','모','보','소','오','조','구','누','두','루','무','부','수','우','주','하','허','호'];
Object.assign(C, {
  US:{name:'Verenigde Staten', tall:true, like:['CA','MX','AU'],
      gen:()=> rint(2) ? {s:'CA', t:pat('DLLLDDD').replace(/^0/,'8')} : {s:'TX', t:pat('LLL-DDDD')},
      draw:g=> g.s==='CA'
        ? box(300,150,'#fff')+T('California',150,50,36,'#C8102E',{w:0,f:"'Pacifico',cursive",wt:400})+T(g.t,150,120,74,'#1B2A7A',{w:fitW(g.t,74,250)})+T('DMV.CA.GOV',150,140,12,'#1B2A7A',{w:0,f:RD,wt:700})
        : box(300,150,'#fff')+`<polygon points="${starPts(64,30,10)}" fill="#BF0A30"/><polygon points="${starPts(236,30,10)}" fill="#BF0A30"/>`+T('TEXAS',150,40,30,'#111',{w:0,f:RD,wt:800,ls:3})+T(g.t,150,118,70,'#111',{w:fitW(g.t,70,256)})+T('THE LONE STAR STATE',150,140,12,'#111',{w:0,f:RD,wt:700,ls:1}),
      clue:'Bovenaan een staat, zoals California of Texas. Die liggen in Amerika!'},
  CA:{name:'Canada', tall:true, like:['US','MX','AU'],
      gen:()=> rint(2) ? {s:'ON', t:pat('LLLL DDD')} : {s:'QC', t:pat('LDD LLL')},
      draw:g=> box(300,150,'#fff','#1E3A8A')+(g.s==='ON'
        ? T('ONTARIO',150,36,24,'#1E3A8A',{w:0,f:RD,wt:800,ls:4})+T('YOURS TO DISCOVER',150,140,14,'#1E3A8A',{w:0,f:RD,wt:700,ls:1})
        : T('Québec',150,38,28,'#1E3A8A',{w:0,f:RD,wt:800})+T('JE ME SOUVIENS',150,140,14,'#1E3A8A',{w:0,f:RD,wt:700,ls:1}))
        +T(g.t,150,112,68,'#1E3A8A',{w:fitW(g.t,68,256)}),
      clue:'Ontario en Québec liggen in Canada. Blauwe letters op wit.'},
  MX:{name:'Mexico', tall:true, like:['US','CA','BR'],
      gen:()=>({s:pick(['JALISCO','NUEVO LEÓN','PUEBLA','SONORA']), t:pat('LLL-DDD-L')}),
      draw:g=> box(300,150,'#fff')+T(g.s,150,38,24,'#006847',{w:0,f:RD,wt:800,ls:2})+T(g.t,150,108,62,'#111',{w:fitW(g.t,62,256)})
        +T('TRASERA',150,140,13,'#555',{w:0,f:RD,wt:700,ls:2}),
      clue:'Bovenaan een Mexicaanse staat, zoals Jalisco. Op de achterplaat staat TRASERA (achter).'},
  BR:{name:'Brazilië', like:['AR','MX','TR'],
      gen:()=>({t:pat('LLLDLDD')}),
      draw:g=> box(520,112,'#fff')+`<rect x="8" y="8" width="504" height="26" rx="6" fill="#0A3A9E"/><circle cx="34" cy="21" r="8" fill="none" stroke="#fff" stroke-width="2"/>`+miniFlag('BR',470,12,30,18)+T('BRASIL',260,29,20,'#fff',{w:0,f:RD,wt:800,ls:4})+T(g.t,260,100,66,'#111',{w:fitW(g.t,66,440)}),
      clue:'Blauwe balk bovenaan met BRASIL. Letters en cijfers door elkaar: ABC1D23.'},
  AR:{name:'Argentinië', like:['BR','MX','TR'],
      gen:()=>({t:pat('LL DDD LL')}),
      draw:g=> box(520,112,'#fff')+`<rect x="8" y="8" width="504" height="26" rx="6" fill="#0A3A9E"/><circle cx="34" cy="21" r="8" fill="none" stroke="#fff" stroke-width="2"/>`+miniFlag('AR',470,12,30,18)+T('REPUBLICA ARGENTINA',260,29,18,'#fff',{w:0,f:RD,wt:800,ls:2})+T(g.t,260,100,66,'#111',{w:fitW(g.t,66,440)}),
      clue:'Ook een blauwe balk, maar met ARGENTINA erin: AB 123 CD.'},
  JP:{name:'Japan', tall:true, like:['CN','KR','US'],
      gen:()=>({top:pick(['品川','横浜','大阪','札幌','神戸'])+' '+pick(['300','500','330','530']), k:pick(['さ','す','た','な','ま','や','ら','わ','あ','ほ']), t:pat('DD')+'-'+pat('DD')}),
      draw:g=> box(300,150,'#fff','#1E6B3A',5,10)+T(g.top,150,50,32,'#1E6B3A',{w:0,f:CJK,wt:700})+T(g.k,40,124,38,'#1E6B3A',{w:0,f:CJK,wt:700})+T(g.t,178,134,88,'#1E6B3A',{w:196}),
      clue:'Groene letters en Japanse tekens. Het grote nummer heeft een streepje: 12-34.'},
  CN:{name:'China', like:['JP','KR','IN'],
      gen:()=>({t:pick(['京','沪','粤','川','浙','苏'])+pick(LET)+'·'+pat(pick(['DDDDD','LDDDD','DDDDL']))}),
      draw:g=> box(520,112,'#1446A0')+`<rect x="14" y="14" width="492" height="84" rx="8" fill="none" stroke="#fff" stroke-width="3"/>`+T(g.t,260,84,66,'#fff',{w:400,f:"'Barlow Condensed',"+CJK}),
      clue:'Een blauwe plaat met witte letters, en vooraan een Chinees teken.'},
  KR:{name:'Zuid-Korea', like:['JP','CN','TR'],
      gen:()=>({t:pat('DDD')+pick(HANGUL)+' '+pat('DDDD')}),
      draw:g=> box(520,112,'#fff')+`<rect x="8" y="8" width="50" height="96" rx="7" fill="#0A3A9E"/>`+miniFlag('KR',13,18,40,26)+T('KOR',33,92,22,'#fff',{w:0})+T(g.t,286,86,72,'#111',{w:400,f:"'Barlow Condensed',"+CJK}),
      clue:'Koreaanse letters tussen de cijfers, en links KOR met een vlaggetje.'},
  AU:{name:'Australië', like:['UK','NL','US'],
      gen:()=>({t:pat('LL·DD·LL')}),
      draw:g=> box(520,112,'#F7E35A')+T(g.t,260,78,70,'#111',{w:fitW(g.t,70,440)})+T('NEW SOUTH WALES',260,100,17,'#111',{w:0,f:RD,wt:800,ls:3}),
      clue:'Citroengeel, en onderaan staat NEW SOUTH WALES. Dat is in Australië!'},
  TR:{name:'Turkije', like:['DE','IN','KR'],
      gen:()=>({t:String(1+rint(81)).padStart(2,'0')+' '+pat(pick(['LLL','LL','L']))+' '+pat(pick(['DDD','DD','DDDD']))}),
      draw:g=> box(520,112,'#fff')+`<rect x="8" y="8" width="50" height="96" rx="7" fill="#0A3A9E"/>`+T('TR',33,94,32,'#fff',{w:0})+T(g.t,286,86,76,'#111',{w:fitW(g.t,76,420)}),
      clue:'Een blauwe strook met TR, maar zónder sterretjes.'},
  IN:{name:'India', like:['AE','TR','MA'],
      gen:()=>({t:pick(['MH','DL','KA','TN','GJ'])+' '+pat('DD')+' '+pat('LL')+' '+pat('DDDD')}),
      draw:g=> box(520,112,'#fff')+`<circle cx="34" cy="36" r="14" fill="#D9DDE3" stroke="#8A93A3" stroke-width="3"/><circle cx="34" cy="36" r="5" fill="#B8C0CC"/>`+T('IND',34,88,22,'#1446A0',{w:0})+T(g.t,286,86,70,'#111',{w:fitW(g.t,70,420)}),
      clue:'Een heel lang nummer: MH 12 AB 1234, met IND links.'},
  RU:{name:'Rusland', like:['PL','TR','CZ'],
      gen:()=>({t:pick(ARL)+' '+pat('DDD')+' '+pick(ARL)+pick(ARL), r:pick(['77','99','197','78','50','23'])}),
      draw:g=> box(520,112,'#fff')+`<line x1="420" y1="6" x2="420" y2="106" stroke="#111" stroke-width="4"/>`+T(g.t,216,86,76,'#111',{w:fitW(g.t,76,380)})+T(g.r,466,64,44,'#111')+T('RUS',450,96,20,'#111',{w:0})+miniFlag('RU',474,82,26,17),
      clue:'Rechts een apart vakje met een nummer, en RUS met een vlaggetje.'},
  AE:{name:'Arabische Emiraten', like:['MA','IN','TR'],
      gen:()=>({t:pick(LET)+' '+pat('DDDDD')}),
      draw:g=> box(520,112,'#fff')+T('دبي',68,52,34,'#111',{w:0,f:'sans-serif',wt:700})+T('DUBAI',68,86,22,'#111',{w:0,f:RD,wt:800,ls:2})+`<line x1="128" y1="16" x2="128" y2="96" stroke="#111" stroke-width="3"/>`+T(g.t,320,88,76,'#111',{w:fitW(g.t,76,350)}),
      clue:'Er staat DUBAI op, en Arabisch schrift. Dubai ligt in de Emiraten.'},
  MA:{name:'Marokko', like:['AE','IN','TR'],
      gen:()=>({a:pat('DDDDD'), k:pick(['أ','ب','د','هـ','و']), b:pat(pick(['D','DD']))}),
      draw:g=> box(520,112,'#fff')+T(g.a,56,88,76,'#111',{a:'start',w:190})+`<line x1="268" y1="22" x2="268" y2="92" stroke="#111" stroke-width="5"/><line x1="356" y1="22" x2="356" y2="92" stroke="#111" stroke-width="5"/>`+T(g.k,312,86,58,'#111',{w:0,f:'sans-serif',wt:700})+T(g.b,376,88,76,'#111',{a:'start',w:est(g.b,76)}),
      clue:'Een Arabische letter tussen twee streepjes, in het midden.'}
});

/* ---- extra Europe: Baltics + Central/South-East ---- */
const RS_CITY={BG:'БЕОГРАД',NS:'НОВИ САД',NI:'НИШ',KG:'КРАГУЈЕВАЦ',SU:'СУБОТИЦА'};
Object.assign(C, {
  EE:{name:'Estland', bg:'#FFFFFF', fg:'#111', band:'eu', code:'EST', like:['LV','LT','FI'],
      gen:()=>({t:pat('DDD LLL')}),
      clue:'EST in de blauwe strook. Eerst drie cijfers, dan drie letters: 123 ABC.'},
  LV:{name:'Letland', bg:'#FFFFFF', fg:'#111', band:'eu', code:'LV', like:['EE','LT','SE'],
      gen:()=>({t:pat(pick(['LL-DDDD','LL-DDD','LL-DD']))}),
      clue:'LV in de blauwe strook. Twee letters, streepje, cijfers: AB-1234.'},
  LT:{name:'Litouwen', bg:'#FFFFFF', fg:'#111', band:'eu', code:'LT', arms:'lt', like:['LV','EE','PL'],
      gen:()=>({t:pat('LLL DDD')}),
      clue:'Naast de blauwe strook een rood schildje met een ridder te paard. ABC 123.'},
  SK:{name:'Slowakije', bg:'#FFFFFF', fg:'#111', band:'eu', code:'SK', deco:'sk', like:['CZ','SI','HU'],
      gen:()=>({t:[pat('LL'), pat('DDDLL')]}),
      clue:'SK in de strook, en een rood schildje met een wit dubbel kruis.'},
  SI:{name:'Slovenië', bg:'#FFFFFF', fg:'#111', band:'eu', code:'SLO', deco:'si', frame:'#2E8B3E', frameW:7, like:['HR','SK','AT'],
      gen:()=>({t:[pick(['LJ','MB','CE','KR','KP','NM']), pat(pick(['LL-DDD','DD-LLL','L-DDDD']))]}),
      clue:'Een groene rand rondom, en een stadswapentje na de eerste letters.'},
  HR:{name:'Kroatië', bg:'#FFFFFF', fg:'#111', band:'eu', code:'HR', deco:'hr', like:['SI','RS','AT'],
      gen:()=>({t:[pick(['ZG','ST','RI','OS','ZD','PU']), pat(pick(['DDDD-LL','DDD-LL','DDDD-L']),'ABCDEFGHIJKLMNOPRSTUV')]}),
      clue:'Een rood-wit geblokt schildje in het midden: ZG ∇ 1234-AB.'},
  RO:{name:'Roemenië', bg:'#FFFFFF', fg:'#111', band:'eu', code:'RO', like:['BG','HU','IT'],
      gen:()=>({t:(rint(3)?pick(['CJ','TM','IS','BV','CT','AG'])+' '+pat('DD'):'B '+pat(pick(['DD','DDD'])))+' '+pat('LLL')}),
      clue:'RO in de strook. Vooraan de provincie, dan cijfers en drie letters: CJ 12 ABC.'},
  BG:{name:'Bulgarije', bg:'#FFFFFF', fg:'#111', band:'eu', code:'BG', like:['RO','GR','RS'],
      gen:()=>({t:pick(['CA','CB','PB','B','A','BH','EH','KH','TX','CO'])+' '+pat('DDDD')+' '+pat('LL','ABEKMHOPCTX')}),
      clue:'BG in de strook, en vier cijfers in het midden: CA 1234 AB.'},
  RS:{name:'Servië', bg:'#FFFFFF', fg:'#111', band:'rs', code:'SRB', deco:'rs', like:['HR','SI','BG'],
      gen:()=>{const k=pick(Object.keys(RS_CITY)); return {t:[k, pat(pick(['DDD-LL','DDDD-LL']))], city:k, cyr:RS_CITY[k]};},
      clue:'Een blauwe strook met SRB maar zónder sterren, en een rood schildje met een wit kruis.'}
});
C.CZ.like=['SK','PL','HU']; C.HU.like=['RO','SK','CZ']; C.GR.like=['BG','CZ','HU'];
const EU = ['NL','BE','DE','FR','UK','LU','IT','ES','PT','AT','CH','DK','SE','NO','PL','CZ','IE','GR','FI','HU','EE','LV','LT','SK','SI','HR','RO','BG','RS'];
const WORLD = ['US','CA','MX','BR','AR','JP','CN','KR','AU','TR','IN','RU','AE','MA'];
const ALL = [...EU, ...WORLD];
const LV = {
  1:{name:'Buurlanden', desc:'6 landen dichtbij huis', pool:['NL','BE','DE','FR','UK','LU']},
  2:{name:'Heel Europa', desc:EU.length+' landen · lees de letters in de strook', pool:EU},
  3:{name:'Wereldreis', desc:ALL.length+' landen · van Amerika tot Japan', pool:ALL}
};
