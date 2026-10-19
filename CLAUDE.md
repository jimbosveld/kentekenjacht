# Kentekenjacht

Een raadspel voor tablets voor kinderen van ongeveer 7 jaar. Je ziet de achterkant van een auto en kiest uit 4 landen waar het kenteken vandaan komt. Het thema is een reispaspoort: levels zijn reistickets, een goed antwoord geeft een inktstempel, de verzameling is een postzegelalbum en er is een wereldkaart die inkleurt.

## Draaien

- `npm start` start een lokale server op http://localhost:5173 (tablet op hetzelfde wifi: http://<ip-van-de-mac>:5173).
- `index.html` werkt ook los in de browser via file://.
- Controlepagina: `dev/plates.html` toont alle kentekens, vlaggen en de 5 auto's. **Bekijk deze na elke wijziging aan kentekens, vlaggen of auto's** (screenshot maken met Playwright en zelf naar kijken).
- Kaartdata opnieuw bouwen: `npm install` en dan `npm run maps`.

## Publiceren

- Live via GitHub Pages: https://jimbosveld.github.io/kentekenjacht/ (openbare repo `jimbosveld/kentekenjacht`, branch `main`). Elke push naar `main` staat na ongeveer een minuut online.
- De repo is openbaar: geen persoonlijke gegevens in bestanden of commits. Commit met het noreply-adres `1869228+jimbosveld@users.noreply.github.com` als auteur en committer.
- De lokale branch `historie-lokaal` wordt nooit gepusht.

## Opbouw

Geen build-stap en geen framework. Gewone `<script>`-bestanden (geen ES-modules) die één globale scope delen. **De laadvolgorde in index.html (en dev/plates.html) is belangrijk:**

1. `src/util.js`: `$`, `rint`, `pick`, `shuffle`, `pat()` (patroon: L = letter, D = cijfer), `STAR()`
2. `src/flags.js`: `FLAG[code]` als SVG-inhoud op 30x20, plus `flag(id)` en `miniFlag()`
3. `src/countries.js`: `C[code]` met naam, `gen()` voor een willekeurig nummer, `clue` (tip voor het kind) en `like` (landen die erop lijken). Daarnaast `EU`, `WORLD`, `ALL` en de levels `LV`.
4. `src/plates.js`: `plateSVG(id, g)`. Europese platen worden opgebouwd uit eigenschappen (`band`, `deco`, `right`, `frame`, `arms`…), niet-Europese platen hebben een eigen `draw(g)` in countries.js.
5. `src/cars.js`: 5 autotypes in `CARTYPES` met `carSVG(id, g, _, kleur, type)`. Lak, glas en chroom zijn kleurverlopen; de gedeelde verlopen (`kjGlass`, `kjChrome`, `kjPlast`, `kjShadow`) zet cars.js zelf in de pagina.
6. `src/data/maps.js`: **gegenereerd** door `scripts/build-maps.mjs`, niet met de hand bewerken
7. `src/game.js`: opslag (localStorage `kentekenjacht-v1`), geluid, stempels, schermen, spelverloop
8. `src/scenery.js`: landschap en weer (zie hieronder)
9. `src/map.js`: het wereldkaart-scherm. Schuiven (1 vinger), knijp-zoomen (2 vingers), muiswiel en +/− knoppen. Het beginbeeld per kaart staat in `VIEW0` (wereld: 2× ingezoomd op Europa).

## Sfeer: dagdelen, landschap en weer

- Een reis van 10 auto's is één dag: vraag 1-3 ochtend, 4-6 middag, 7-8 avond, 9-10 nacht (`data-mood` op `#stage`, gezet in `nextQ`). De kleuren staan als CSS-variabelen per dagdeel in styles.css en lopen soepel over dankzij `@property`.
- Het landschap bestaat uit drie lagen silhouetten (verre heuvels, bomenrij, dorp met trapgevels, molen, kerk en lantaarnpalen). `buildScenery()` tekent ze één keer als SVG en gebruikt ze als CSS-mask, zodat de kleur per dagdeel en weer kan wisselen. 's Avonds en 's nachts gaan de ramen aan.
- Bij elke nieuwe auto schuift `--pan` 700px op; de lagen bewegen met verschillende snelheid mee (parallax).
- Weer kiest per reis: helder, regen, sneeuw of mist (`data-wx`, `setWeather()`). Regen, sneeuw en mist zijn deeltjes op het canvas `#wx` in het speelveld; daarnaast mengt het weer grijs/wit door lucht en landschap.
- Het kenteken moet altijd goed leesbaar blijven. Controleer nieuwe sfeereffecten daarom in alle dagdelen en alle weertypes.

Een land heeft een code (bijv. `NL`, `UK`, `RS`) en die code komt terug in `FLAG`, `C`, `EU`/`WORLD`, `ISO` in `build-maps.mjs`, en (buiten Europa) `REG` en `ICODE` in game.js.

## Spelregels en toon (niet veranderen zonder overleg)

- Alle tekst in de interface is Nederlands, kort en kindvriendelijk.
- **Er gaan nooit punten af.** Na een fout antwoord wordt het goede antwoord aangewezen en volgt een tip.
- Geen voorleesstem (spraaksynthese): die klonk niet goed en is er bewust uit gehaald. Geluidseffecten blijven.
- 1 ster per goed antwoord, plus een bonusster bij elke 3 op rij. Een ronde heeft 10 vragen. Eindscore: 9+ goed = 3 sterren, 7+ = 2, 5+ = 1.
- Een volgend level gaat open bij 2 sterren. Ouders kunnen alles openzetten en resetten (dubbel tikken ter bevestiging).
- Een postzegel krijg je na 3 keer goed. Op de kaart: 1 of 2 keer goed is gestreept, 3 keer goed is helemaal gekleurd.
- Foute antwoorden komen uit de `like`-lijst, zodat het niet te makkelijk is.
- Auto's zijn **niet** aan landen gekoppeld. Elke ronde gebruikt elk type twee keer, in willekeurige volgorde.
- Kleuren per werelddeel (stempels, kaart): Europa blauw, Amerika rood, Azië groen, Oceanië oranje, Midden-Oosten/Afrika paars.

## Een land toevoegen

1. **Zoek eerst het echte uiterlijk op** (Wikipedia "Vehicle registration plates of …") en noteer de bron. Niet uit je hoofd tekenen: bij de vorige controle bleken 7 landen niet te kloppen.
2. Voeg toe: `FLAG`, `C` (met `gen`, `clue`, `like`), `EU` of `WORLD`, de ISO-code in `scripts/build-maps.mjs` (en draai `npm run maps`), en buiten Europa ook `REG` (+ eventueel `ICODE`) in game.js.
3. Zet het nieuwe land ook in de `like`-lijst van landen die erop lijken.
4. Controleer het op `dev/plates.html`.

## Bekende vereenvoudigingen

- De lettertypes lijken op de echte, maar zijn niet exact. Wapenschildjes zijn versimpeld.
- Slowakije: de plek van het schildje is niet bevestigd door de bron.
- Amerikaanse en Canadese platen tonen maar 2 staten/provincies.
- Japanse/Chinese/Koreaanse tekens gebruiken het lettertype van het apparaat.
- Uit de kentekencontrole van oktober 2026 (geen harde fouten, wel nuances): het Belgische beginnummer is alleen 1 of 2 (de echte reeks is verder); het Koreaanse KOR-vakje en het Litouwse ridderschildje zijn optionele/artistieke details en niet de standaardplaat; Marokko kondigde een nieuw formaat aan (Latijnse letter + MA, mogelijk vanaf 2027). Portugal is gecorrigeerd: het gele jaartal-randje bestaat sinds 2020 niet meer.

## Ideeën voor later

- PWA (manifest + service worker) zodat het offline als app op de tablet werkt.
- Spotboekje: landen aantikken die je echt op de weg hebt gezien.
- Varianten per land (Duitse E-kentekens, Nederlandse taxi's).
- Omgekeerde vraag: wijs het Duitse kenteken aan tussen drie platen.
- Graphics: landschap per reis (Buurlanden Hollands, Europa bergen, Wereldreis palmen/skyline), extra autotypes (pickup, camper, taxi), draaiende wielen bij het inrijden, confetti in de kleuren van de vlag.
