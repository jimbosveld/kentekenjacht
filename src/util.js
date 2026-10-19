/* Kentekenjacht · kleine hulpfuncties
 * Classic script (geen ES-module): alle bestanden delen één globale scope.
 * Laadvolgorde staat in index.html. */

/* ================= helpers ================= */
const $ = s => document.querySelector(s);
const rint = n => Math.floor(Math.random()*n);
const pick = a => a[rint(a.length)];
const shuffle = a => { a=[...a]; for(let i=a.length-1;i>0;i--){const j=rint(i+1); [a[i],a[j]]=[a[j],a[i]];} return a; };
const LET='ABCDEFGHJKLMNPRSTVXYZ';
const pat = (p, L=LET) => p.replace(/[LD]/g, ch => ch==='L' ? pick(L) : String(rint(10)));
const STAR = cls => `<svg class="star ${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2l2.9 6.4 7 .7-5.3 4.7 1.6 6.9L12 17.3l-6.2 3.6 1.6-6.9L2.1 9.3l7-.7z"/></svg>`;
